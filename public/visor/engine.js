(function(){
'use strict';
/* Motor «Visor» (A 2.1 → integración comercial). Three.js r128 autoalojado. La página lo inicia con LSSVisor.start(cfg). */
function boot(cfg){
var T=window.THREE,stage=cfg.stage,cv=cfg.canvas,reduce=false;
if(!T||!T.EffectComposer||!T.UnrealBloomPass||!T.ShaderPass||!stage||!cv)return null;
var renderer;
try{renderer=new T.WebGLRenderer({canvas:cv,antialias:false,alpha:false,powerPreference:'high-performance'})}catch(e){return null}
if(!renderer.getContext())return null;
var active=false,raf=0,ready=false,dead=false,rl=0,anchors=[],fnl=null,vis=new Map(),io=null,ro=null;
cv.addEventListener('webglcontextlost',function(e){e.preventDefault();destroy();cfg.onLost&&cfg.onLost()});
renderer.info.autoReset=false;renderer.outputEncoding=T.LinearEncoding;renderer.toneMapping=T.NoToneMapping;
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;

function sm(a,b,x){x=Math.max(0,Math.min(1,(x-a)/(b-a)));return x*x*(3-2*x)}
function cl(x,a,b){return Math.max(a,Math.min(b,x))}
function lerp(a,b,t){return a+(b-a)*t}
var P=(stage.clientHeight||innerHeight)>(stage.clientWidth||innerWidth)*1.05;                       /* vertical: composición propia, no una reducción */
var W=P?2.1:3.3,FL=-1.2,WALLH=7;                         /* medio ancho del pasillo, suelo, alto de pared */
var ZIRIS=-41.2,ZEND=-93;
var M=0;                                                 /* 0 = escena 1 (día) · 1 = escena 2 (noche) */

var scene=new T.Scene(),camera=new T.PerspectiveCamera(P?58:38,1,.06,260);
scene.fog=new T.FogExp2(0x2a1a0e,.022);
var U={time:{value:0},cam:{value:new T.Vector3()}};
function C(r,g,b){return new T.Color(r,g,b)}
function hdr(r,g,b,k){return new T.Color(r*k,g*k,b*k)}

/* ── Paletas por escena (se mezclan con M) ── */
var PAL={
 top:[C(.012,.03,.045),C(.004,.014,.016)], mid:[C(.42,.2,.1),C(.01,.12,.09)], hor:[C(1.25,.7,.34),C(.3,1.3,.85)],
 fog:[C(.085,.046,.026),C(.012,.04,.036)], key:[C(1,.62,.3),C(1,.5,.25)], emis:[C(1,.88,.68),C(.86,1,.92)]
};
function pal(k,out){return out.lerpColors(PAL[k][0],PAL[k][1],M)}

/* ── Fondo: horizonte, gradiente y sol; se ve por el iris y al final del pasillo ── */
var skyMat=new T.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:{rot:{value:new T.Matrix3()},tn:{value:new T.Vector2(1,1)},top:{value:new T.Color()},mid:{value:new T.Color()},hor:{value:new T.Color()},time:U.time,mixv:{value:0}},
vertexShader:'varying vec2 vN;void main(){vN=position.xy;gl_Position=vec4(position.xy,1.,1.);}',
fragmentShader:'uniform mat3 rot;uniform vec2 tn;uniform vec3 top,mid,hor;uniform float time,mixv;varying vec2 vN;'+
'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}'+
'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}'+
'void main(){vec3 d=normalize(rot*vec3(vN.x*tn.x,vN.y*tn.y,-1.));float y=d.y;'+
'vec3 c=mix(hor,mid,smoothstep(0.,.22,y));c=mix(c,top,smoothstep(.12,.7,y));'+
'c*=.88+.12*vn(vec2(d.x*7.+time*.01,y*34.));'+
'c=mix(c,top*.4,smoothstep(0.,-.12,y));'+
'float s=max(dot(d,normalize(vec3(.0,.03,-1.))),0.);c+=hor*(pow(s,40.)*1.2+pow(s,900.)*14.)*(1.-.9*mixv);'+
'c+=hor*exp(-abs(d.y-.03)*38.)*exp(-abs(d.x)*1.6)*(.8-.35*mixv);'+      /* destello anamórfico horizontal */
'gl_FragColor=vec4(c,1.);}'});
var sky=new T.Mesh(new T.PlaneBufferGeometry(2,2),skyMat);sky.frustumCulled=false;sky.renderOrder=-100;scene.add(sky);

/* ── Materiales ── */
var matWall=new T.MeshStandardMaterial({color:0x281c13,roughness:.92,metalness:.02});
var matFin=new T.MeshStandardMaterial({color:0x4d3726,roughness:.62,metalness:.15});
var matFloor=new T.MeshStandardMaterial({color:0x2e2217,roughness:.38,metalness:.3});
var matCeil=new T.MeshStandardMaterial({color:0x14100c,roughness:.8,metalness:.1});
var emisCol=new T.Color();
function emisMat(k){return new T.MeshBasicMaterial({color:hdr(1,.9,.7,k),fog:false})}
var matBracket=emisMat(2.6),matStrip=emisMat(2.2);

/* ── Luces ── */
var hemi=new T.HemisphereLight(0xffcf9a,0x0b0806,.2);scene.add(hemi);
var spot=new T.SpotLight(0xffb36a,3.1,70,.82,.85,1);spot.castShadow=true;spot.shadow.mapSize.set(P?1024:2048,P?1024:2048);spot.shadow.bias=-.0006;spot.shadow.camera.near=2;spot.shadow.camera.far=60;scene.add(spot);scene.add(spot.target);
var lampA=new T.PointLight(0xffa35c,0,16,1.6),lampB=new T.PointLight(0x2affb0,0,18,1.8);scene.add(lampA);scene.add(lampB);

/* ── Arquitectura: suelo, paredes, aletas, ceiling (solo escena 2), nervaduras = esquinas del visor ── */
var LEN=ZEND-12;
var floor=new T.Mesh(new T.PlaneBufferGeometry(2*W+8,Math.abs(LEN)+40),matFloor);floor.rotation.x=-Math.PI/2;floor.position.set(0,FL,(LEN-20)/2+8);floor.receiveShadow=true;scene.add(floor);
[-1,1].forEach(function(sd){var w=new T.Mesh(new T.BoxGeometry(.4,WALLH+2,Math.abs(LEN)+30),matWall);w.position.set(sd*(W+.2),FL+WALLH/2,(LEN-14)/2+6);w.receiveShadow=true;scene.add(w)});
var finG=new T.BoxGeometry(P?.8:1.15,WALLH,.15),finM=new T.InstancedMesh(finG,matFin,88),_m=new T.Matrix4();
for(var i=0;i<44;i++){var z=10-i*2.6;[-1,1].forEach(function(sd,j){_m.makeTranslation(sd*(W-(P?.4:.58)),FL+WALLH/2,z);finM.setMatrixAt(i*2+j,_m)})}
finM.castShadow=finM.receiveShadow=true;finM.frustumCulled=false;scene.add(finM);
/* techo y tiras de luz: solo después del iris */
var ceil=new T.Mesh(new T.PlaneBufferGeometry(2*W,Math.abs(ZEND-ZIRIS)+2),matCeil);ceil.rotation.x=Math.PI/2;ceil.position.set(0,3.35,(ZIRIS+ZEND)/2);scene.add(ceil);
var stripG=new T.BoxGeometry(2*W-.6,.04,.14);
var stripM=new T.InstancedMesh(stripG,matStrip,12);for(var i=0;i<12;i++){_m.makeTranslation(0,3.32,ZIRIS-4-i*4.4);stripM.setMatrixAt(i,_m)}stripM.frustumCulled=false;scene.add(stripM);
/* perforaciones de película: dos rieles de marcas a los lados de la señal (el pasillo es un fotograma) */
(function(){var pitch=.9,n=Math.floor((9-ZEND)/pitch),g=new T.BoxGeometry(P?.11:.15,.012,.3),m=new T.InstancedMesh(g,new T.MeshBasicMaterial({color:hdr(1,.9,.7,1.05)}),n*2),mx=new T.Matrix4(),xo=W-(P?1.3:1.55);
 for(var i=0;i<n;i++)[-1,1].forEach(function(sd,j){mx.makeTranslation(sd*xo,FL+.008,9-i*pitch);m.setMatrixAt(i*2+j,mx)});m.frustumCulled=false;scene.add(m)}());
var poolMat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{col:{value:new T.Color(1,.62,.3)},k:{value:.5}},
vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:'uniform vec3 col;uniform float k;varying vec2 vUv;void main(){float x=abs(vUv.x-.5)*2.,z=(vUv.y-.5)*2.;float a=exp(-z*z*9.)*(.15+.85*smoothstep(.45,1.,x))*(1.-smoothstep(.9,1.,x));gl_FragColor=vec4(col*a*k,a);}'});
var POOLS=[],POOLG=new T.Color(.35,1,.75);
/* nervaduras con las cuatro esquinas del logotipo */
var BR=new T.Group();scene.add(BR);
(function(){var arm=.75,th=.07,bw=2*(W-(P?.95:1.35)),bh=P?3.7:3.3,gH=new T.BoxGeometry(arm,th,th),gV=new T.BoxGeometry(th,arm,th),hM=new T.InstancedMesh(gH,matBracket,52),vM=new T.InstancedMesh(gV,matBracket,52),nh=0,mm=new T.Matrix4(),gm=new T.Matrix4(),lm=new T.Matrix4();
 for(var i=0;i<13;i++){var z=6-i*7.8;if([-12.5,-26,-60,-74.5,-41.2].some(function(o){return z<o+8.6&&z>o-.6}))continue;var g=new T.Group();g.position.set(0,.5,z);g.rotation.z=(i%2?1:-1)*.012*(i%5);
  g.updateMatrix();gm.copy(g.matrix);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var x=q[0]*bw/2,y=q[1]*bh/2;lm.makeTranslation(x-q[0]*arm/2+q[0]*th/2,y,0);mm.multiplyMatrices(gm,lm);hM.setMatrixAt(nh,mm);lm.makeTranslation(x,y-q[1]*arm/2+q[1]*th/2,0);mm.multiplyMatrices(gm,lm);vM.setMatrixAt(nh,mm);nh++});
  var pl=new T.Mesh(new T.PlaneBufferGeometry(2*(W-.4),1.8),poolMat);pl.rotation.x=-Math.PI/2;pl.position.set(0,FL+.01,z);scene.add(pl);POOLS.push(pl)}hM.count=vM.count=nh;hM.frustumCulled=vM.frustumCulled=false;BR.add(hM);BR.add(vM)})();

/* ── Aperturas: iris (puerta entre escenas) y visor final ── */
var apFS='uniform float R,rot,shape,mixv,R0;uniform vec3 edge,fogc;uniform float fogd;uniform vec3 cam;varying vec2 vP;varying vec3 vW;'+
'float sdHex(vec2 p,float r){float c=cos(rot),s=sin(rot);p=mat2(c,-s,s,c)*p;float d=-1e9;for(int i=0;i<6;i++){float t=float(i)*1.0471976;d=max(d,dot(p,vec2(cos(t),sin(t)))-r*.866);}return d;}'+
'float sdBox(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}'+
'void main(){float d=shape<.5?sdHex(vP-vec2(0.,.35),R):sdBox(vP-vec2(0.,.5),vec2(R*.62,R),.1);if(d<0.)discard;'+
'vec2 p=vP-vec2(0.,.35);float ang=atan(p.y,p.x)+rot*1.;float sec=fract(ang/1.0471976);float seam=smoothstep(.012,0.,min(sec,1.-sec));'+
'vec3 c=vec3(.028,.024,.02)*(shape<.5?(.55+.9*sec):.8);c+=vec3(.5,.4,.3)*seam*.08;'+
'if(shape<.5){float r=length(p);float rb=r/R0;float band=smoothstep(1.28,1.3,rb)*smoothstep(1.62,1.6,rb);float ta=atan(p.y,p.x)/6.2831853;float tk=smoothstep(.4,.5,abs(fract(ta*96.)-.5)*2.);float lg=step(.5,abs(fract(ta*16.)-.5)*2.-.9);c+=vec3(.5,.42,.32)*band*(.06+.2*tk*(1.-.5*lg))*smoothstep(1.28,1.34,rb);'+
'c+=vec3(.9,.78,.6)*smoothstep(.012,0.,abs(rb-1.3))*.12+edge*smoothstep(.01,0.,abs(rb-1.64))*.9;c+=vec3(.4,.32,.24)*smoothstep(0.,1.,sec)*smoothstep(.85,1.,rb)*.05*(1.-smoothstep(1.28,1.3,rb));}'+
'c+=edge*exp(-d*3.2)*2.2;c+=edge*exp(-d*14.)*3.5;'+
'float f=1.-exp(-fogd*fogd*pow(distance(vW,cam),2.));c=mix(c,fogc,f);gl_FragColor=vec4(c,1.);}';
function apMat(shape,R){return new T.ShaderMaterial({uniforms:{R:{value:R},R0:{value:R},rot:{value:0},shape:{value:shape},mixv:{value:0},edge:{value:new T.Color()},fogc:{value:new T.Color()},fogd:{value:.022},cam:U.cam},
vertexShader:'varying vec2 vP;varying vec3 vW;void main(){vP=position.xy;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',fragmentShader:apFS})}
var irisM=apMat(0,P?1.8:2.5),iris=new T.Mesh(new T.PlaneBufferGeometry(120,80),irisM);iris.position.set(0,0,ZIRIS);scene.add(iris);
var endM=apMat(1,1.7),endW=new T.Mesh(new T.PlaneBufferGeometry(120,80),endM);endW.position.set(0,0,ZEND);scene.add(endW);
(function(){var arm=.7,th=.07,bw=2*(1.7*.62)+.55,bh=2*1.7+.55,gH=new T.BoxGeometry(arm,th,th),gV=new T.BoxGeometry(th,arm,th),g=new T.Group();g.position.set(0,.5,ZEND+.08);
 [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(q){var x=q[0]*bw/2,y=q[1]*bh/2;var a=new T.Mesh(gH,matBracket),b=new T.Mesh(gV,matBracket);a.position.set(x-q[0]*arm/2+q[0]*th/2,y,0);b.position.set(x,y-q[1]*arm/2+q[1]*th/2,0);g.add(a);g.add(b)});scene.add(g);endW.userData.fr=g})();

/* ── Haces de luz entre aletas (láminas aditivas, solo escena 1) ── */
var shaftMat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide,uniforms:{time:U.time,cam:U.cam,k:{value:1},col:{value:new T.Color(1,.62,.3)}},
vertexShader:'varying vec2 vUv;varying vec3 vW;void main(){vUv=uv;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
fragmentShader:'uniform float time,k;uniform vec3 cam,col;varying vec2 vUv;varying vec3 vW;'+
'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}'+
'float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}'+
'void main(){float d=distance(vW,cam);float t=vUv.x*.9+(1.-vUv.y)*.75;float band=smoothstep(.28,.62,t)*smoothstep(1.52,1.0,t);'+
'float n=.55+.45*vn(vec2(vUv.x*5.+time*.03,vUv.y*7.));float edge=smoothstep(0.,.15,vUv.x)*smoothstep(1.,.85,vUv.x)*smoothstep(0.,.1,vUv.y);'+
'float a=band*n*edge*smoothstep(.8,5.,d)*(1.-smoothstep(22.,48.,d))*.3*k;gl_FragColor=vec4(col*a,a);}'});
var shafts=[];for(var i=0;i<16;i++){var m=new T.Mesh(new T.PlaneBufferGeometry(2*W,WALLH+1),shaftMat);m.position.set(0,FL+WALLH/2,9.2-i*2.6);scene.add(m);shafts.push(m)}

/* ── Polvo ── */
var NP=reduce?260:850,pg=new T.BufferGeometry(),pp=new Float32Array(NP*3),pr=new Float32Array(NP);
for(var i=0;i<NP;i++){pp[i*3]=(Math.random()-.5)*2*(W-.2);pp[i*3+1]=FL+Math.random()*(P?5:4.6);pp[i*3+2]=8-Math.random()*100;pr[i]=Math.random()}
pg.setAttribute('position',new T.BufferAttribute(pp,3));pg.setAttribute('r',new T.BufferAttribute(pr,1));
var dustMat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{time:U.time,sc:{value:700},col:{value:new T.Color(1,.8,.55)}},
vertexShader:'attribute float r;uniform float time,sc;varying float vA;void main(){vec3 p=position;p.x+=sin(time*.1+r*40.)*.3;p.y+=sin(time*.07+r*31.)*.2;vec4 mv=viewMatrix*modelMatrix*vec4(p,1.);float d=-mv.z;gl_PointSize=clamp((1.2+r*2.4)*sc/max(d,.6)*.07,1.,26.);vA=(.2+.6*r)*smoothstep(.5,2.,d)*(1.-smoothstep(22.,50.,d))*(.55+.45*sin(time*(.8+r*2.)+r*60.));gl_Position=projectionMatrix*mv;}',
fragmentShader:'uniform vec3 col;varying float vA;void main(){float d=length(gl_PointCoord-.5)*2.;float a=smoothstep(1.,0.,d);a*=a;gl_FragColor=vec4(col*a*vA,a*vA);}'});
var dust=new T.Points(pg,dustMat);dust.frustumCulled=false;scene.add(dust);

/* ── Trazo de luz: barras que recorren la geometría con avance 0..1 ── */
var lineVS='attribute float aU;varying float vU;varying vec3 vW;void main(){vU=aU;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}';
var lineFS='uniform float draw,pulse;uniform vec3 col,cam;varying float vU;varying vec3 vW;void main(){if(vU>draw)discard;float hd=smoothstep(.05,0.,draw-vU);float d=distance(vW,cam);float f=1.-smoothstep(30.,80.,d);gl_FragColor=vec4(col*(1.+hd*2.2+pulse)*f,1.);}';
function lineMat(col){return new T.ShaderMaterial({uniforms:{draw:{value:0},pulse:{value:0},col:{value:col},cam:U.cam},vertexShader:lineVS,fragmentShader:lineFS})}
function polyBars(pts,w,closed){
 var n=pts.length,segs=closed?n:n-1,L=[],tot=0,i;
 for(i=0;i<segs;i++){var l=pts[i].distanceTo(pts[(i+1)%n]);L.push(l);tot+=l}
 var pos=[],uu=[],idx=[],acc=0,base=0;
 for(i=0;i<segs;i++){
  var a=pts[i],b=pts[(i+1)%n],len=L[i],g=new T.BoxGeometry(w,w,len+w*.9);
  var m=new T.Matrix4();m.lookAt(b,a,new T.Vector3(0,1,Math.abs(b.clone().sub(a).normalize().y)>.99?.001:0));m.setPosition(a.clone().add(b).multiplyScalar(.5));
  var pa=g.attributes.position;
  for(var k=0;k<pa.count;k++){var z=pa.getZ(k),v=new T.Vector3(pa.getX(k),pa.getY(k),z).applyMatrix4(m);pos.push(v.x,v.y,v.z);uu.push((acc+(z/(len+w*.9)+.5)*len)/tot)}
  var ia=g.index.array;for(k=0;k<ia.length;k++)idx.push(ia[k]+base);base+=pa.count;acc+=len;g.dispose();
 }
 var G=new T.BufferGeometry();G.setAttribute('position',new T.Float32BufferAttribute(pos,3));G.setAttribute('aU',new T.Float32BufferAttribute(uu,1));G.setIndex(idx);return G}
function V(x,y,z){return new T.Vector3(x,y,z)}
function setDraw(m,v){m.material.uniforms.draw.value=v;m.visible=v>.0005}
function lineObj(pts,w,closed,col){var mat=lineMat(col),m=new T.Mesh(polyBars(pts,w,closed),mat);m.frustumCulled=false;scene.add(m);return m}

var GREEN=hdr(0,1,.2,1.3),CREAM=hdr(1,.9,.72,2.0),CREAMD=hdr(1,.9,.72,.8);
/* señal en el suelo: avanza recto y hace quiebres a 90° (como el trazo del logotipo) */
var sigPts=[V(0,FL+.012,9)],sx=0,sz=9,jogs=[[-8,.95],[-20,-.95],[-33,.95],[-47,-.95],[-60,.95],[-72,-.95],[-84,.0]];
jogs.forEach(function(j){sz=j[0];sigPts.push(V(sx,FL+.012,sz));sx=j[1];sigPts.push(V(sx,FL+.012,sz))});sigPts.push(V(0,FL+.012,ZEND+1.5));
var sig=lineObj(sigPts,.05,false,GREEN);

/* estaciones: objetos de luz (no maquetas de pantallas) */
var OZ={map:-12.5,ring:-26,chat:-60,cal:-74.5},obj={};
/* 1 · mapa de negocios: puntos tenues; uno solo se enciende (el tuyo) */
(function(){var n=P?260:520,ps=new Float32Array(n*3),sz=new Float32Array(n),X=P?1.7:3.0,Y0=-.6,Y1=P?3.0:2.7,k=0,rnd=function(a,b){return a+Math.random()*(b-a)};
 for(var s=0;s<(P?18:30);s++){var hor=Math.random()<.5,cx=rnd(-X,X),cy=rnd(Y0,Y1),l=rnd(.5,1.8),st=.075,m=Math.floor(l/st);for(var q=0;q<m&&k<n;q++){ps[k*3]=hor?cx+q*st:cx;ps[k*3+1]=hor?cy:cy+q*st;ps[k*3+2]=OZ.map+rnd(-.04,.04);sz[k]=.5+Math.random()*1.3;k++}}
 while(k<n){ps[k*3]=rnd(-X,X);ps[k*3+1]=rnd(Y0,Y1);ps[k*3+2]=OZ.map;sz[k]=.5+Math.random()*.8;k++}
 var g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(ps,3));g.setAttribute('sz',new T.BufferAttribute(sz,1));
 var mat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{lit:{value:0},sc:{value:700},col:{value:new T.Color(1,.85,.62)}},
 vertexShader:'attribute float sz;uniform float lit,sc;varying float vA;void main(){vec4 mv=viewMatrix*modelMatrix*vec4(position,1.);float d=-mv.z;gl_PointSize=clamp(sz*sc/max(d,.5)*.05,1.,14.);vA=lit*(.35+.5*fract(sin(dot(position.xy,vec2(12.9,78.2)))*43758.5));gl_Position=projectionMatrix*mv;}',
 fragmentShader:'uniform vec3 col;varying float vA;void main(){float d=length(gl_PointCoord-.5)*2.;float a=smoothstep(1.,.2,d);gl_FragColor=vec4(col*a*vA*1.8,a*vA);}'});
 var pts=new T.Points(g,mat);pts.frustumCulled=false;scene.add(pts);obj.map=pts;
 var px=P?.45:.95,py=.95,pin=new T.Group();pin.position.set(px,py,OZ.map);scene.add(pin);
 var core=new T.Mesh(new T.SphereGeometry(.09,16,12),new T.MeshBasicMaterial({color:GREEN,fog:false}));pin.add(core);
 var beam=lineObj([V(px,py,OZ.map),V(px,py+3.6,OZ.map)],.045,false,GREEN);
 var rg=[];for(var i=0;i<=48;i++){var a=i/48*Math.PI*2;rg.push(V(px+Math.cos(a)*.42,py+Math.sin(a)*.42,OZ.map))}var rr=lineObj(rg,.025,false,GREEN);
 obj.pin=pin;obj.pinBeam=beam;obj.pinRing=rr}());
/* 2 · anillo de enfoque que se cierra (la respuesta en cinco segundos) */
(function(){var cx=0,cy=.55,R=P?1.25:1.7,pts=[];for(var i=0;i<=96;i++){var a=Math.PI/2-i/96*Math.PI*2;pts.push(V(cx+Math.cos(a)*R,cy+Math.sin(a)*R,OZ.ring))}
 obj.ring=lineObj(pts,.06,false,GREEN);
 var ticks=[];for(var i=0;i<60;i++){var a=i/60*Math.PI*2,r0=R+.16,r1=R+(i%5?.24:.4);ticks.push([V(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0,OZ.ring),V(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1,OZ.ring)])}
 obj.ticks=ticks.map(function(t){return lineObj(t,.018,false,CREAMD)});
 obj.ringC=[cx,cy,R]}());
/* 3 · mensaje: contorno de globo y texto escrito con luz */
(function(){var bw=P?2.0:3.5,bh=P?1.75:1.45,x0=-bw/2,y0=.2,pts=[],r=.28,add=function(cx,cy,a0,a1){for(var i=0;i<=8;i++){var a=a0+(a1-a0)*i/8;pts.push(V(cx+Math.cos(a)*r,cy+Math.sin(a)*r,OZ.chat))}};
 add(x0+bw-r,y0+r,-Math.PI/2,0);add(x0+bw-r,y0+bh-r,0,Math.PI/2);add(x0+r,y0+bh-r,Math.PI/2,Math.PI);add(x0+r,y0+r,Math.PI,Math.PI*1.5);
 pts.splice(0,0,V(x0+bw*.72,y0,OZ.chat));pts.splice(1,0,V(x0+bw*.8,y0-.38,OZ.chat));pts.splice(2,0,V(x0+bw*.58,y0,OZ.chat));
 /* reordenar: cola entre el borde inferior derecho y el centro */
 var tail=[V(x0+bw*.8,y0,OZ.chat),V(x0+bw*.86,y0-.4,OZ.chat),V(x0+bw*.62,y0,OZ.chat)];
 var body=[];for(var i=3;i<pts.length;i++)body.push(pts[i]);body.push(body[0].clone());
 obj.bubble=lineObj(body,.04,false,CREAM);obj.tail=lineObj(tail,.04,false,CREAM);
 var cv2=document.createElement('canvas');cv2.width=P?820:1024;cv2.height=P?760:560;obj.msgC=cv2;obj.msgG=cv2.getContext('2d');
 var tx=new T.CanvasTexture(cv2);tx.minFilter=T.LinearFilter;tx.generateMipmaps=false;obj.msgT=tx;
 var pm=new T.Mesh(new T.PlaneBufferGeometry(bw-.5,bh-.4),new T.MeshBasicMaterial({map:tx,transparent:true,color:hdr(1,.95,.8,1.9),depthWrite:false,fog:false}));pm.position.set(0,y0+bh/2,OZ.chat+.01);scene.add(pm);obj.msgM=pm;var bk=new T.Mesh(new T.PlaneBufferGeometry(bw-.22,bh-.2),new T.MeshBasicMaterial({color:0x050807,fog:false}));bk.position.set(0,y0+bh/2,OZ.chat-.01);scene.add(bk);obj.msgBk=bk;
 obj.msgN=-1;
 var dg=new T.BufferGeometry();dg.setAttribute('position',new T.Float32BufferAttribute([x0+.35,y0-.55,OZ.chat,x0+.6,y0-.55,OZ.chat,x0+.85,y0-.55,OZ.chat],3));
 obj.dots=new T.Points(dg,new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{time:U.time,on:{value:0}},
 vertexShader:'uniform float time,on;varying float vA;void main(){vec4 mv=viewMatrix*modelMatrix*vec4(position,1.);gl_PointSize=clamp(120./-mv.z*.2,2.,22.);vA=on*(.35+.65*smoothstep(.2,1.,sin(time*4.-position.x*8.)*.5+.5));gl_Position=projectionMatrix*mv;}',
 fragmentShader:'varying float vA;void main(){float d=length(gl_PointCoord-.5)*2.;float a=smoothstep(1.,.3,d);gl_FragColor=vec4(vec3(1.,.95,.8)*a*vA*2.,a*vA);}'}));
 obj.dots.frustumCulled=false;scene.add(obj.dots);obj.chatDim=[bw,bh,x0,y0]}());
/* 4 · agenda: cuadrícula de horarios; una celda se confirma */
(function(){var cols=5,rows=3,cw=P?.46:.62,ch=P?.5:.52,g=.09,gw=cols*cw+(cols-1)*g,gh=rows*ch+(rows-1)*g,x0=-gw/2,y0=.0;obj.cells=[];obj.calSel=null;
 for(var r=0;r<rows;r++)for(var c=0;c<cols;c++){var x=x0+c*(cw+g),y=y0+(rows-1-r)*(ch+g);var cell=lineObj([V(x,y,OZ.cal),V(x+cw,y,OZ.cal),V(x+cw,y+ch,OZ.cal),V(x,y+ch,OZ.cal),V(x,y,OZ.cal)],.028,false,r===1&&c===2?CREAM:CREAMD);
  obj.cells.push(cell);if(r===1&&c===2){obj.calSel={x:x,y:y,w:cw,h:ch}}}
 var s=obj.calSel;var fill=new T.Mesh(new T.PlaneBufferGeometry(s.w-.05,s.h-.05),new T.MeshBasicMaterial({color:hdr(0,1,.5,0),transparent:true,depthWrite:false,fog:false}));fill.position.set(s.x+s.w/2,s.y+s.h/2,OZ.cal-.005);scene.add(fill);obj.fill=fill;
 var ck=[V(s.x+s.w*.24,s.y+s.h*.5,OZ.cal+.01),V(s.x+s.w*.43,s.y+s.h*.28,OZ.cal+.01),V(s.x+s.w*.78,s.y+s.h*.74,OZ.cal+.01)];obj.check=lineObj(ck,.05,false,hdr(.02,.1,.06,.6));
 obj.calY=[y0,gh]}());
function setMsg(n){if(n===obj.msgN)return;obj.msgN=n;var g=obj.msgG,c=obj.msgC;g.clearRect(0,0,c.width,c.height);g.fillStyle='#fff6e3';g.textBaseline='top';var T0='DIAGNÓSTICO. Nombre: ___ | Ciudad: ___ | Tipo de negocio: ___ | Mi Google o Instagram: ___',s=T0.slice(0,n)+(n<T0.length?'▍':'');
 g.font='500 50px '+(cfg.fontMono||'"IBM Plex Mono"')+',ui-monospace,monospace';var w=s.split(' '),l='',y=14,mw=c.width-60,lh=P?78:68;w.forEach(function(x){var t=l?l+' '+x:x;if(g.measureText(t).width>mw&&l){g.fillText(l,30,y);y+=lh;l=x}else l=t});if(l)g.fillText(l,30,y);obj.msgT.needsUpdate=true}

/* ── Recorrido de cámara ── */
var KZ=[8,-6.5,-20,-33,-54,-68.5,-80],NK=KZ.length-1,KX=[0,.35,-.3,0,.3,-.25,0],KY=[.34,.3,.28,.18,.32,.3,.4];
function zAt(p){var x=cl(p,0,1)*NK,i=Math.min(NK-1,Math.floor(x)),f=x-i,e=sm(.2,.8,f);return {z:lerp(KZ[i],KZ[i+1],e),i:i,f:f,e:e,xi:lerp(KX[i],KX[i+1],e),yi:lerp(KY[i],KY[i+1],e)}}

/* ── Posproceso: bloom HDR + pase final (aberración, grano, viñeta, tono) ── */
var vw=1,vh=1,dprScale=1,composer,bloom,fin;
var FinShader={uniforms:{tDiffuse:{value:null},time:{value:0},expo:{value:1},asp:{value:1},vig:{value:.85},gr:{value:.016}},
vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:'uniform sampler2D tDiffuse;uniform float time,expo,asp,vig,gr;varying vec2 vUv;'+
'float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}'+
'vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}'+
'void main(){vec2 c=(vUv-.5)*vec2(asp,1.);float r2=dot(c,c);vec2 off=(vUv-.5)*r2*.006;'+
'vec3 col=vec3(texture2D(tDiffuse,vUv+off).r,texture2D(tDiffuse,vUv).g,texture2D(tDiffuse,vUv-off).b);'+
'col*=expo;col=aces(col*.92);float l=dot(col,vec3(.299,.587,.114));col=mix(col*vec3(.9,1.,1.08),col*vec3(1.08,1.,.9),smoothstep(.18,.8,l));'+
'col*=1.-vig*smoothstep(.2,.95,sqrt(r2)*1.25);col+=(h21(vUv*vec2(asp,1.)*820.+fract(time)*61.)-.5)*gr;'+
'gl_FragColor=vec4(pow(max(col,0.),vec3(.4545)),1.);}'};
function buildComposer(){
 var rt=new T.WebGLMultisampleRenderTarget(vw,vh,{type:T.HalfFloatType,format:T.RGBAFormat,minFilter:T.LinearFilter,magFilter:T.LinearFilter});rt.samples=P?2:4;
 composer=new T.EffectComposer(renderer,rt);composer.addPass(new T.RenderPass(scene,camera));
 bloom=new T.UnrealBloomPass(new T.Vector2(vw,vh),.6,.7,.9);composer.addPass(bloom);
 fin=new T.ShaderPass(FinShader);composer.addPass(fin)}

var target=0,cur=0,lastT=performance.now(),ema=16,slow=0,needs=true,bloomOn=true;
function resize(){
 vw=stage.clientWidth||innerWidth;vh=stage.clientHeight||innerHeight;if(dead)return;var np=vh>vw*1.05;if(np!==P){clearTimeout(rl);rl=setTimeout(function(){location.reload()},350);return}
 var dpr=Math.min(devicePixelRatio||1,P?1.75:1.5)*dprScale;renderer.setPixelRatio(dpr);renderer.setSize(vw,vh,false);
 if(composer){composer.setPixelRatio(dpr);composer.setSize(vw,vh)}
 camera.aspect=vw/vh;camera.updateProjectionMatrix();fin&&(fin.uniforms.asp.value=vw/vh);
 var th=Math.tan(camera.fov*Math.PI/360);skyMat.uniforms.tn.value.set(th*camera.aspect,th);
 needs=true}
/* Progreso de cámara a partir de las secciones reales de la página: cada [data-kf] ancla un fotograma clave en su centro;
   [data-kf-final] fija el fotograma final mientras su sección está a la vista (hay salas opacas entre ambos tramos). */
function measure(){var sy=scrollY,vv=innerHeight;anchors=[];fnl=null;
 [].forEach.call(document.querySelectorAll('[data-kf]'),function(el){var r=el.getBoundingClientRect(),top=r.top+sy,k=parseFloat(el.getAttribute('data-kf'));
  if(el.hasAttribute('data-kf-final')){fnl={top:top,kf:k};return}
  anchors.push({a:top+r.height/2-vv/2,kf:k})})}
function kfAt(y){
 if(fnl&&y+innerHeight>fnl.top)return fnl.kf;
 if(!anchors.length)return 0;
 if(y<=anchors[0].a)return anchors[0].kf;
 for(var i=0;i<anchors.length-1;i++){var A=anchors[i],B=anchors[i+1];if(y<B.a)return B.a>A.a?lerp(A.kf,B.kf,(y-A.a)/(B.a-A.a)):B.kf}
 return anchors[anchors.length-1].kf}
function getTarget(){return cl(kfAt(scrollY)/NK,0,1)}
function onScroll(){needs=true}
function onResize(){measure();resize()}
function onOrient(){setTimeout(onResize,250)}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onResize);addEventListener('orientationchange',onOrient);
function setActive(v){if(dead||v===active)return;active=v;cfg.onActive&&cfg.onActive(v);if(v){lastT=performance.now();needs=true;if(!raf&&ready)raf=requestAnimationFrame(frame)}}
function destroy(){if(dead)return;dead=true;active=false;if(raf)cancelAnimationFrame(raf);clearTimeout(rl);removeEventListener('scroll',onScroll);removeEventListener('resize',onResize);removeEventListener('orientationchange',onOrient);io&&io.disconnect();ro&&ro.disconnect();try{composer&&composer.renderTarget1&&composer.renderTarget1.dispose();composer&&composer.renderTarget2&&composer.renderTarget2.dispose();renderer.dispose();renderer.forceContextLoss()}catch(e){}if(window.__lssVisor===api)window.__lssVisor=null}

var elTC=cfg.tc||null;
function pad(n,l){n=String(n);while(n.length<l)n='0'+n;return n}
function prog(oz,camz,a,b){return 1-sm(a,b,camz-oz)}   /* se completa cuando la cámara llega a 'a' metros del objeto */

var look=new T.Vector3(),tmpC=new T.Color(),tmpC2=new T.Color(),tmpC3=new T.Color();
function frame(now){
 raf=0;if(!active||dead)return;raf=requestAnimationFrame(frame);
 var dt=Math.min(.1,(now-lastT)/1000);lastT=now;
 if(reduce&&!needs)return;
 target=getTarget();var k=reduce?1:1-Math.exp(-dt*6);cur+=(target-cur)*k;if(Math.abs(target-cur)<1e-5)cur=target;
 var t=now/1000;U.time.value=reduce?0:t;
 var z=zAt(cur),sw=reduce?0:1;
 var cx=z.xi+sw*(.05*Math.sin(t*.6)+.02*Math.sin(t*1.7)),cy=z.yi+sw*(.03*Math.sin(t*.8+1)+.012*Math.sin(t*2.1));
 camera.position.set(cx,cy,z.z);U.cam.value.copy(camera.position);
 var zl=zAt(Math.min(1,cur+.02));look.set(zl.xi*.9-cx*.0+(z.e*(1-z.e))*.9*(z.i%2?-1:1),zl.yi+.05,zl.z-7);camera.lookAt(look);
 camera.rotation.z+=sw*.004*Math.sin(t*.5)+z.e*(1-z.e)*.04*(z.i%2?-1:1);
 camera.updateMatrixWorld();
 var cz=camera.position.z;
 /* iris: se abre al aproximarse; sobreexposición al cruzar; el mundo cambia de día a noche en el blanco */
 endW.visible=endW.userData.fr.visible=cz<ZIRIS+2;BR.visible=true;var open=sm(-24,-39.2,cz);irisM.uniforms.R.value=lerp(P?1.8:2.5,P?14:15,open*open);irisM.uniforms.rot.value=open*1.35+(reduce?0:t*.02);
 var cross=Math.exp(-Math.pow((cz-(ZIRIS+1.2))/2.6,2));
 M=sm(ZIRIS+.5,ZIRIS-3.5,cz);skyMat.uniforms.mixv.value=M;poolMat.uniforms.k.value=lerp(.45,.7,M);poolMat.uniforms.col.value.copy(tmpC2.lerpColors(PAL.key[0],POOLG,M));
 /* paleta */
 pal('top',skyMat.uniforms.top.value);pal('mid',skyMat.uniforms.mid.value);pal('hor',skyMat.uniforms.hor.value);
 pal('fog',scene.fog.color);scene.fog.density=lerp(.03,.032,M);
 pal('emis',tmpC);irisM.uniforms.edge.value.copy(tmpC).multiplyScalar(1.1);pal('fog',irisM.uniforms.fogc.value);endM.uniforms.edge.value.copy(PAL.hor[1]).multiplyScalar(1.1);endM.uniforms.fogc.value.copy(scene.fog.color);
 irisM.uniforms.fogd.value=endM.uniforms.fogd.value=scene.fog.density;
 /* luz: haz oblicuo con sombras de aletas (día) → lámparas y señal (noche) */
 spot.intensity=lerp(5.6,0,M);spot.position.set(cx-6.5,8.4,cz+3);spot.target.position.set(cx+.5,FL,cz-10);
 hemi.intensity=lerp(.2,.05,M);
 lampA.intensity=M*1.5;lampA.position.set(cx+.8,2.4,cz-3);lampB.intensity=M*.9;lampB.position.set(cx-.6,.6,cz-9);
 shaftMat.uniforms.k.value=1-M;
 shafts.forEach(function(s,i){var zz=9.2-i*2.6,base=Math.floor((cz-9.2)/-2.6/16)*16*2.6;s.position.z=zz;s.visible=zz>ZIRIS&&M<.99});
 /* objetos: avance por proximidad */
 obj.map.material.uniforms.lit.value=prog(OZ.map,cz,5.5,17);
 var sp=prog(OZ.map,cz,5.8,12.5),pp2=sm(0,1,sp);obj.pin.scale.setScalar(.01+pp2);setDraw(obj.pinBeam,pp2);setDraw(obj.pinRing,sm(.3,1,sp));obj.pinRing.material.uniforms.pulse.value=.6*Math.sin(t*3)*pp2;
 var rs=prog(OZ.ring,cz,5.5,15);setDraw(obj.ring,rs);obj.ticks.forEach(function(m,i){setDraw(m,sm(i/60*.8,i/60*.8+.2,rs))});obj.ring.material.uniforms.pulse.value=(rs>.98?.5+.5*Math.sin(t*3):0);
 var cs=prog(OZ.chat,cz,5.5,13);setDraw(obj.bubble,cs);setDraw(obj.tail,sm(.85,1,cs));obj.msgM.visible=obj.msgBk.visible=cs>.55;setMsg(cs>.55?Math.floor(cl((cs-.55)/.4,0,1)*86):0);obj.dots.material.uniforms.on.value=cs>.5&&cs<.995?1:0;
 var as=prog(OZ.cal,cz,5.5,13);obj.cells.forEach(function(m,i){setDraw(m,sm(i/15*.7,i/15*.7+.3,as))});
 var sel=sm(.6,.9,as);obj.fill.material.color.setRGB(0,sel*2.2,sel*1.1);setDraw(obj.check,sm(.8,1,as));
 setDraw(sig,cl((9-(cz-8))/ (9-ZEND+1.5),0,1));
 if(elTC){var secs=cur*68,fr=Math.floor(secs*24);elTC.textContent='00:'+pad(Math.floor(secs/60),2)+':'+pad(Math.floor(secs%60),2)+':'+pad(fr%24,2)}
 fin.uniforms.time.value=t;fin.uniforms.expo.value=1+cross*8;fin.uniforms.vig.value=lerp(.85,.95,M);
 bloom.strength=(bloomOn?lerp(.55,.75,M)+cross*1.2:0);bloom.enabled=bloomOn;
 ema=ema*.95+dt*1000*.05;if(ema>26){slow++}else slow=Math.max(0,slow-1);
 if(slow>100){slow=0;ema=16;if(dprScale>.62){dprScale*=.84;resize()}else if(bloomOn){bloomOn=false}}
 renderer.info.reset();composer.render(dt);needs=false;
}
function start(){
 if(dead)return;measure();resize();buildComposer();resize();setMsg(0);cur=target=getTarget();ready=true;
 if(window.IntersectionObserver){io=new IntersectionObserver(function(es){es.forEach(function(e){vis.set(e.target,e.isIntersecting)});var any=false;vis.forEach(function(v){if(v)any=true});setActive(any)});[].forEach.call(document.querySelectorAll('[data-kf-zone]'),function(z){io.observe(z)})}
 if(window.ResizeObserver){ro=new ResizeObserver(function(){measure();needs=true});ro.observe(document.body)}
 cfg.onReady&&cfg.onReady();setActive(true);
}
var fl=document.fonts&&document.fonts.load?Promise.all((cfg.fontLoad||[]).map(function(f){return document.fonts.load(f)})).catch(function(){}):Promise.resolve();
fl.then(start);
var api={destroy:destroy,
 get info(){return {calls:renderer.info.render.calls,tris:renderer.info.render.triangles,geo:renderer.info.memory.geometries,tex:renderer.info.memory.textures}},
 get p(){return cur},get q(){return {bloom:bloomOn,dpr:dprScale,ema:ema,active:active}},
 setKf:function(k){measure();var y=0;if(fnl&&k>=fnl.kf)y=fnl.top-innerHeight*.35;else{y=anchors.length?anchors[0].a:0;for(var i=0;i<anchors.length;i++){if(anchors[i].kf<=k)y=anchors[i].a;if(i<anchors.length-1&&k>anchors[i].kf&&k<anchors[i+1].kf){y=lerp(anchors[i].a,anchors[i+1].a,(k-anchors[i].kf)/(anchors[i+1].kf-anchors[i].kf));break}}}scrollTo(0,Math.max(0,y));needs=true}};
window.__lssVisor=api;
return api;
}
window.LSSVisor={start:boot};
})();
