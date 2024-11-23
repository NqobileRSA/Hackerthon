import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Member {
  id: number;
  name: string;
  phoneNumber: string;
  password: string;
}

const mockMembers: Member[] = [
  {
    id: 1,
    name: 'Sipho Dlamini',
    phoneNumber: '0812345678',
    password: 'admin123',
  },
  {
    id: 2,
    name: 'Thandi Nkosi',
    phoneNumber: '0823456789',
    password: 'admin123',
  },
  {
    id: 3,
    name: 'Nomsa Mkhize',
    phoneNumber: '0834567890',
    password: 'admin123',
  },
  {
    id: 4,
    name: 'Bongani Zulu',
    phoneNumber: '0845678901',
    password: 'member123',
  },
  {
    id: 5,
    name: 'Zanele Khumalo',
    phoneNumber: '0856789012',
    password: 'member123',
  },
];

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>(''); // State for password
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async (): Promise<void> => {
    setIsSubmitting(true);

    // Validate phone number format
    if (!/^0\d{9}$/.test(phoneNumber)) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a valid South African phone number.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    // Check if phone number and password match a mock member
    const member = mockMembers.find(
      (m) => m.phoneNumber === phoneNumber && m.password === password
    );

    if (member) {
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${member.name}!`,
      });

      // Check if member is admin (password check)
      if (member.password === 'admin123') {
        router.push('/Members/Admin'); // Redirect to AdminPage
      } else {
        router.push('/Members'); // Regular member route
      }
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogin} disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
