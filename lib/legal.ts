export const LEGAL = {
  owner: "Schayan Yousefian",
  street: "Freienwalder Str. 34",
  postalCode: "13359",
  city: "Berlin",
  country: "Deutschland",
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL?.trim() || null,
} as const;

export const legalContactComplete = Boolean(LEGAL.email);
