'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function IletisimForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('contact_messages').insert([
      {
        name: form.name,
        email: form.email,
        subject: form.subject || null,
        message: form.message,
      },
    ]);

    if (error) {
      setStatus('error');
      setErrorMsg('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } else {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="ct-success">
        <div className="ct-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
        </div>
        <h3>Mesajınız Gönderildi!</h3>
        <p>En kısa sürede size dönüş yapacağız.</p>
      </div>
    );
  }

  return (
    <form className="ct-form" onSubmit={handleSubmit}>
      <div className="ct-form-row">
        <div className="ct-field">
          <label className="ct-label">Ad Soyad</label>
          <input className="ct-input" name="name" value={form.name} onChange={handleChange} required placeholder="Adınız Soyadınız" />
        </div>
        <div className="ct-field">
          <label className="ct-label">E-posta</label>
          <input className="ct-input" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="ornek@email.com" />
        </div>
      </div>

      <div className="ct-field">
        <label className="ct-label">Konu</label>
        <select className="ct-input ct-select" name="subject" value={form.subject} onChange={handleChange} required>
          <option value="" disabled>Konu seçiniz</option>
          <option value="genel">Genel Bilgi</option>
          <option value="kayit">Kayıt & Katılım</option>
          <option value="workshop">Workshop Soruları</option>
          <option value="sponsor">Sponsorluk Teklifi</option>
          <option value="medya">Basın & Medya</option>
          <option value="diger">Diğer</option>
        </select>
      </div>

      <div className="ct-field">
        <label className="ct-label">Mesajınız</label>
        <textarea className="ct-input ct-textarea" name="message" value={form.message} onChange={handleChange} required placeholder="Mesajınızı buraya yazabilirsiniz..." rows={5} />
      </div>

      {errorMsg && (
        <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: 16, textAlign: 'center' }}>
          {errorMsg}
        </p>
      )}

      <button type="submit" className="btn btn-primary ct-submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Gönderiliyor...' : (
          <>
            Mesajı Gönder
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 16, height: 16 }}>
              <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}