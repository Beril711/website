'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GUN1, GUN2, GUN3 } from '@/constants/programData';
import DayTabs from '@/components/ui/DayTabs';

const DAY_DATA = { gun1: GUN1, gun2: GUN2, gun3: GUN3 };

export default function ProgramPreview() {
  const [activeDay, setActiveDay] = useState('gun1');
  const items = DAY_DATA[activeDay];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header section-header--center">
          <div className="section-eyebrow">Program</div>
          <h2 className="section-heading">
            3 Günlük <span className="gradient-text">Etkinlik Akışı</span>
          </h2>
          <p className="section-desc">
            Açılış töreninden workshop günlerine, proje sunumlarından kapanış
            törenine yoğun bir program.
          </p>
        </div>

        {/* GÜN BUTONLARI */}
        <DayTabs activeDay={activeDay} onChange={setActiveDay} />

        {/* ETKİNLİK LİSTESİ */}
        <div className="program-list">
          {items.map((item) => (
            <div
              key={item.id}
              className={`program-item ${item.highlight ? 'program-item--highlight' : ''}`}
            >
              <div className="program-time">
                <div className="program-time-val">{item.time}</div>
                <span>{item.duration}</span>
              </div>
              <div className="program-body">
                <div>
                  <span
                    style={{
                      display: 'inline-flex',
                      padding: '3px 10px',
                      borderRadius: '100px',
                      border: `1px solid var(--border)`,
                      background: 'var(--tag-bg)',
                      color: 'var(--tag-text)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    {item.typeLabel}
                  </span>
                  <div className="program-title">{item.title}</div>
                  {item.desc && (
                    <div className="program-desc">{item.desc}</div>
                  )}
                </div>
                {item.location && (
                  <div className="program-location">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ width: '13px', height: '13px', flexShrink: 0 }}
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {item.location}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/program" className="btn btn-ghost">
            Tam Programı Gör
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ width: '16px', height: '16px' }}
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}