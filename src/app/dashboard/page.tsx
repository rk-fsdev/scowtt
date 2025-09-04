import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import styles from './dashboard.module.css';

async function getFunFact(movie: string | null | undefined): Promise<string> {
  if (!movie) return 'No favorite movie set.';
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/fun-fact?movie=${encodeURIComponent(movie)}`,
      { cache: 'no-store' },
    );
    if (!res.ok) throw new Error('bad');
    const data = await res.json();
    return data.fact ?? 'Could not generate a fact.';
  } catch {
    return 'Could not generate a fact.';
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <main className="container">
        <div className="card">
          <p>
            Not authenticated. <Link href="/login">Login</Link>
          </p>
        </div>
      </main>
    );
  }
  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!dbUser?.favoriteMovie) {
    return (
      <main className="container">
        <div className="card">
          <h2>Welcome {session.user.name ?? 'there'}!</h2>
          <p>Before proceeding, tell us your favorite movie.</p>
          <div className="space" />
          <Link className="btn" href="/onboarding">
            Set favorite movie
          </Link>
        </div>
      </main>
    );
  }

  const fact = await getFunFact(dbUser.favoriteMovie);

  return (
    <main className="container">
      <div className="card">
        <div className="row">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt="avatar"
              width={56}
              height={56}
              className={styles.avatar}
            />
          )}
          <div>
            <div>
              <strong>{session.user.name ?? 'Unnamed'}</strong>
            </div>
            <div className="muted">{session.user.email}</div>
          </div>
          <div className={styles.pushRight}>
            <form action="/api/auth/signout" method="post">
              <button className="btn secondary">Logout</button>
            </form>
          </div>
        </div>
        <div className="space" />
        <p>
          <strong>Favorite Movie:</strong> {dbUser.favoriteMovie}
        </p>
        <div className="space" />
        <p>
          <strong>Fun fact:</strong> {fact}
        </p>
        <p className="muted">Refresh to get a new fact.</p>
      </div>
    </main>
  );
}
