import type { StateData } from '@/types/state';

export const MA_STATE_DATA: StateData = {
  code: 'MA',
  name: 'Massachusetts',
  dmvName: 'MA RMV (Registry of Motor Vehicles)',
  emoji: '🦞',
  urls: {
    mainSite: 'https://www.mass.gov/orgs/registry-of-motor-vehicles',
    appointmentBooking: 'https://www.mass.gov/how-to/schedule-an-rmv-service-center-appointment',
    registrationRenewal: 'https://www.mass.gov/how-to/renew-your-vehicle-registration',
    tollHoldInfo: 'https://www.mass.gov/info-details/what-to-do-if-your-license-or-registration-has-been-suspended-for-an-unpaid-toll',
    feeSchedule: 'https://www.mass.gov/info-details/rmv-fees-and-charges',
    licenseReinstatement: 'https://www.mass.gov/how-to/reinstate-a-suspended-or-revoked-license',
    disputePortal: 'https://www.ezdrivema.com',
  },
  phone: {
    main: '857-368-8000',
    tollRelated: '877-627-7745',
    hours: 'Mon–Fri 9:00am–5:00pm ET',
  },
  forms: {
    registration: {
      name: 'RMV-1',
      label: 'Registration and Title Application',
      url: 'https://www.mass.gov/doc/registration-and-title-application-rmv-1/download',
    },
    titleTransfer: {
      name: 'RMV-1',
      label: 'Registration and Title Application',
      url: 'https://www.mass.gov/doc/registration-and-title-application-rmv-1/download',
    },
  },
  tollAuthorities: ['EZDriveMA (formerly Fast Lane)', 'MA Turnpike (MassDOT)', 'Tobin Bridge', 'Sumner & Callahan Tunnels'],
  tollHoldProcess: {
    step1: 'Pay the outstanding toll bill or formally dispute it at ezdrivema.com or by calling EZDriveMA at 877-627-7745.',
    step2: 'Once the toll authority confirms payment, they notify the MA RMV within 1–5 business days.',
    step3: 'The RMV will automatically update your record. You can check your status at mass.gov/rmv.',
    step4: 'Renew your registration online or at an RMV Service Center.',
    notes: 'MA does NOT charge a separate reinstatement fee for toll-related registration holds — paying the toll debt is typically sufficient. License suspensions for tolls are different and may require the RMV to process the reinstatement.',
  },
  appointmentRequired: true,
  allowsOnlineReinstatement: true,
  fees: {
    registrationRenewal: '$60 (2-year passenger registration)',
    suspensionTermination: '$0 for registration holds from tolls — just pay the toll',
    duplicateTitle: '$25',
    licenseReinstatement: '$100 reinstatement fee for most suspensions',
  },
  notes: 'Massachusetts calls its agency the "RMV" (Registry of Motor Vehicles), not the DMV. Appointments are strongly recommended for in-person visits as walk-ins have long wait times. IMPORTANT: Under the Road to Opportunity Act (2024), Massachusetts CANNOT suspend your driver\'s license solely for unpaid toll violations. Toll-related registration holds may still apply, but your license is protected. The MassDOT Toll Violations Clear line (857-368-3615) handles hardship payment plans and fee waivers under this law.',
};
