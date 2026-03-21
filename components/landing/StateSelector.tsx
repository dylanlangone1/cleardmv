'use client';

import { FEATURED_STATES } from '@/data/states';
import type { StateData } from '@/types/state';

interface Props {
  selected: string | null;
  onSelect: (code: string) => void;
}

export function StateSelector({ selected, onSelect }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
        Step 1 — Select your state
      </p>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {FEATURED_STATES.map((s: StateData) => {
          const isSelected = selected === s.code.toLowerCase();
          return (
            <button
              key={s.code}
              onClick={() => onSelect(s.code.toLowerCase())}
              className={`
                flex flex-col items-center justify-center gap-1 p-3 rounded-2xl border transition-all
                ${isSelected
                  ? 'border-blue-500 bg-blue-500/20 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }
              `}
            >
              <span className="text-2xl">{s.emoji}</span>
              <span className={`text-xs font-bold ${isSelected ? 'text-blue-300' : 'text-slate-400'}`}>
                {s.code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
