'use client';

import React from 'react';

interface MemberCardProps {
  name: string;
  phoneNumber: string;
  deposited: number;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  phoneNumber,
  deposited,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-gray-600">Phone: {phoneNumber}</p>
      <p className="text-gray-600">Deposited: R{deposited.toLocaleString()}</p>
    </div>
  );
};

export default MemberCard;
