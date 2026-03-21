import type { StateData } from '@/types/state';
import { NH_STATE_DATA } from './nh';
import { NY_STATE_DATA } from './ny';
import { MA_STATE_DATA } from './ma';
import { ME_STATE_DATA } from './me';
import { RI_STATE_DATA } from './ri';
import { CT_STATE_DATA } from './ct';
import { VT_STATE_DATA } from './vt';

export const STATE_DATA: Record<string, StateData> = {
  nh: NH_STATE_DATA,
  ny: NY_STATE_DATA,
  ma: MA_STATE_DATA,
  me: ME_STATE_DATA,
  ri: RI_STATE_DATA,
  ct: CT_STATE_DATA,
  vt: VT_STATE_DATA,
};

/** States shown as card grid on the landing page (ordered by TF priority) */
export const FEATURED_STATES: StateData[] = [
  NH_STATE_DATA,
  MA_STATE_DATA,
  NY_STATE_DATA,
  ME_STATE_DATA,
  RI_STATE_DATA,
  CT_STATE_DATA,
  VT_STATE_DATA,
];

export function getStateData(code: string): StateData | null {
  return STATE_DATA[code.toLowerCase()] ?? null;
}

export { NH_STATE_DATA, NY_STATE_DATA, MA_STATE_DATA, ME_STATE_DATA, RI_STATE_DATA, CT_STATE_DATA, VT_STATE_DATA };
