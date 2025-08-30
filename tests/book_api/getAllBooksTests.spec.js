import { expect } from '@playwright/test';

export class GetAllBooksTests {
  constructor(api, token) {
    this.api = api;
    this.token = token;
  }

  async positiveGetAllBooks() {
    console.log('🚀 Sending request to get all books');
    const res = await this.api.get('/books/', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('✅ GetAllBooks Status:', status);

    expect(status, 'Positive get all books should return status 200').toBe(200);
    expect(Array.isArray(body), 'Response body should be an array of books').toBe(true);
  }

  async negativeGetAllBooks() {
    console.log('🚀 Sending request to an invalid books endpoint');
    const res = await this.api.get('/books/invalid/endpoint', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('❌ Negative GetAllBooks Status:', status);
    console.log('❌ Negative GetAllBooks Response:', body);

    expect(status, 'Request to invalid endpoint should return status 404').toBe(404);
  }
}