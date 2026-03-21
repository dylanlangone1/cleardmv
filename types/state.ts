export interface DMVForm {
  name: string;
  label: string;
  url: string;
}

export interface TollHoldProcess {
  step1: string;
  step2: string;
  step3: string;
  step4?: string;
  notes?: string;
}

export interface StateData {
  code: string;
  name: string;
  dmvName: string;
  emoji: string;
  urls: {
    mainSite: string;
    appointmentBooking?: string;
    registrationRenewal?: string;
    tollHoldInfo?: string;
    feeSchedule?: string;
    licenseReinstatement?: string;
    disputePortal?: string;
  };
  phone: {
    main: string;
    tollRelated?: string;
    hours: string;
  };
  forms: {
    registration?: DMVForm;
    titleTransfer?: DMVForm;
    licenseReinstatement?: DMVForm;
    [key: string]: DMVForm | undefined;
  };
  tollAuthorities: string[];
  tollHoldProcess: TollHoldProcess;
  appointmentRequired: boolean;
  allowsOnlineReinstatement: boolean;
  fees: {
    registrationRenewal?: string;
    suspensionTermination?: string;
    duplicateTitle?: string;
    licenseReinstatement?: string;
    [key: string]: string | undefined;
  };
  notes?: string;
}
