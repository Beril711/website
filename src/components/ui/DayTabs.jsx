'use client';

const DAYS = [
    { key: 'gun1', label: '1. Gün', subtitle: 'Açılış & Sektör' },
    { key: 'gun2', label: '2. Gün', subtitle: 'Workshoplar' },
    { key: 'gun3', label: '3. Gün', subtitle: 'Sunumlar & Kapanış' },
];

export default function DayTabs({ activeDay, onChange }) {
    return (
        <div className="day-tabs">
            {DAYS.map((day) => (
                <button
                    key={day.key}
                    className={`day-tab ${activeDay === day.key ? 'day-tab--active' : ''}`}
                    onClick={() => onChange(day.key)}
                >
                    <span className="day-tab-label">{day.label}</span>
                    <span className="day-tab-sub">{day.subtitle}</span>
                </button>
            ))}
        </div>
    );
}
