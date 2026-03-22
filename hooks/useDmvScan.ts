'use client';

import { useState, useCallback, useRef } from 'react';
import type { DMVScanResult, ScanJobStatus } from '@/types/dmv';

const API_URL        = process.env.NEXT_PUBLIC_TOLLFIGHTER_API_URL ?? 'https://toll-fighter-production.up.railway.app';
const POLL_INTERVAL  = 2_500;
const POLL_TIMEOUT   = 5 * 60 * 1_000; // 5 minutes — auto-fail if API never responds

interface UseDmvScanState {
  jobId:        string | null;
  sessionToken: string | null;
  status:       ScanJobStatus | null;
  result:       DMVScanResult | null;
  error:        string | null;
  submitting:   boolean;
}

export function useDmvScan() {
  const [state, setState] = useState<UseDmvScanState>({
    jobId:        null,
    sessionToken: null,
    status:       null,
    result:       null,
    error:        null,
    submitting:   false,
  });
  const pollRef        = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
    if (pollTimeoutRef.current) {
      clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  }

  const startScan = useCallback(async (input: {
    state: string;
    plate: string;
    vinLast8?: string;
    dlNumber?: string;
    dob?: string;
  }) => {
    stopPolling();
    setState({ jobId: null, sessionToken: null, status: null, result: null, error: null, submitting: true });

    try {
      const res = await fetch(`${API_URL}/api/v1/dmv/scan`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(input),
      });
      const data = await res.json() as { jobId?: string; sessionToken?: string; status?: ScanJobStatus; error?: string };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);

      const { jobId, sessionToken } = data;
      if (!jobId || !sessionToken) throw new Error('Invalid server response');

      setState((s) => ({ ...s, jobId, sessionToken, status: 'pending', submitting: false }));

      // Poll until done
      const poll = async () => {
        try {
          const pollRes = await fetch(`${API_URL}/api/v1/dmv/scan/${jobId}`, {
            headers: { 'x-session-token': sessionToken },
          });
          const pollData = await pollRes.json() as { status?: ScanJobStatus; result?: DMVScanResult; error?: string };

          setState((s) => ({ ...s, status: pollData.status ?? s.status }));

          if (pollData.status === 'completed') {
            stopPolling();
            setState((s) => ({ ...s, status: 'completed', result: pollData.result ?? null }));
          } else if (pollData.status === 'failed') {
            stopPolling();
            setState((s) => ({ ...s, status: 'failed', error: pollData.error ?? 'Scan failed' }));
          }
        } catch {
          // Network blip — keep polling
        }
      };

      void poll();
      pollRef.current = setInterval(poll, POLL_INTERVAL);

      // Safety net — if the job never resolves, stop polling and show an error
      pollTimeoutRef.current = setTimeout(() => {
        stopPolling();
        setState((s) => ({
          ...s,
          status: 'failed',
          error: 'Scan is taking too long. Please try again.',
        }));
      }, POLL_TIMEOUT);

    } catch (err) {
      setState((s) => ({
        ...s,
        submitting: false,
        error: err instanceof Error ? err.message : 'Failed to start scan',
      }));
    }
  }, []);

  const reset = useCallback(() => {
    stopPolling();
    setState({ jobId: null, sessionToken: null, status: null, result: null, error: null, submitting: false });
  }, []);

  const isScanning = !!state.jobId && state.status !== 'completed' && state.status !== 'failed';

  return { ...state, isScanning, startScan, reset };
}
