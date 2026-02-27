'use client';

import { useCountUp, useInView } from '@/hooks/useCountUp';

function AnimatedStat({ value, label, start }) {
    const count = useCountUp(value, 1200, start);
    return (
        <div className="odak-stat">
            <div className="odak-stat-val">{count}</div>
            <div className="odak-stat-label">{label}</div>
        </div>
    );
}

const STATS = [
    { value: 9, label: 'Bölüm' },
    { value: 14, label: 'Program' },
    { value: 11, label: 'Workshop Salonu' },
    { value: 25, label: 'Kişi/Salon Kontenjan' },
];

export default function OdakStats() {
    const [ref, visible] = useInView(0.3);
    return (
        <div className="odak-stats" ref={ref}>
            {STATS.map((s) => (
                <AnimatedStat key={s.label} value={s.value} label={s.label} start={visible} />
            ))}
        </div>
    );
}
