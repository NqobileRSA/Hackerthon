'use client';
import React from 'react';
import { StokvelFormData, Permission } from '@/types/stokvel';

interface AdminDetailsFormProps {
  formData: StokvelFormData['adminDetails'];
  onChange: (data: Partial<StokvelFormData['adminDetails']>) => void;
}

const AdminDetailsForm: React.FC<AdminDetailsFormProps> = ({
  formData,
  onChange,
}) => {
  const handleAddAdmin = () => {
    onChange({
      additionalAdmins: [
        ...formData.additionalAdmins,
        { phoneNumber: '', permissions: ['partial'] },
      ],
    });
  };

  const handleRemoveAdmin = (index: number) => {
    const updatedAdmins = formData.additionalAdmins.filter(
      (_, i) => i !== index
    );
    onChange({ additionalAdmins: updatedAdmins });
  };

  const handleAdminChange = (
    index: number,
    key: keyof StokvelFormData['adminDetails']['additionalAdmins'][0],
    value: string | Permission[]
  ) => {
    const updatedAdmins = formData.additionalAdmins.map((admin, i) =>
      i === index ? { ...admin, [key]: value } : admin
    );
    onChange({ additionalAdmins: updatedAdmins });
  };

  return (
    <div>
      <h2>Step 3: Admin Details</h2>
      <label>Primary Admin Phone Number</label>
      <input
        type="text"
        value={formData.primaryAdmin.phoneNumber}
        onChange={(e) =>
          onChange({
            primaryAdmin: {
              ...formData.primaryAdmin,
              phoneNumber: e.target.value,
            },
          })
        }
      />
      <label>Primary Admin Permissions</label>
      <select
        value={formData.primaryAdmin.permissions[0]}
        onChange={(e) =>
          onChange({
            primaryAdmin: {
              ...formData.primaryAdmin,
              permissions: [e.target.value as Permission],
            },
          })
        }
      >
        <option value="full">Full</option>
        <option value="partial">Partial</option>
      </select>

      <h3>Additional Admins</h3>
      {formData.additionalAdmins.map((admin, index) => (
        <div key={index}>
          <label>Phone Number</label>
          <input
            type="text"
            value={admin.phoneNumber}
            onChange={(e) =>
              handleAdminChange(index, 'phoneNumber', e.target.value)
            }
          />
          <label>Permissions</label>
          <select
            value={admin.permissions[0]}
            onChange={(e) =>
              handleAdminChange(index, 'permissions', [
                e.target.value as Permission,
              ])
            }
          >
            <option value="full">Full</option>
            <option value="partial">Partial</option>
          </select>
          <button onClick={() => handleRemoveAdmin(index)}>Remove</button>
        </div>
      ))}
      <button onClick={handleAddAdmin}>Add Admin</button>
    </div>
  );
};

export default AdminDetailsForm;
