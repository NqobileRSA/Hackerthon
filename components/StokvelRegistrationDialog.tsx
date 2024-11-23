import { openDatabase } from 'sqlite'; // You might need to install `sqlite3` and `sqlite` packages
import sqlite3 from 'sqlite3'; // For SQLite support
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, ArrowRight, Plus, Minus, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { StokvelFormData, StokvelType, Frequency } from '@/types/stokvel'; // Ensure these types match your data structure

// Open or create a local database
const dbPromise = openDatabase({
  filename: './stokvel.db', // Ensure this file path exists
  driver: sqlite3.Database,
});

// Function to initialize the database schema
const initializeDB = async () => {
  const db = await dbPromise;
  await db.run(`
    CREATE TABLE IF NOT EXISTS stokvels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      formData TEXT NOT NULL
    )
  `);
};
initializeDB();

const StokvelRegistrationDialog = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(defaultErrors);

  const handleSubmit = async () => {
    let isValid = false;

    switch (step) {
      case 0:
        isValid = validatePersonalInfo();
        break;
      case 1:
        isValid = validateStokvelDetails();
        break;
      case 2:
        isValid = validateAdmins();
        break;
      case 3:
        isValid = validateMembers();
        break;
      default:
        isValid = true;
    }

    if (!isValid) {
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

    if (step === steps.length - 2) {
      setIsSubmitting(true);
      try {
        const db = await dbPromise;
        const result = await db.run(
          'INSERT INTO stokvels (formData) VALUES (?)',
          JSON.stringify(formData)
        );

        if (result.lastID) {
          setStep(step + 1);
          toast({
            title: 'Success!',
            description: 'Your stokvel group has been created successfully.',
          });
        } else {
          throw new Error('Failed to insert data into the database.');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'Failed to submit registration',
          variant: 'destructive',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-900 max-w-2xl">
        {/* Content similar to original */}
      </DialogContent>
    </Dialog>
  );
};

export default StokvelRegistrationDialog;
