import type { DMVIssue } from '@/types/dmv';
import { AlertTriangle, Info, Zap, ExternalLink, Wrench } from 'lucide-react';

interface Props {
  issue: DMVIssue;
  onGetHelp: () => void;
}

const SEVERITY_CONFIG = {
  critical: {
    bg:      'bg-red-50 border-red-200',
    icon:    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    badge:   'bg-red-100 text-red-700',
    label:   'Action Required',
    cta:     'bg-red-500 hover:bg-red-600',
  },
  warning: {
    bg:      'bg-amber-50 border-amber-200',
    icon:    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
    badge:   'bg-amber-100 text-amber-700',
    label:   'Heads Up',
    cta:     'bg-amber-500 hover:bg-amber-600',
  },
  info: {
    bg:      'bg-blue-50 border-blue-200',
    icon:    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
    badge:   'bg-blue-100 text-blue-700',
    label:   'Info',
    cta:     'bg-blue-500 hover:bg-blue-600',
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
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-full">
                ${issue.amount.toFixed(2)} fee
              </span>
            )}
          </div>
          <h3 className="font-bold text-slate-900 text-sm">{issue.title}</h3>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{issue.description}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onGetHelp}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
        >
          <Zap className="w-3.5 h-3.5" />
          Get AI Help
        </button>

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
