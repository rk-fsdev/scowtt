import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { LoginButton } from '@/components/LoginButton';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return (
    <main className="container">
      <div className="card">
        <h1>Login</h1>
        <p className="muted">Use your Google account to continue.</p>
        <div className="space" />
        <LoginButton />
      </div>
    </main>
  );
}
