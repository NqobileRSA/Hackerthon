'use client';
import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoStep';
import StokvelDetailsForm from './StokvelDetailsStep';
import AdminDetailsForm from './AdminStepDetails';
import { StokvelFormData } from '@/types/stokvel';

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<StokvelFormData>({
    personalInfo: { fullName: '', idNumber: '', phoneNumber: '', email: '' },
    stokvelDetails: {
      type: 'fixed',
      name: '',
      description: '',
      contributionAmount: 0,
      frequency: 'monthly',
    },
    adminDetails: {
      primaryAdmin: { phoneNumber: '', permissions: ['full'] },
      additionalAdmins: [],
    },
    members: [],
    metadata: { createdAt: null, updatedAt: null, status: 'draft' },
  });

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrevious = () => setCurrentStep((prev) => prev - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            formData={formData.personalInfo}
            onChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, ...data },
              }))
            }
          />
        );
      case 1:
        return (
          <StokvelDetailsForm
            formData={formData.stokvelDetails}
            onChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                stokvelDetails: { ...prev.stokvelDetails, ...data },
              }))
            }
          />
        );
      case 2:
        return (
          <AdminDetailsForm
            formData={formData.adminDetails}
            onChange={(data) =>
              setFormData((prev) => ({
                ...prev,
                adminDetails: { ...prev.adminDetails, ...data },
              }))
            }
          />
        );
      default:
        return <p>Summary: {JSON.stringify(formData, null, 2)}</p>;
    }
  };

  return (
    <div>
      {renderStep()}
      <div>
        {currentStep > 0 && <button onClick={handlePrevious}>Back</button>}
        {currentStep < 3 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={() => console.log('Submit data', formData)}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
