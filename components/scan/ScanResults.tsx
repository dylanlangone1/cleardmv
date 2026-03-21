'use client';

import { useRouter } from 'next/navigation';
import type { DMVScanResult } from '@/types/dmv';
import { IssueCard } from './IssueCard';
import { CheckCircle2, RefreshCw, MessageSquare } from 'lucide-react';

interface Props {
  result: DMVScanResult;
  onReset: () => void;
}

const STATUS_DISPLAY = {
  active:    { label: 'Active',    color: 'text-emerald-400', dot: 'bg-emerald-400' },
  expired:   { label: 'Expired',   color: 'text-red-400',     dot: 'bg-red-400' },
  hold:      { label: 'On Hold',   color: 'text-red-400',     dot: 'bg-red-400 animate-pulse' },
  suspended: { label: 'Suspended', color: 'text-red-400',     dot: 'bg-red-400 animate-pulse' },
  unknown:   { label: 'Unknown',   color: 'text-slate-400',   dot: 'bg-slate-400' },
};

export function ScanResults({ result, onReset }: Props) {
  const router   = useRouter();
  const critical = result.issues.filter((i) => i.severity === 'critical');
  const warnings = result.issues.filter((i) => i.severity === 'warning');
  const info     = result.issues.filter((i) => i.severity === 'info');
  const status   = STATUS_DISPLAY[result.registrationStatus] ?? STATUS_DISPLAY.unknown;
  const allClear = result.issues.length === 0;

  function handleGetHelp(issueTitle?: string) {
    const params = new URLSearchParams({ issue: 'general' });
    if (issueTitle) params.set('q', `I need help with: ${issueTitle}. My plate is ${result.plate} in ${result.state}.`);
    router.push(`/${result.state.toLowerCase()}/chat?${params.toString()}`);
  }

  return (
    <div className="space-y-4 w-full max-w-xl mx-auto">
      {/* Status card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Scan Complete</div>
            <div className="text-2xl font-bold text-white tracking-widest">{result.plate}</div>
            <div className="text-xs text-slate-500">{result.state} · {result.vehicleYear} {result.vehicleMake}</div>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1.5 justify-end text-sm font-bold ${status.color}`}>
              <span className={`w-2 h-2 rounded-full ${status.dot}`} />
              {status.label}
            </div>
            {result.registrationExpiry && (
              <div className="text-xs text-slate-500 mt-0.5">Exp: {result.registrationExpiry}</div>
            )}
          </div>
        </div>

        {/* Issue summary bar */}
        <div className="flex gap-2">
          {critical.length > 0 && (
            <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-red-400">{critical.length}</div>
              <div className="text-xs text-red-400/70">Critical</div>
            </div>
          )}
          {warnings.length > 0 && (
            <div className="flex-1 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-amber-400">{warnings.length}</div>
              <div className="text-xs text-amber-400/70">Warnings</div>
            </div>
          )}
          {allClear && (
            <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">All Clear</span>
            </div>
          )}
        </div>
      </div>

      {/* All clear state */}
      {allClear && (
        <div className="text-center py-4">
          <p className="text-slate-400 text-sm">No issues found on this vehicle. 🎉</p>
          <p className="text-xs text-slate-600 mt-1">
            Have a question anyway?{' '}
            <button onClick={() => handleGetHelp()} className="text-blue-400 hover:underline">
              Chat with the AI assistant →
            </button>
          </p>
        </div>
      )}

      {/* Issue cards — critical first */}
      {[...critical, ...warnings, ...info].map((issue, i) => (
        <IssueCard
          key={i}
          issue={issue}
          onGetHelp={() => handleGetHelp(issue.title)}
        />
      ))}

      {/* AI chat CTA */}
      {!allClear && (
        <button
          onClick={() => handleGetHelp()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-semibold rounded-2xl px-4 py-3 transition-colors text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          Talk to the AI — I'll walk you through every issue
        </button>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-xs py-2 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Check a different plate
      </button>
    </div>
  );
}
