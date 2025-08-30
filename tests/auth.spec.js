
const { test, expect, request } = require('@playwright/test');
require('dotenv').config();

test.describe('Authentication', () => {
  test('Login and get JWT token', async () => {
    // const apiContext = await request.newContext({ baseURL: 'http://127.0.0.1:8000' });
    const apiContext = await request.newContext({ baseURL: process.env.BASE_URL });

    const res = await apiContext.post('/login', {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // must use "json" not "data" or "form"
      data: JSON.stringify({
        id: 0,
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      }),
    });

    console.log("Status:", res.status());
    console.log("Response:", await res.text());

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('access_token');
  });
});

