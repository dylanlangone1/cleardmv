import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import type { IssueType, HandoffContext, Message } from '@/types/chat';
import { getStateData } from '@/data/states';
import { buildSystemPrompt } from '@/lib/ai/systemPrompt';
import { checkRateLimit } from '@/lib/rateLimit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  // Rate limit: 20 chat requests per hour per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(`chat:${ip}`, 20, 60 * 60 * 1000)) {
    return new Response(
      JSON.stringify({ error: 'Chat limit reached (20/hour). Please try again later.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } },
    );
  }

  try {
    const body = await req.json() as {
      state: string;
      issue?: IssueType;
      messages: Message[];
      handoffContext?: HandoffContext;
    };

    const { state: stateCode, issue, messages, handoffContext } = body;

    if (!stateCode) {
      return new Response(JSON.stringify({ error: 'state is required' }), { status: 400 });
    }

    const stateData = getStateData(stateCode);
    if (!stateData) {
      return new Response(JSON.stringify({ error: `Unknown state: ${stateCode}` }), { status: 400 });
    }

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages is required' }), { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(stateData, issue, handoffContext);

    // Build Anthropic message array from our Message[]
    const anthropicMessages: Anthropic.MessageParam[] = messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // Stream response
    const stream = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: anthropicMessages,
      stream: true,
    });

    // Return SSE stream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(chunk));
            } else if (event.type === 'message_stop') {
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (err) {
    console.error('[chat/route] error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Internal server error' }),
      { status: 500 },
    );
  }
}
