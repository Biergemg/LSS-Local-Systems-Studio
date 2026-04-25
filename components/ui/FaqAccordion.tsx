'use client';

import { useState } from 'react';
import type { FaqItem } from '@/types';

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              borderTop: '1px solid var(--border)',
              borderBottom: index === items.length - 1 ? '1px solid var(--border)' : 'none',
            }}
          >
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '24px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--text-md)',
                  fontWeight: 500,
                  color: 'var(--fg)',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--tracking-wide)',
                }}
              >
                {item.question}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '24px',
                  color: 'var(--accent)',
                  flexShrink: 0,
                  lineHeight: 1,
                  transition: 'transform 0.2s ease',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 300,
                  color: 'var(--fg2)',
                  lineHeight: 1.7,
                  paddingBottom: '24px',
                  maxWidth: '720px',
                }}
              >
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
