'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './onboarding.module.css';

export default function OnboardingPage() {
  const router = useRouter();
  const [movie, setMovie] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    if (!movie.trim()) return;
    setSubmitting(true);
    const res = await fetch('/api/user/favorite-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favoriteMovie: movie.trim() }),
    });
    setSubmitting(false);
    if (res.ok) router.push('/dashboard');
  }

  return (
    <main className="container">
      <div className="card">
        <h1>One quick question</h1>
        <p className="muted">What's your favorite movie?</p>
        <div className="space" />
        <div className="row">
          <input
            className={styles.inputField}
            placeholder="e.g. The Matrix"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
          />
          <button className="btn" disabled={submitting || !movie.trim()} onClick={submit}>
            {submitting ? 'Saving...' : 'Continue'}
          </button>
        </div>
      </div>
    </main>
  );
}
