import type { DMVIssue } from '@/types/dmv';
import { AlertTriangle, Info, Zap, ExternalLink, Wrench } from 'lucide-react';

interface Props {
  issue: DMVIssue;
  onGetHelp: () => void;
}

const SEVERITY_CONFIG = {
  critical: {
    bg:      'bg-red-500/10 border-red-500/20',
    icon:    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
    badge:   'bg-red-500/20 text-red-300',
    label:   'Action Required',
    cta:     'bg-red-500 hover:bg-red-400',
  },
  warning: {
    bg:      'bg-amber-500/10 border-amber-500/20',
    icon:    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
    badge:   'bg-amber-500/20 text-amber-300',
    label:   'Heads Up',
    cta:     'bg-amber-500 hover:bg-amber-400',
  },
  info: {
    bg:      'bg-blue-500/10 border-blue-500/20',
    icon:    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />,
    badge:   'bg-blue-500/20 text-blue-300',
    label:   'Info',
    cta:     'bg-blue-500 hover:bg-blue-400',
  },
};

export function IssueCard({ issue, onGetHelp }: Props) {
  const cfg = SEVERITY_CONFIG[issue.severity];

  return (
    <div className={`border rounded-2xl p-4 space-y-3 ${cfg.bg}`}>
      <div className="flex items-start gap-3">
        {cfg.icon}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.badge}`}>
              {cfg.label}
            </span>
            {issue.amount != null && (
              <span className="text-xs font-bold text-white bg-slate-700 px-2 py-0.5 rounded-full">
                ${issue.amount.toFixed(2)} fee
              </span>
            )}
          </div>
          <h3 className="font-bold text-white text-sm">{issue.title}</h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{issue.description}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {/* Primary: AI help */}
        <button
          onClick={onGetHelp}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
        >
          <Zap className="w-3.5 h-3.5" />
          Get AI Help
        </button>

        {/* Secondary: direct link if fixable */}
        {issue.canAutoFix && issue.autoFixUrl && (
          <a
            href={issue.autoFixUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 text-white rounded-xl transition-colors ${cfg.cta}`}
          >
            <Wrench className="w-3.5 h-3.5" />
            {issue.autoFixLabel ?? 'Fix it'}
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        )}
      </div>
    </div>
  );
}
