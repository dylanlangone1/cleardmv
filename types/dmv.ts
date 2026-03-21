export type DMVState = 'NH' | 'NY' | 'MA' | 'ME' | 'RI';
export type IssueSeverity = 'critical' | 'warning' | 'info';
export type IssueType =
  | 'registration_hold'
  | 'registration_expired'
  | 'registration_expiring'
  | 'license_suspended'
  | 'license_revoked'
  | 'license_expired'
  | 'license_expiring'
  | 'outstanding_fine'
  | 'insurance_lapse'
  | 'inspection_overdue';

export interface DMVIssue {
  severity: IssueSeverity;
  type: IssueType;
  title: string;
  description: string;
  amount?: number;
  canAutoFix: boolean;
  autoFixLabel?: string;
  autoFixUrl?: string;
}

export interface DMVScanResult {
  state: DMVState;
  plate: string;
  registrationStatus: 'active' | 'expired' | 'hold' | 'suspended' | 'unknown';
  registrationExpiry?: string;
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  licenseStatus?: 'valid' | 'suspended' | 'revoked' | 'expired' | 'unknown';
  licenseExpiry?: string;
  issues: DMVIssue[];
  scanMode: 'public_lookup' | 'authenticated';
  scannedAt: string;
  rawAlerts?: string[];
}

export type ScanJobStatus = 'pending' | 'running' | 'completed' | 'failed';

export interface ScanJobResponse {
  jobId: string;
  sessionToken: string;
  status: ScanJobStatus;
  state?: DMVState;
  plate?: string;
  result?: DMVScanResult;
  error?: string;
  createdAt?: string;
  updatedAt?: string;
}
