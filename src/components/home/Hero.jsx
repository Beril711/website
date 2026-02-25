'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCountUp, useInView } from '@/hooks/useCountUp';

const METRICS = [
  { value: 3, suffix: '', label: 'Gün' },
  { value: 9, suffix: '', label: 'Bölüm' },
  { value: 10, suffix: '', label: 'Workshop' },
  { value: 1250, suffix: '+', label: 'Katılımcı' },
];

function AnimatedMetric({ value, suffix, label, start }) {
  const count = useCountUp(value, value > 100 ? 2000 : 1200, start);
  return (
    <div className="hero-metric">
      <div className="hero-metric-val">{count}{suffix}</div>
      <div className="hero-metric-label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [ref, visible] = useInView(0.3);

  return (
    <section className="hero">
      <div className="hero-banner">
        <Image
          src="/logo/arka plan.jpeg"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="hero-banner-overlay" />
      </div>
      <div className="hero-dots" />

      <div className="container">
        <div className="hero-content">

          <div className="hero-tag">
            <span className="dot" />
            Geleceğin Teknolojisi, Eğitimin Gücü
          </div>

          <h1>
            Mucur <span className="gradient-text">Yapay</span><br />
            <span className="gradient-text">Zeka</span> Günleri
          </h1>

          <p className="hero-sub">
            Kırşehir Ahi Evran Üniversitesi Mucur MYO'nun 9 bölüm ve 14 programını
            buluşturan 3 günlük yapay zeka çalıştayı. Sektör oturumları, uygulamalı
            workshoplar ve proje sunumlarıyla dolu yoğun bir program.
          </p>

          <div className="hero-actions">
            <Link href="/kayit" className="btn btn-primary">
              Ücretsiz Kayıt Ol
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/program" className="btn btn-ghost">
              Programı İncele
            </Link>
          </div>

          <div className="hero-metrics" ref={ref}>
            {METRICS.map((m) => (
              <AnimatedMetric key={m.label} value={m.value} suffix={m.suffix} label={m.label} start={visible} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}