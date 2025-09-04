import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const favoriteMovie = typeof body?.favoriteMovie === 'string' ? body.favoriteMovie.trim() : '';
  if (!favoriteMovie)
    return NextResponse.json({ error: 'favoriteMovie required' }, { status: 400 });

  await prisma.user.update({ where: { email: session.user.email }, data: { favoriteMovie } });
  return NextResponse.json({ ok: true });
}
