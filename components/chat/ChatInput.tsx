'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface Props {
  onSend: (msg: string) => void;
  disabled?: boolean;
  streaming?: boolean;
}

export function ChatInput({ onSend, disabled, streaming }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || disabled || streaming) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  }

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex gap-3 items-end max-w-4xl mx-auto">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a follow-up question… (Enter to send, Shift+Enter for new line)"
          rows={1}
          disabled={disabled}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 resize-none disabled:opacity-40 transition-all"
        />
        <button
          onClick={submit}
          disabled={!value.trim() || disabled || streaming}
          className="shrink-0 w-10 h-10 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
        >
          {streaming ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <Send className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center mt-2">
        ClearDMV provides guidance only — always verify fees and rules at the official DMV website.
      </p>
    </div>
  );
}
