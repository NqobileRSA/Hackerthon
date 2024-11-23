// utils/validations.ts

export const validateIDNumber = (idNumber: string): boolean => {
  return /^[0-9]{13}$/.test(idNumber);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return /^[0-9]{10,13}$/.test(phoneNumber);
};

export const validateContributionAmount = (amount: number): boolean => {
  return amount > 0;
};
