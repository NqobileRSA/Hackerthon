'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import MemberCard from './MemberCard';
import { Button } from '@/components/ui/button';

const members = [
  { id: 1, name: 'Sipho Dlamini', deposited: 5000 },
  { id: 2, name: 'Thandi Nkosi', deposited: 7000 },
  { id: 3, name: 'Nomsa Mkhize', deposited: 3000 },
  { id: 4, name: 'Bongani Zulu', deposited: 4000 },
  { id: 5, name: 'Zanele Khumalo', deposited: 2000 },
];

const MembersPage: React.FC = () => {
  const router = useRouter();
  const goal = 50000;
  const totalDeposited = members.reduce(
    (acc, member) => acc + member.deposited,
    0
  );

  // Handle Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Stokvel Members</h1>
      </header>
      <main className="p-6">
        <div className="bg-blue-100 p-4 rounded-lg mb-6 shadow-sm">
          <h2 className="text-lg font-semibold">Stokvel Overview</h2>
          <p>Goal: R{goal.toLocaleString()}</p>
          <p>Total Deposited: R{totalDeposited.toLocaleString()}</p>
          <p>Remaining: R{(goal - totalDeposited).toLocaleString()}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              name={member.name}
              deposited={member.deposited}
            />
          ))}
        </div>
        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} Stokvel App</p>
      </footer>
    </div>
  );
};

export default MembersPage;
