'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; 
interface Member {
  id: number;
  name: string;
  deposited: number;
  withdrawalRequested: boolean;
}

const members: Member[] = [
  { id: 1, name: 'Sipho Dlamini', deposited: 5000, withdrawalRequested: true },
  { id: 2, name: 'Thandi Nkosi', deposited: 7000, withdrawalRequested: false },
  { id: 3, name: 'Nomsa Mkhize', deposited: 3000, withdrawalRequested: true },
  { id: 4, name: 'Bongani Zulu', deposited: 4000, withdrawalRequested: false },
  {
    id: 5,
    name: 'Zanele Khumalo',
    deposited: 2000,
    withdrawalRequested: false,
  },
];

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [approvedWithdrawals, setApprovedWithdrawals] = useState<number[]>([]);

  const handleApproveWithdrawal = (memberId: number): void => {
    setApprovedWithdrawals([...approvedWithdrawals, memberId]);
  };

  // Navigate to Members Page
  const handleNavigateToMembersPage = () => {
    router.push('/Members');
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="p-6">
        <div className="bg-blue-100 p-4 rounded-lg mb-6 shadow-sm">
          <h2 className="text-lg font-semibold">Approve Withdrawals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map(
            (member) =>
              member.withdrawalRequested && (
                <div key={member.id} className="p-4 border rounded-lg shadow">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p>Deposited: R{member.deposited.toLocaleString()}</p>
                  <Button
                    onClick={() => handleApproveWithdrawal(member.id)}
                    className="mt-2"
                  >
                    Approve Withdrawal
                  </Button>
                </div>
              )
          )}
        </div>

        <div className="mt-6 flex justify-center space-x-4">
          <Button onClick={handleNavigateToMembersPage}>
            Go to Members Page
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-red-500 text-white"
          >
            Logout
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
