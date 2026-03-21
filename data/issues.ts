import type { IssueType } from '@/types/chat';

export interface IssueOption {
  id: IssueType;
  label: string;
  description: string;
  emoji: string;
  focus: string; // injected into system prompt
}

export const ISSUES: IssueOption[] = [
  {
    id: 'toll_hold',
    label: 'Toll Violation Hold',
    description: 'Registration hold from unpaid tolls',
    emoji: '🚧',
    focus: "The user has a registration hold or license suspension due to unpaid toll violations. Start by asking which toll authority issued the notice, then explain the exact two-step process: (1) resolve with the toll authority, (2) clear the DMV hold. Be specific about fees.",
  },
  {
    id: 'registration',
    label: 'Registration Issue',
    description: 'Renewal, reinstatement, or new registration',
    emoji: '📋',
    focus: "The user needs help with vehicle registration — renewal, reinstatement after suspension, or a new registration. Ask what specific issue they're facing, then guide them step by step.",
  },
  {
    id: 'license',
    label: 'License Suspension',
    description: 'Suspended or revoked driver\'s license',
    emoji: '🪪',
    focus: "The user has a suspended or revoked driver's license. Ask what caused the suspension so you can give the correct reinstatement path. Cover required steps, fees, and whether a hearing is needed.",
  },
  {
    id: 'title',
    label: 'Title Transfer',
    description: 'Buying, selling, or transferring a vehicle',
    emoji: '🚗',
    focus: "The user needs help with a vehicle title transfer — buying or selling a car, transferring ownership, or handling an out-of-state title. Walk them through the required forms, fees, and timeline.",
  },
  {
    id: 'appointment',
    label: 'Schedule Appointment',
    description: 'Book a DMV visit',
    emoji: '📅',
    focus: "The user wants to schedule a DMV appointment. Provide the direct appointment booking URL for their state and explain what documents they should bring for common transaction types.",
  },
  {
    id: 'general',
    label: 'Something Else',
    description: 'Any other DMV question',
    emoji: '💬',
    focus: "The user has a general DMV question. Ask them to describe their issue and then provide specific, actionable guidance. Always reference official state DMV resources.",
  },
];

export function getIssue(id: IssueType): IssueOption | undefined {
  return ISSUES.find((i) => i.id === id);
}
