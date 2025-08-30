import dotenv from 'dotenv';
dotenv.config();

export function getLoginCredentials() {
  const env = process.env.ENV || 'QA';

  // Primary env-specific creds (if they exist)
  const email = process.env[`EMAIL_${env}`];
  const password = process.env.PASSWORD;

  if (email && password) {
    return { email, password };
  }

  // Fallback creds
  return {
    email: process.env.DEFAULT_EMAIL,
    password: process.env.DEFAULT_PASSWORD,
  };
}
