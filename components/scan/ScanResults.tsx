'use client';

import { useRouter } from 'next/navigation';
import type { DMVScanResult } from '@/types/dmv';
import { IssueCard } from './IssueCard';
import { MonitorSignup } from './MonitorSignup';
import { CheckCircle2, RefreshCw, MessageSquare, ExternalLink } from 'lucide-react';

interface Props {
  result: DMVScanResult;
  onReset: () => void;
}

const STATUS_DISPLAY = {
  active:    { label: 'Active',    color: 'text-emerald-600', dot: 'bg-emerald-500' },
  expired:   { label: 'Expired',   color: 'text-red-600',     dot: 'bg-red-500' },
  hold:      { label: 'On Hold',   color: 'text-red-600',     dot: 'bg-red-500 animate-pulse' },
  suspended: { label: 'Suspended', color: 'text-red-600',     dot: 'bg-red-500 animate-pulse' },
  unknown:   { label: 'Unknown',   color: 'text-gray-500',    dot: 'bg-gray-400' },
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
      <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Scan Complete</div>
            <div className="text-2xl font-bold text-slate-900 tracking-widest">{result.plate}</div>
            <div className="text-xs text-gray-500">{result.state} · {result.vehicleYear} {result.vehicleMake}</div>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-1.5 justify-end text-sm font-bold ${status.color}`}>
              <span className={`w-2 h-2 rounded-full ${status.dot}`} />
              {status.label}
            </div>
            {result.registrationExpiry && (
              <div className="text-xs text-gray-500 mt-0.5">Exp: {result.registrationExpiry}</div>
            )}
          </div>
        </div>

        {/* Issue summary bar */}
        <div className="flex gap-2">
          {critical.length > 0 && (
            <div className="flex-1 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-red-600">{critical.length}</div>
              <div className="text-xs text-red-500">Critical</div>
            </div>
          )}
          {warnings.length > 0 && (
            <div className="flex-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
              <div className="text-lg font-bold text-amber-600">{warnings.length}</div>
              <div className="text-xs text-amber-500">Warnings</div>
            </div>
          )}
          {allClear && (
            <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">All Clear</span>
            </div>
          )}
        </div>
      </div>

      {/* All clear state */}
      {allClear && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">No issues found on this vehicle. 🎉</p>
          <p className="text-xs text-gray-400 mt-1">
            Have a question anyway?{' '}
            <button onClick={() => handleGetHelp()} className="text-blue-600 hover:underline">
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

      {/* TollFighter reverse handoff — show when toll-related issues detected */}
      {result.issues.some(i =>
        i.title.toLowerCase().includes('toll') ||
        i.title.toLowerCase().includes('outstanding fine') ||
        i.description?.toLowerCase().includes('toll') ||
        i.description?.toLowerCase().includes('e-zpass')
      ) && (
        <a
          href={`https://tollfighter.com/assess?plate=${encodeURIComponent(result.plate)}&state=${result.state.toLowerCase()}&ref=cleardmv`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 border border-orange-300 text-orange-700 font-semibold rounded-2xl px-4 py-3 transition-colors text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Dispute These Tolls at TollFighter — AI writes & files your letter
        </a>
      )}

      {/* AI chat CTA */}
      {!allClear && (
        <button
          onClick={() => handleGetHelp()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-semibold rounded-2xl px-4 py-3 transition-colors text-sm"
        >
          <MessageSquare className="w-4 h-4" />
          Talk to the AI — I'll walk you through every issue
        </button>
      )}

      {/* Plate monitor signup */}
      <MonitorSignup plate={result.plate} state={result.state} />

      {/* Check if cleared — for hold/suspended users who paid */}
      {(result.registrationStatus === 'hold' || result.registrationStatus === 'suspended') && (
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold rounded-2xl px-4 py-3 transition-colors text-sm"
        >
          I paid my tolls — check if cleared
        </button>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 text-xs py-2 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Check a different plate
      </button>
    </div>
  );
}
