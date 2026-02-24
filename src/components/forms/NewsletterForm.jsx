'use client';

import { useState } from 'react';

export default function NewsletterForm({ source = 'footer' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Başarıyla abone oldunuz!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Bir hata oluştu, tekrar deneyin.');
      }
    } catch {
      setStatus('error');
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        padding: '10px 14px',
        borderRadius: '8px',
        background: 'rgba(34,197,94,0.1)',
        border: '1px solid rgba(34,197,94,0.2)',
        color: '#22c55e',
        fontSize: '0.82rem',
        fontWeight: '500'
      }}>
        ✓ {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="footer-newsletter">
        <input
          type="email"
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === 'loading'}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? '...' : 'Abone Ol'}
        </button>
      </div>
      {status === 'error' && (
        <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '6px' }}>
          {message}
        </p>
      )}
    </form>
  );
}