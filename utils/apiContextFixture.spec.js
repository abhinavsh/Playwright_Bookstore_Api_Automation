// utils/apiContextFixture.spec.js

import { request } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export async function createApiContext() {
  const env = process.env.ENV || 'QA';
  const baseUrl = process.env[`BASE_URL_${env}`];

  if (!baseUrl) throw new Error(`Base URL not configured for ENV: ${env}`);

  return await request.newContext({
    baseURL: baseUrl,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Gets credentials from the .env file.
 * @param {object} [options] - Optional settings.
 * @param {boolean} [options.makeUnique=false] - If true, appends a random string to the email to make it unique.
 * @returns {{email: string, password: string}}
 */
export function getEnvCredentials(options = {}) {
  const { makeUnique = false } = options;
  const env = process.env.ENV || 'QA';

  let email = process.env[`EMAIL_${env}`];
  const password = process.env.PASSWORD;

  if (!email || !password) {
    throw new Error(`Credentials (EMAIL_${env} or PASSWORD) not found in .env file.`);
  }

  // If the makeUnique option is true, modify the email
  if (makeUnique) {
    // Generate a short random alphanumeric string (e.g., "a1b2c3")
    const randomString = Math.random().toString(36).substring(2, 8);
    
    // Split the email and insert the random string
    const emailParts = email.split('@');
    email = `${emailParts[0]}_${randomString}@${emailParts[1]}`;
  }

  return { email, password };
}