export interface PartnerApplication {
  id: string;
  track: "business" | "individual";
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  category: string;
  documentType: string;
  fileName: string;
  fileSize: number;
  fileDataUrl?: string;
  address?: string;
  submittedAt: string;
  status: "Pending Review" | "Approved" | "Rejected";
  notes?: string;
  assignedTier?: string;
  assignedCode?: string;
  assignedLoginId?: string;
  assignedPassword?: string;
}

export type ReferralStatus =
  | "Active"
  | "Renewal Pending"
  | "14-Day Free Trial"
  | "Signed Up"
  | "Invited"
  | "Imported"
  | "Cancelled";

export interface ReferredBusiness {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone?: string;
  plan: string;
  status: ReferralStatus;
  monthlyValueUSD: number;
  monthlyPointsEarned: number;
  joinedDate: string;
  renewalDueDate?: string;
  source?: "Direct Referral" | "Manual Client" | "Excel Bulk Import";
  notes?: string;
  inviteCount?: number;
  lastInvitedDate?: string;
  lastRemindedDate?: string;
}

export interface ApprovedPartner {
  id: string;
  applicationId: string;
  businessName: string;
  ownerName: string;
  email: string;
  loginId?: string;
  phone: string;
  category: string;
  referralCode: string;
  referralLink: string;
  tier?: string;
  commissionRate: number; // e.g. 20 for 20%
  approvedAt: string;
  status: "Active" | "Top Performer" | "Paused";
  totalReferredCount: number;
  activePayingCount: number;
  trialCount: number;
  churnedCount: number;
  totalEarningsUSD: number;
  totalLiviPoints: number;
  currentMonthPoints: number;
  availableBalancePoints: number;
  referredBusinesses: ReferredBusiness[];
  tempPassword?: string;
}

export interface PayoutDetails {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  ifscOrSwift: string;
  upiId: string;
  paypalEmail: string;
}

export interface PointsRedemption {
  id: string;
  date: string;
  points: number;
  amountUSD: number;
  method: "Bank Wire Transfer" | "UPI Transfer" | "PayPal";
  accountDestination: string;
  status: "Completed" | "Processing" | "Pending";
  referenceId: string;
}

export interface ExistingClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  status: "Imported" | "Invited" | "Active" | "Contacted";
  addedDate: string;
  source: "Manual" | "Excel Bulk Import";
  notes?: string;
}

export interface PartnerAccount {
  id: string;
  applicationId?: string;
  businessName: string;
  ownerName: string;
  email: string;
  loginId?: string;
  phone: string;
  password: string;
  track: "business" | "individual";
  tier?: string;
  commissionRate: number;
  referralCode: string;
  referralLink: string;
  liviPoints: number;
  pointsValueUSD: number;
  totalEarningsUSD: number;
  currentMonthPoints: number;
  availableBalancePoints: number;
  redeemedPoints: number;
  joinedDate: string;
  payoutDetails: PayoutDetails;
  referredBusinesses: ReferredBusiness[];
  redemptions: PointsRedemption[];
  existingClients?: ExistingClient[];
}

export interface ReferralActivityEvent {
  id: string;
  partnerName: string;
  referredClient: string;
  planName: string;
  pointsEarned: number;
  usdValue: number;
  timestamp: string;
  type: "new_subscription" | "trial_started" | "recurring_renewal" | "payout_claimed";
}

// Clean default states without dummy entries - only records updated from frontend
export const INITIAL_APPLICATIONS: PartnerApplication[] = [];
export const INITIAL_APPROVED_PARTNERS: ApprovedPartner[] = [];
export const INITIAL_ACTIVITY_FEED: ReferralActivityEvent[] = [];
