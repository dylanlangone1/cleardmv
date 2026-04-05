'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import type { HandoffContext, IssueType } from '@/types/chat';

/**
 * /handoff?state=NH&issue=toll_hold&toll_authority=NH+E-ZPass&violations=3&owed=87.50&plate=ABC1234&hold=true&ref=tollfighter
 *
 * Extracts TollFighter context from query params, base64-encodes it,
 * and redirects to /[state]/chat?issue=...&handoff=[encoded].
 */
function HandoffRedirect() {
  const router       = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const VALID_STATES = ['nh', 'ny', 'ma', 'me', 'ri', 'ct', 'vt'];
    const VALID_ISSUES: IssueType[] = ['toll_hold', 'registration', 'license', 'title', 'appointment', 'general'];
    const rawState      = searchParams.get('state')?.toLowerCase() ?? 'nh';
    const state         = VALID_STATES.includes(rawState) ? rawState : 'nh';
    const rawIssue      = searchParams.get('issue') ?? 'toll_hold';
    const issue         = VALID_ISSUES.includes(rawIssue as IssueType) ? rawIssue as IssueType : 'toll_hold' as IssueType;
    const tollAuthority = searchParams.get('toll_authority') ?? undefined;
    const violations    = searchParams.get('violations') ? Number(searchParams.get('violations')) : undefined;
    const owed          = searchParams.get('owed') ? Number(searchParams.get('owed')) : undefined;
    const plate         = searchParams.get('plate')?.slice(0, 10).replace(/[^A-Z0-9]/gi, '') ?? undefined;
    const hold          = searchParams.get('hold') === 'true';

    const ctx: HandoffContext = {
      source: 'tollfighter',
      tollAuthority,
      violationCount: violations,
      totalOwed: owed,
      plate,
      registrationHold: hold,
    };

    const encoded = btoa(JSON.stringify(ctx));
    router.replace(`/${state}/chat?issue=${issue}&handoff=${encoded}`);
  }, [router, searchParams]);

  return null;
}

export default function HandoffPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-white">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        <p className="text-sm text-slate-400">Connecting to your DMV assistant…</p>
      </div>
      <Suspense>
        <HandoffRedirect />
      </Suspense>
    </div>
  );
}
