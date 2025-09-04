import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const movie = searchParams.get('movie');
  if (!movie) return NextResponse.json({ error: 'movie required' }, { status: 400 });

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a concise movie facts generator.' },
        {
          role: 'user',
          content: `Give one interesting, specific, fresh fact about the movie "${movie}" in one sentence.`,
        },
      ],
      temperature: 0.9,
      max_tokens: 100,
    });
    const fact = completion.choices[0]?.message?.content?.trim() || null;
    return NextResponse.json({ fact });
  } catch (e) {
    return NextResponse.json({ fact: 'Unable to generate a fact right now.' }, { status: 200 });
  }
}
