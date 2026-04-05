import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';

export async function GET() {
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const keyPrefix = hasKey
    ? process.env.ANTHROPIC_API_KEY!.slice(0, 7) + '...'
    : 'NOT SET';

  if (!hasKey) {
    return new Response(
      JSON.stringify({ status: 'error', reason: 'ANTHROPIC_API_KEY not configured', key: keyPrefix }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }

  // Minimal API call to verify the key works
  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    await anthropic.messages.create({
      model: process.env.ANTHROPIC_CHAT_MODEL ?? 'claude-haiku-4-5',
      max_tokens: 5,
      messages: [{ role: 'user', content: 'hi' }],
    });
    return new Response(
      JSON.stringify({ status: 'ok', key: keyPrefix }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ status: 'error', reason: msg, key: keyPrefix }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
