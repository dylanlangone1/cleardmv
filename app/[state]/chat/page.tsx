'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { StateSidebar } from '@/components/chat/StateSidebar';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { getStateData } from '@/data/states';
import { getIssue } from '@/data/issues';
import { useChat } from '@/hooks/useChat';
import type { IssueType, HandoffContext } from '@/types/chat';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

// ── Inner component (safely calls useSearchParams inside Suspense) ────────────
function ChatPageInner() {
  const params       = useParams<{ state: string }>();
  const searchParams = useSearchParams();
  const router       = useRouter();

  const stateCode  = params.state?.toLowerCase();
  const issue      = searchParams.get('issue') as IssueType | null;
  const initialQ   = searchParams.get('q') ?? '';
  const handoffRaw = searchParams.get('handoff');

  const handoffContext: HandoffContext | undefined = handoffRaw
    ? (() => {
        try { return JSON.parse(atob(handoffRaw)) as HandoffContext; }
        catch { return undefined; }
      })()
    : undefined;

  const stateData = stateCode ? getStateData(stateCode) : null;
  const issueData = issue ? getIssue(issue) : null;

  const { messages, streaming, error, sendMessage } = useChat(
    stateCode ?? '',
    issue ?? undefined,
    handoffContext,
  );

  const bottomRef           = useRef<HTMLDivElement>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (stateCode && !stateData) router.replace('/');
  }, [stateCode, stateData, router]);

  useEffect(() => {
    if (booted || !stateData) return;
    setBooted(true);

    let firstMsg = '';
    if (handoffContext) {
      firstMsg = [
        `I was sent here from TollFighter.`,
        handoffContext.plate ? `I have a registration hold on plate ${handoffContext.plate}.` : '',
        handoffContext.tollAuthority ? `The toll authority is ${handoffContext.tollAuthority}.` : '',
        handoffContext.totalOwed != null ? `I owe $${handoffContext.totalOwed.toFixed(2)} total.` : '',
        'What do I need to do to clear this hold?',
      ].filter(Boolean).join(' ');
    } else if (initialQ) {
      firstMsg = initialQ;
    } else if (issue) {
      firstMsg = `I need help with: ${issueData?.label ?? issue}`;
    } else {
      firstMsg = `Hi, I need help with a ${stateData.dmvName} issue.`;
    }

    void sendMessage(firstMsg);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateData]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!stateData) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 flex flex-col">
      <Navbar />

      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-lg">{stateData.emoji}</span>
            <div>
              <div className="font-semibold text-slate-900 text-sm">{stateData.dmvName} Assistant</div>
              {issueData && (
                <div className="text-xs text-gray-500">{issueData.emoji} {issueData.label}</div>
              )}
            </div>
          </div>

          {handoffContext && (
            <div className="ml-auto flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs text-amber-700 font-medium">From TollFighter</span>
            </div>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 gap-6">
        <StateSidebar stateData={stateData} />

        <div className="flex-1 flex flex-col min-h-0 bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-16">
                <div className="text-4xl">{stateData.emoji}</div>
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                <p className="text-gray-500 text-sm">
                  Connecting to your {stateData.dmvName} assistant…
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                streaming={streaming && i === messages.length - 1 && msg.role === 'assistant'}
              />
            ))}

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <ChatInput onSend={sendMessage} streaming={streaming} />
        </div>
      </div>
    </div>
  );
}

// ── Loading fallback ──────────────────────────────────────────────────────────
function ChatLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
    </div>
  );
}

// ── Page shell (wraps inner in Suspense for useSearchParams) ──────────────────
export default function ChatPage() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatPageInner />
    </Suspense>
  );
}
