'use client';
import React from 'react';
import { StokvelFormData } from '@/types/stokvel';

interface PersonalInfoFormProps {
  formData: StokvelFormData['personalInfo'];
  onChange: (data: Partial<StokvelFormData['personalInfo']>) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <label>Full Name</label>
      <input
        type="text"
        value={formData.fullName}
        onChange={(e) => onChange({ fullName: e.target.value })}
      />
      <label>ID Number</label>
      <input
        type="text"
        value={formData.idNumber}
        onChange={(e) => onChange({ idNumber: e.target.value })}
      />
      <label>Phone Number</label>
      <input
        type="text"
        value={formData.phoneNumber}
        onChange={(e) => onChange({ phoneNumber: e.target.value })}
      />
      <label>Email (Optional)</label>
      <input
        type="email"
        value={formData.email || ''}
        onChange={(e) => onChange({ email: e.target.value })}
      />
    </div>
  );
};

export default PersonalInfoForm;
