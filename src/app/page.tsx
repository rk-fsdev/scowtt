import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }
  return (
    <main className="container">
      <div className="card">
        <h1>Welcome</h1>
        <p className="muted">Sign in to continue.</p>
        <div className="space" />
        <Link href="/login" className="btn">
          Login
        </Link>
      </div>
    </main>
  );
}
