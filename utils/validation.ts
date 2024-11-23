export const validateIdNumber = (idNumber: string): boolean => {
  return /^[0-9]{13}$/.test(idNumber);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  return /^[0-9]{10,15}$/.test(phoneNumber);
};

export const validateEmail = (email: string): boolean => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return email ? regex.test(email) : true;
};
