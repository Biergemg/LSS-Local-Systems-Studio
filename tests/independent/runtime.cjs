(async () => {
    const fs = await import('node:fs'), assert = (await import('node:assert/strict')).default;
    const { spawnSync } = await import('node:child_process');
    const { chromium } = await import('playwright');
    const { default: AxeBuilder } = await import('@axe-core/playwright');
    const BASE = process.env.TEST_BASE_URL || 'http://127.0.0.1:3418', OUT = '.audit-private/independent';
    const source = spawnSync('git', ['rev-parse', 'HEAD'], {
        encoding: 'utf8'
    });
    assert.equal(source.status, 0, 'Git source commit unavailable');
    const SHA = source.stdout.trim(), STARTED_AT = new Date().toISOString();
    fs.mkdirSync(OUT, {
        recursive: true
    });
    const checks = [];
    const write = () => fs.writeFileSync(OUT + '/runtime.json', JSON.stringify({
        sourceCommit: SHA, executedAt: STARTED_AT, finishedAt: new Date().toISOString(), executionKind: 'Automated replay of independently authored harness; manual review remains a separate artifact', runner: process.env.GITHUB_ACTIONS === 'true' ? 'GitHub Actions' : 'local', checks
    }, null, 2));
    async function check(id, fn) {
        try {
            const data = await fn();
            checks.push({
                id, status: 'PASS', data
            });
            console.log(id + ' PASS ' + JSON.stringify(data));
        }
        catch (e) {
            checks.push({
                id, status: 'FAIL', error: e.message
            });
            console.log(id + ' FAIL ' + e.message);
        }
        write();
    }
    const metrics = (page, sel) => page.locator(sel).first().evaluate(e => {
        const r = e.getBoundingClientRect();
        const points = [[r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4], [r.left + r.width / 2, r.top + r.height / 2]];
        return {
            rect: {
                x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom
            }, inViewport: r.x >= 0 && r.y >= 0 && r.right <= innerWidth && r.bottom <= innerHeight, hit: points.every(([x, y]) => {
                const h = document.elementFromPoint(x, y);
                return h && (e === h || e.contains(h));
            }), bannerTop: document.querySelector('.privacy-consent')?.getBoundingClientRect().top, overflow: document.documentElement.scrollWidth > innerWidth
        };
    });
    async function doubleText(page) {
        await page.evaluate(() => {
            const initial = [...document.querySelectorAll('p,h1,h2,h3,a,button,summary,li,span')].map(e => [e, parseFloat(getComputedStyle(e).fontSize)]);
            for (const [e, size] of initial)
                e.style.fontSize = size * 2 + 'px';
        });
        await page.waitForTimeout(200);
    }
    await (async () => {
        const browser = await chromium.launch(process.env.BROWSER_EXECUTABLE ? {
            executablePath: process.env.BROWSER_EXECUTABLE
        } : {});
        async function context(options = {}) {
            const c = await browser.newContext(options);
            await c.route('**/*', r => new URL(r.request().url()).origin === new URL(BASE).origin ? r.continue() : r.fulfill({
                status: 200, contentType: 'application/javascript', body: '/* independent audit interception: no outbound provider traffic */'
            }));
            return c;
        }
        for (const [w, h] of [[320, 568], [360, 640], [375, 667], [390, 844], [414, 896], [768, 1024], [900, 900], [1024, 768], [1366, 768], [1440, 900], [1920, 1080]])
            await check('responsive-' + w, async () => {
                const c = await context({
                    viewport: {
                        width: w, height: h
                    }
                });
                try {
                    const p = await c.newPage(), errors = [], externals = [];
                    p.on('pageerror', e => errors.push(e.message));
                    p.on('request', r => {
                        if (new URL(r.url()).origin !== new URL(BASE).origin)
                            externals.push(r.url());
                    });
                    await p.goto(BASE);
                    await p.evaluate(() => document.fonts.ready);
                    await p.waitForTimeout(1900);
                    const result = await metrics(p, '.hx-cta .btn-primary');
                    assert.equal(result.inViewport, true);
                    assert.equal(result.hit, true);
                    assert.equal(result.overflow, false);
                    assert.deepEqual(errors, []);
                    assert.deepEqual(externals, []);
                    await p.screenshot({
                        path: OUT + '/' + w + '-hero.png'
                    });
                    return {
                        width: w, height: h, ...result, errors, externals
                    };
                }
                finally {
                    await c.close();
                }
            });
        for (const route of ['/', '/privacidad', '/terminos', '/servicios/presencia-digital'])
            await check('consent-' + route, async () => {
                const c = await context({
                    viewport: {
                        width: 390, height: 844
                    }, reducedMotion: 'reduce'
                });
                try {
                    const p = await c.newPage(), external = [];
                    p.on('request', r => {
                        if (new URL(r.url()).origin !== new URL(BASE).origin)
                            external.push(r.url());
                    });
                    await p.goto(BASE + route);
                    await p.getByRole('button', {
                        name: 'Rechazar medición'
                    }).click();
                    await p.reload();
                    assert.equal(await p.locator('.privacy-consent').count(), 0);
                    assert.equal(external.length, 0);
                    await p.getByRole('button', {
                        name: 'Preferencias de privacidad'
                    }).click();
                    await p.getByRole('button', {
                        name: 'Permitir medición'
                    }).click();
                    await p.waitForTimeout(200);
                    assert(external.some(u => u.includes('googletagmanager')));
                    await p.evaluate(() => {
                        document.cookie = '_ga=synthetic_audit;path=/';
                        document.cookie = '_ga_AUDIT=synthetic_audit;path=/';
                    });
                    await p.getByRole('button', {
                        name: 'Preferencias de privacidad'
                    }).click();
                    await p.getByRole('button', {
                        name: 'Rechazar medición'
                    }).click();
                    await p.waitForLoadState();
                    await p.reload();
                    assert.equal((await c.cookies()).filter(x => x.name.startsWith('_ga')).length, 0);
                    assert.equal(await p.locator('.privacy-consent').count(), 0);
                    const a11y = await new AxeBuilder({
                        page: p
                    }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
                    assert.deepEqual(a11y.violations, []);
                    return {
                        cookies: await c.cookies(), storage: await p.evaluate(() => ({
                            ...localStorage
                        })), interceptedProviderRequests: external, axeViolations: [], axeIncomplete: a11y.incomplete.map(x => x.id)
                    };
                }
                finally {
                    await c.close();
                }
            });
        await check('text200-statement-logo', async () => {
            const c = await context({
                viewport: {
                    width: 320, height: 568
                }, reducedMotion: 'reduce'
            });
            try {
                const p = await c.newPage();
                await p.goto(BASE);
                await p.evaluate(() => document.fonts.ready);
                await doubleText(p);
                const ranges = await p.locator('.stm-big > span').evaluateAll(es => es.map(e => {
                    const range = document.createRange();
                    range.selectNodeContents(e);
                    const r = range.getBoundingClientRect();
                    return {
                        text: e.textContent, right: r.right, width: r.width, viewport: innerWidth
                    };
                }));
                for (const r of ranges)
                    assert(r.right <= 321, JSON.stringify(r));
                const brand = await p.locator('header nav>a').evaluate(e => ({
                    bottom: e.getBoundingClientRect().bottom, headerBottom: document.querySelector('header').getBoundingClientRect().bottom, right: e.getBoundingClientRect().right
                }));
                assert(brand.bottom <= brand.headerBottom + 1);
                assert(brand.right <= 320);
                await p.locator('.stm-big').scrollIntoViewIfNeeded();
                await p.screenshot({
                    path: OUT + '/text200-statement.png'
                });
                await p.locator('.hx-cta .btn-primary').focus();
                const cta = await metrics(p, '.hx-cta .btn-primary');
                assert.equal(cta.hit, true);
                await p.screenshot({
                    path: OUT + '/text200-cta.png'
                });
                await p.setViewportSize({
                    width: 568, height: 320
                });
                await p.locator('.hx-cta .btn-primary').focus();
                const landscape = await metrics(p, '.hx-cta .btn-primary');
                assert.equal(landscape.hit, true);
                return {
                    ranges, brand, cta, landscape
                };
            }
            finally {
                await c.close();
            }
        });
        for (const route of ['/privacidad', '/terminos', '/servicios/presencia-digital'])
            await check('nojs-text200-' + route, async () => {
                const c = await context({
                    javaScriptEnabled: false, viewport: {
                        width: 320, height: 568
                    }, reducedMotion: 'reduce'
                });
                try {
                    const p = await c.newPage();
                    await p.goto(BASE + route);
                    await p.evaluate(() => document.fonts.ready);
                    await doubleText(p);
                    const bounds = await p.evaluate(() => ({
                        overflow: document.documentElement.scrollWidth > innerWidth, headerBottom: document.querySelector('header')?.getBoundingClientRect().bottom, introTop: document.querySelector('.service-intro .eyebrow')?.getBoundingClientRect().top, h1Right: document.querySelector('h1').getBoundingClientRect().right
                    }));
                    assert.equal(bounds.overflow, false);
                    if (route.includes('servicios'))
                        assert(bounds.introTop >= bounds.headerBottom);
                    await p.screenshot({
                        path: OUT + '/nojs200-' + route.split('/').pop() + '.png'
                    });
                    return bounds;
                }
                finally {
                    await c.close();
                }
            });
        await check('menu-keyboard-rotation', async () => {
            const c = await context({
                viewport: {
                    width: 320, height: 568
                }, reducedMotion: 'reduce'
            });
            try {
                const p = await c.newPage();
                await p.goto(BASE);
                await p.getByRole('button', {
                    name: 'Abrir menú'
                }).click();
                await p.keyboard.press('Tab');
                assert.equal(await p.locator('#menu-movil a').first().evaluate(e => e === document.activeElement), true);
                await p.keyboard.press('Escape');
                assert.equal(await p.getByRole('button', {
                    name: 'Abrir menú'
                }).evaluate(e => e === document.activeElement), true);
                await p.getByRole('button', {
                    name: 'Abrir menú'
                }).click();
                await p.setViewportSize({
                    width: 1024, height: 768
                });
                await p.waitForTimeout(100);
                assert.equal(await p.locator('#menu-movil').count(), 0);
                await p.setViewportSize({
                    width: 568, height: 320
                });
                await p.goto(BASE);
                const failed = [], visited = [];
                for (let i = 0; i < 36; i++) {
                    await p.keyboard.press('Tab');
                    await p.waitForTimeout(30);
                    const r = await p.evaluate(() => {
                        const e = document.activeElement;
                        if (e === document.body)
                            return null;
                        const r = e.getBoundingClientRect();
                        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
                        return {
                            text: e.textContent?.trim().slice(0, 60), hit: e === hit || e.contains(hit), y: r.y, bottom: r.bottom, area: e.closest('header') ? 'header' : e.closest('footer') ? 'footer' : 'content', hitTag: hit?.tagName, hitClass: hit?.className, navClass: document.querySelector('header.nav')?.className, navTransform: getComputedStyle(document.querySelector('header.nav')).transform
                        };
                    });
                    if (r) {
                        visited.push(r);
                        if (!r.hit)
                            failed.push(r);
                    }
                }
                assert.deepEqual(failed, []);
                return {
                    visited
                };
            }
            finally {
                await c.close();
            }
        });
        await check('nojs-text200-landing-navigation', async () => {
            const c = await context({
                javaScriptEnabled: false, viewport: {
                    width: 320, height: 568
                }, reducedMotion: 'reduce'
            });
            try {
                const p = await c.newPage();
                await p.goto(BASE);
                await p.evaluate(() => document.fonts.ready);
                await doubleText(p);
                const first = await metrics(p, '.nav-fallback a');
                assert.equal(first.hit, true);
                assert.equal(first.overflow, false);
                await p.screenshot({
                    path: OUT + '/nojs200-landing.png'
                });
                return first;
            }
            finally {
                await c.close();
            }
        });
        await check('nav-focus-immediate-after-scroll', async () => {
            const c = await context({
                viewport: {
                    width: 390, height: 844
                }, reducedMotion: 'no-preference'
            });
            try {
                const p = await c.newPage();
                await p.goto(BASE);
                await p.evaluate(() => document.fonts.ready);
                await p.waitForTimeout(1900);
                await p.mouse.wheel(0, 700);
                await p.waitForFunction(() => document.querySelector('header.nav')?.classList.contains('nav-hide'));
                await p.waitForTimeout(350);
                const result = await p.evaluate(() => {
                    const button = document.querySelector('.nav-toggle');
                    button.focus({
                        preventScroll: true
                    });
                    const r = button.getBoundingClientRect(), h = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
                    return {
                        focused: document.activeElement === button, y: r.y, bottom: r.bottom, hit: button === h || button.contains(h), transition: getComputedStyle(document.querySelector('header.nav')).transitionDuration
                    };
                });
                assert.equal(result.focused, true);
                assert.equal(result.hit, true);
                assert(result.y >= 0);
                await p.screenshot({
                    path: OUT + '/nav-focus-immediate.png'
                });
                return result;
            }
            finally {
                await c.close();
            }
        });
        await check('skip-link-blur-immediate', async () => {
            const c = await context({
                viewport: {
                    width: 568, height: 320
                }, reducedMotion: 'reduce'
            });
            try {
                const p = await c.newPage();
                await p.goto(BASE);
                await p.locator('.skip-link').focus();
                await p.waitForFunction(() => document.querySelector('.skip-link').getBoundingClientRect().top === 12);
                const result = await p.evaluate(() => {
                    const skip = document.querySelector('.skip-link');
                    const logo = document.querySelector('header nav>a');
                    logo.focus({
                        preventScroll: true
                    });
                    const box = logo.getBoundingClientRect();
                    const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
                    return {
                        focusedLogo: document.activeElement === logo,
                        hit: logo === hit || logo.contains(hit),
                        skipFocused: skip.matches(':focus'),
                        skipTop: skip.getBoundingClientRect().top,
                        skipTransition: getComputedStyle(skip).transitionDuration,
                        hitClass: hit?.className,
                    };
                });
                assert.equal(result.focusedLogo, true);
                assert.equal(result.skipFocused, false);
                assert.equal(result.hit, true);
                assert(result.skipTop < 0);
                return result;
            }
            finally {
                await c.close();
            }
        });
        await browser.close();
        console.log('RESULT ' + checks.filter(x => x.status === 'PASS').length + '/' + checks.length);
        process.exitCode = checks.some(x => x.status === 'FAIL') ? 1 : 0;
    })().catch(e => {
        console.error(e.stack);
        process.exitCode = 1;
    });
})().catch(error => {
    console.error(error.stack);
    process.exitCode = 1;
});
