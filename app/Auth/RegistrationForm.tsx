'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Send,
  ArrowRight,
  CheckCircle,
  Plus,
  Minus,
  Phone,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// Types
type StokvelType = 'fixed' | 'event';
type Frequency = 'monthly' | 'quarterly' | 'annually';
type MemberStatus = 'pending' | 'invited' | 'confirmed';
type StokvelStatus = 'draft' | 'active' | 'completed';
type AdminPermission = 'full' | 'partial';

interface PersonalInfo {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email?: string;
}

interface StokvelDetails {
  type: StokvelType;
  name: string;
  description: string;
  contributionAmount: number;
  frequency: Frequency;
}

interface Admin {
  phoneNumber: string;
  permissions: AdminPermission[];
}

interface Member {
  phoneNumber: string;
  status: MemberStatus;
  joinedAt: Date | null;
}

interface StokvelFormData {
  personalInfo: PersonalInfo;
  stokvelDetails: StokvelDetails;
  adminDetails: {
    primaryAdmin: Admin;
    additionalAdmins: Admin[];
  };
  members: Member[];
  metadata: {
    createdAt: Date | null;
    updatedAt: Date | null;
    status: StokvelStatus;
  };
}

interface StokvelRegistrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultFormData: StokvelFormData = {
  personalInfo: {
    fullName: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
  },
  stokvelDetails: {
    type: 'fixed',
    name: '',
    description: '',
    contributionAmount: 0,
    frequency: 'monthly',
  },
  adminDetails: {
    primaryAdmin: {
      phoneNumber: '',
      permissions: ['full'],
    },
    additionalAdmins: [],
  },
  members: [],
  metadata: {
    createdAt: null,
    updatedAt: null,
    status: 'draft',
  },
};

export const StokvelRegistration: React.FC<StokvelRegistrationProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<StokvelFormData>(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    {
      title: 'Personal Information',
      subtitle: 'Tell us about yourself',
      fields: ['fullName', 'idNumber', 'phoneNumber', 'email'],
    },
    {
      title: 'Stokvel Details',
      subtitle: 'Set up your stokvel structure',
      fields: [
        'type',
        'name',
        'description',
        'contributionAmount',
        'frequency',
      ],
    },
    {
      title: 'Admin Setup',
      subtitle: 'Assign administrators',
      fields: ['adminPhones'],
    },
    {
      title: 'Member Management',
      subtitle: 'Add your members',
      fields: ['members'],
    },
    {
      title: 'Confirmation',
      subtitle: 'Review and submit',
    },
  ];

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic South African phone number validation
    const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
    return phoneRegex.test(phone);
  };

  const validateIdNumber = (id: string): boolean => {
    // South African ID number validation (13 digits)
    return /^\d{13}$/.test(id);
  };

  const validateEmail = (email: string): boolean => {
    return email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    switch (currentStep) {
      case 0: // Personal Information
        if (!formData.personalInfo.fullName) {
          newErrors.fullName = 'Full name is required';
          isValid = false;
        }
        if (!validateIdNumber(formData.personalInfo.idNumber)) {
          newErrors.idNumber = 'Valid 13-digit ID number is required';
          isValid = false;
        }
        if (!validatePhoneNumber(formData.personalInfo.phoneNumber)) {
          newErrors.phoneNumber =
            'Valid South African phone number is required';
          isValid = false;
        }
        if (!validateEmail(formData.personalInfo.email || '')) {
          newErrors.email = 'Invalid email format';
          isValid = false;
        }
        break;

      case 1: // Stokvel Details
        if (!formData.stokvelDetails.name) {
          newErrors.name = 'Stokvel name is required';
          isValid = false;
        }
        if (!formData.stokvelDetails.description) {
          newErrors.description = 'Description is required';
          isValid = false;
        }
        if (formData.stokvelDetails.contributionAmount <= 0) {
          newErrors.contributionAmount =
            'Valid contribution amount is required';
          isValid = false;
        }
        break;

      case 2: // Admin Setup
        formData.adminDetails.additionalAdmins.forEach((admin, index) => {
          if (!validatePhoneNumber(admin.phoneNumber)) {
            newErrors[`adminPhone${index}`] = 'Valid phone number required';
            isValid = false;
          }
        });
        break;

      case 3: // Member Management
        if (formData.members.length === 0) {
          newErrors.members = 'At least one member is required';
          isValid = false;
        }
        formData.members.forEach((member, index) => {
          if (!validatePhoneNumber(member.phoneNumber)) {
            newErrors[`memberPhone${index}`] = 'Valid phone number required';
            isValid = false;
          }
        });
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAddAdmin = () => {
    setFormData({
      ...formData,
      adminDetails: {
        ...formData.adminDetails,
        additionalAdmins: [
          ...formData.adminDetails.additionalAdmins,
          { phoneNumber: '', permissions: ['partial'] },
        ],
      },
    });
  };

  const handleRemoveAdmin = (index: number) => {
    const newAdmins = [...formData.adminDetails.additionalAdmins];
    newAdmins.splice(index, 1);
    setFormData({
      ...formData,
      adminDetails: {
        ...formData.adminDetails,
        additionalAdmins: newAdmins,
      },
    });
  };

  const handleAddMember = () => {
    setFormData({
      ...formData,
      members: [
        ...formData.members,
        { phoneNumber: '', status: 'pending', joinedAt: null },
      ],
    });
  };

  const handleRemoveMember = (index: number) => {
    const newMembers = [...formData.members];
    newMembers.splice(index, 1);
    setFormData({
      ...formData,
      members: newMembers,
    });
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) {
      toast({
        title: 'Validation Error',
        description: 'Please correct the highlighted errors.',
        variant: 'destructive',
      });
      return;
    }

    if (step < steps.length - 2) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      // Update metadata
      const updatedFormData = {
        ...formData,
        metadata: {
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active' as StokvelStatus,
        },
      };

      // API call would go here
      const response = await fetch('/api/stokvel/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      toast({
        title: 'Success!',
        description: 'Your stokvel has been registered successfully.',
      });
      setStep(step + 1);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register stokvel. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.personalInfo.fullName}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                fullName: e.target.value,
              },
            })
          }
          error={errors.fullName}
        />
      </div>
      <div>
        <Label htmlFor="idNumber">ID Number</Label>
        <Input
          id="idNumber"
          value={formData.personalInfo.idNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                idNumber: e.target.value,
              },
            })
          }
          error={errors.idNumber}
          maxLength={13}
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          value={formData.personalInfo.phoneNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: {
                ...formData.personalInfo,
                phoneNumber: e.target.value,
              },
            })
          }
          error={errors.phoneNumber}
          placeholder="+27..."
        />
      </div>
      <div>
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
          id="email"
          type="email"
          value={formData.personalInfo.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              personalInfo: { ...formData.personalInfo, email: e.target.value },
            })
          }
          error={errors.email}
        />
      </div>
    </div>
  );

  const renderStokvelDetails = () => (
    <div className="space-y-4">
      <div>
        <Label>Stokvel Type</Label>
        <Select
          value={formData.stokvelDetails.type}
          onValueChange={(value: StokvelType) =>
            setFormData({
              ...formData,
              stokvelDetails: { ...formData.stokvelDetails, type: value },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fixed">Fixed Savings</SelectItem>
            <SelectItem value="event">Event/Circumstance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Stokvel Name</Label>
        <Input
          value={formData.stokvelDetails.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              stokvelDetails: {
                ...formData.stokvelDetails,
                name: e.target.value,
              },
            })
          }
          error={errors.name}
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.stokvelDetails.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              stokvelDetails: {
                ...formData.stokvelDetails,
                description: e.target.value,
              },
            })
          }
          error={errors.description}
        />
      </div>
      <div>
        <Label>Contribution Amount (R)</Label>
        <Input
          type="number"
          value={formData.stokvelDetails.contributionAmount}
          onChange={(e) =>
            setFormData({
              ...formData,
              stokvelDetails: {
                ...formData.stokvelDetails,
                contributionAmount: Number(e.target.value),
              },
            })
          }
          error={errors.contributionAmount}
        />
      </div>
      <div>
        <Label>Frequency</Label>
        <Select
          value={formData.stokvelDetails.frequency}
          onValueChange={(value: Frequency) =>
            setFormData({
              ...formData,
              stokvelDetails: { ...formData.stokvelDetails, frequency: value },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="annually">Annually</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderAdminSetup = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Primary Admin (You)</Label>
        <Input
          value={formData.adminDetails.primaryAdmin.phoneNumber}
          disabled
          className="bg-gray-100"
        />
      </div>

      {formData.adminDetails.additionalAdmins.map((admin, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex-1">
            <Label>Additional Admin {index + 1}</Label>
            <Input
              value={admin.phoneNumber}
              onChange={(e) => {
                const newAdmins = [...formData.adminDetails.additionalAdmins];
                newAdmins[index].phoneNumber = e.target.value;
                setFormData({
                  ...formData,
                  adminDetails: {
                    ...formData.adminDetails,
                    additionalAdmins: newAdmins,
                  },
                });
              }}
              error={errors[`adminPhone${index}`]}
              placeholder="+27..."
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleRemoveAdmin(index)}
            className="mt-6"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {formData.adminDetails.additionalAdmins.length < 2 && (
        <Button
          variant="outline"
          onClick={handleAddAdmin}
          className="w-full mt-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Admin
        </Button>
      )}
    </div>
  );

  const renderMemberManagement = () => (
    <div className="space-y-4">
      {formData.members.map((member, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="flex-1">
            <Label>Member {index + 1} Phone Number</Label>
            <Input
              value={member.phoneNumber}
              onChange={(e) => {
                const newMembers = [...formData.members];
                newMembers[index].phoneNumber = e.target.value;
                setFormData({
                  ...formData,
                  members: newMembers,
                });
              }}
              error={errors[`memberPhone${index}`]}
              placeholder="+27..."
            />
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleRemoveMember(index)}
            className="mt-6"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={handleAddMember}
        className="w-full mt-4"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Member
      </Button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="font-semibold mb-2">Personal Information</h3>
        <p>Name: {formData.personalInfo.fullName}</p>
        <p>Phone: {formData.personalInfo.phoneNumber}</p>
        {formData.personalInfo.email && (
          <p>Email: {formData.personalInfo.email}</p>
        )}
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="font-semibold mb-2">Stokvel Details</h3>
        <p>
          Type:{' '}
          {formData.stokvelDetails.type === 'fixed'
            ? 'Fixed Savings'
            : 'Event/Circumstance'}
        </p>
        <p>Name: {formData.stokvelDetails.name}</p>
        <p>Contribution: R{formData.stokvelDetails.contributionAmount}</p>
        <p>Frequency: {formData.stokvelDetails.frequency}</p>
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="font-semibold mb-2">Administrators</h3>
        <p>Primary: {formData.adminDetails.primaryAdmin.phoneNumber}</p>
        {formData.adminDetails.additionalAdmins.map((admin, index) => (
          <p key={index}>
            Admin {index + 1}: {admin.phoneNumber}
          </p>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-4">
        <h3 className="font-semibold mb-2">
          Members ({formData.members.length})
        </h3>
        {formData.members.map((member, index) => (
          <p key={index}>
            Member {index + 1}: {member.phoneNumber}
          </p>
        ))}
      </div>
    </div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h3 className="text-xl font-semibold mb-4">Registration Successful!</h3>
      <p className="text-gray-600 mb-6">
        Your stokvel has been created successfully. We'll send invitations to
        all members and administrators via SMS.
      </p>
      <Button onClick={() => onOpenChange(false)}>Close</Button>
    </motion.div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return renderPersonalInfo();
      case 1:
        return renderStokvelDetails();
      case 2:
        return renderAdminSetup();
      case 3:
        return renderMemberManagement();
      case 4:
        return renderConfirmation();
      case 5:
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{steps[step].title}</DialogTitle>
          <p className="text-gray-500">{steps[step].subtitle}</p>
        </DialogHeader>

        <div className="mt-4">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {steps.slice(0, -1).map((_, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index !== steps.length - 2 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= index
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index !== steps.length - 2 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > index ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>

          {/* Navigation buttons */}
          {step < steps.length - 1 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
              >
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting
                  ? 'Processing...'
                  : step === steps.length - 2
                  ? 'Submit Registration'
                  : 'Next'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StokvelRegistration;
