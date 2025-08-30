// tests/signup_api/signupTests.spec.js

import { expect } from '@playwright/test';
import { getEnvCredentials } from '../../utils/apiContextFixture.spec.js';

export class SignupTests {
  constructor(api) {
    this.api = api;
  }

  async positiveSignup() {
    // Just call the function with the option to get a unique email directly
    const payload = getEnvCredentials({ makeUnique: true });

    console.log('🚀 Sending payload for positive signup:', payload);

    const res = await this.api.post('/signup', { data: payload });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('✅ Positive Signup Status:', status);
    console.log('✅ Positive Signup Response:', body);

    expect(status, 'Positive signup should return status 200').toBe(200);

    return payload;
  }

  async negativeSignup() {
    // This remains the same
    const payload = { email: 'invaliduser', password: '' };
    console.log('🚀 Sending payload for negative signup:', payload);

    const res = await this.api.post('/signup', { data: payload });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('❌ Negative Signup Status:', status);
    console.log('❌ Negative Signup Response:', body);

    expect(status, 'Negative signup with invalid data should return status 400').toBe(400);
  }
}