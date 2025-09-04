'use client';
import { signIn } from 'next-auth/react';

export function LoginButton() {
  return (
    <button className="btn" onClick={() => signIn('google', { callbackUrl: `/dashboard` })}>
      Continue with Google
    </button>
  );
}
