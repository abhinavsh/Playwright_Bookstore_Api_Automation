import { expect } from '@playwright/test';

export class LoginTests {
  constructor(api) {
    this.api = api;
  }

  async positiveLogin(email, password) {
    const payload = { email, password };
    console.log('🚀 Sending payload for positive login:', payload);

    const res = await this.api.post('/login', { data: payload });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('✅ Positive Login Status:', status);
    console.log('✅ Positive Login Response:', body);

    expect(status, 'Positive login should return status 200').toBe(200);
    expect(body.access_token, 'Response body should contain an access_token').toBeTruthy();

    return body.access_token;
  }

  async negativeLogin() {
    const payload = { email: 'wrong@example.com', password: 'wrongpassword' };
    console.log('🚀 Sending payload for negative login:', payload);

    const res = await this.api.post('/login', { data: payload });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('❌ Negative Login Status:', status);
    console.log('❌ Negative Login Response:', body);

    expect(status, 'Negative login with wrong credentials should return status 400').toBe(400);
  }
}