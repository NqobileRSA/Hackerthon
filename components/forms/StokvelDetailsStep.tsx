'use client';
import React from 'react';
import { StokvelFormData, StokvelType, Frequency } from '@/types/stokvel';

interface StokvelDetailsFormProps {
  formData: StokvelFormData['stokvelDetails'];
  onChange: (data: Partial<StokvelFormData['stokvelDetails']>) => void;
}

const StokvelDetailsForm: React.FC<StokvelDetailsFormProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div>
      <h2>Step 2: Stokvel Details</h2>
      <label>Stokvel Type</label>
      <select
        value={formData.type}
        onChange={(e) => onChange({ type: e.target.value as StokvelType })}
      >
        <option value="fixed">Fixed</option>
        <option value="event">Event</option>
      </select>
      <label>Stokvel Name</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => onChange({ name: e.target.value })}
      />
      <label>Description</label>
      <textarea
        value={formData.description}
        onChange={(e) => onChange({ description: e.target.value })}
      />
      <label>Contribution Amount</label>
      <input
        type="number"
        value={formData.contributionAmount}
        onChange={(e) =>
          onChange({ contributionAmount: Number(e.target.value) })
        }
      />
      <label>Frequency</label>
      <select
        value={formData.frequency}
        onChange={(e) => onChange({ frequency: e.target.value as Frequency })}
      >
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="annually">Annually</option>
      </select>
    </div>
  );
};

export default StokvelDetailsForm;
