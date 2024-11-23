// Define the data structure for the stokvel form.
export type StokvelType = 'fixed' | 'event';
export type Frequency = 'monthly' | 'quarterly' | 'annually';
export type Permission = 'full' | 'partial';
export type MemberStatus = 'pending' | 'invited' | 'confirmed';

export interface StokvelFormData {
  personalInfo: {
    fullName: string;
    idNumber: string; // 13 digits
    phoneNumber: string;
    email?: string; // optional
  };
  stokvelDetails: {
    type: StokvelType;
    name: string;
    description: string;
    contributionAmount: number;
    frequency: Frequency;
  };
  adminDetails: {
    primaryAdmin: {
      phoneNumber: string;
      permissions: Permission[];
    };
    additionalAdmins: Array<{
      phoneNumber: string;
      permissions: Permission[];
    }>;
  };
  members: Array<{
    phoneNumber: string;
    status: MemberStatus;
    joinedAt: string | null;
  }>;
  metadata: {
    createdAt: string | null;
    updatedAt: string | null;
    status: 'draft' | 'active' | 'completed';
  };
}
