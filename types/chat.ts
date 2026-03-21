export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export type IssueType =
  | 'toll_hold'
  | 'registration'
  | 'license'
  | 'title'
  | 'appointment'
  | 'general';

export interface ChatSession {
  state: string;
  issue?: IssueType;
  messages: Message[];
  handoffContext?: HandoffContext;
}

export interface HandoffContext {
  source: 'tollfighter';
  tollAuthority?: string;
  violationCount?: number;
  totalOwed?: number;
  plate?: string;
  registrationHold?: boolean;
}
