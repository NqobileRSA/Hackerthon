export const validators = {
  phoneNumber: (value: string) => /^[0-9]{10}$/.test(value),
  idNumber: (value: string) => /^[0-9]{13}$/.test(value),
  email: (value: string) =>
    !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value),
  contributionAmount: (value: number) => value > 0,
  name: (value: string) => value.length >= 3,
};
