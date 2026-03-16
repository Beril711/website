'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function NewsletterForm({ source = 'footer' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    const { error } = await supabase.from('newsletter_subscribers').insert([
      { email },
    ]);

    if (error) {
      if (error.code === '23505') {
        setStatus('error');
        setMessage('Bu e-posta adresi zaten kayıtlı.');
      } else {
        setStatus('error');
        setMessage('Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } else {
      setStatus('success');
      setMessage('Başarıyla abone oldunuz!');
      setEmail('');
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