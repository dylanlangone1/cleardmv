'use client';

import { ISSUES } from '@/data/issues';
import type { IssueType } from '@/types/chat';

interface Props {
  selected: IssueType | null;
  onSelect: (id: IssueType) => void;
}

export function IssueChips({ selected, onSelect }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-slate-500 font-medium">Or pick a common issue:</p>
      <div className="flex flex-wrap gap-2">
        {ISSUES.map((issue) => {
          const isSelected = selected === issue.id;
          return (
            <button
              key={issue.id}
              onClick={() => onSelect(issue.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all
                ${isSelected
                  ? 'border-blue-500 bg-blue-500/20 text-blue-300'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                }
              `}
            >
              <span>{issue.emoji}</span>
              <span>{issue.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
