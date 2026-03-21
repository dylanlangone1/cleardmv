import type { Message } from '@/types/chat';

interface Props {
  message: Message;
  streaming?: boolean;
}

/** Render markdown-ish text: bold (**text**), numbered lists, line breaks */
function renderContent(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (/^\d+\.\s/.test(line)) {
      const rest = line.replace(/^\d+\.\s/, '');
      return (
        <p key={i} className="flex gap-2 my-0.5">
          <span className="font-bold text-blue-600 shrink-0">{line.match(/^\d+/)?.[0]}.</span>
          <span dangerouslySetInnerHTML={{ __html: boldify(rest) }} />
        </p>
      );
    }
    if (/^[-•*]\s/.test(line)) {
      const rest = line.replace(/^[-•*]\s/, '');
      return (
        <p key={i} className="flex gap-2 my-0.5">
          <span className="text-blue-500 shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: boldify(rest) }} />
        </p>
      );
    }
    if (!line.trim()) return <br key={i} />;
    return <p key={i} className="my-0.5" dangerouslySetInnerHTML={{ __html: boldify(line) }} />;
  });
}

function boldify(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 rounded text-xs font-mono text-gray-800">$1</code>');
}

export function MessageBubble({ message, streaming }: Props) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 items-start">
      {/* Avatar */}
      <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mt-0.5">
        <span className="text-white text-xs font-bold">C</span>
      </div>

      <div className="max-w-[85%] bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 leading-relaxed space-y-0.5">
        {message.content ? (
          renderContent(message.content)
        ) : (
          <span className="text-gray-400 italic">Thinking…</span>
        )}
        {streaming && (
          <span className="inline-flex gap-1 ml-1">
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </div>
    </div>
  );
}
