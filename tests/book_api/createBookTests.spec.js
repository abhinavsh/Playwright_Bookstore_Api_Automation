import { expect } from '@playwright/test';

export class CreateBookTests {
  constructor(api, token) {
    this.api = api;
    this.token = token;
  }

async positiveCreateBook() {
  const dynamicValue = Date.now();
  const payload = {
    id: dynamicValue,
    name: `Test Book ${dynamicValue}`,
    author: 'Abhinav',
    published_year: 2025,
    book_summary: `Summary for book ${dynamicValue}`,
  };
  console.log('🚀 Sending payload for positive book creation:', payload);

  const res = await this.api.post('/books/', {
    headers: { Authorization: `Bearer ${this.token}` },
    data: payload,
  });
  const status = res.status();
  const body = await res.json().catch(() => res.text());

  console.log('✅ CreateBook Status:', status);
  console.log('✅ CreateBook Response:', body);

  expect(status, 'Positive book creation should return status 200').toBe(200);

  // ✅ Assert that the response body contains all the key-value pairs from the payload.
  // This is the most robust way to compare the objects.
  expect(body, 'The response body should match the data that was sent').toMatchObject(payload);
  console.log('✅ CreateBook Response is validated');

  return body.id;
}

  async negativeCreateBook() {
    // This payload should cause an error (e.g., duplicate ID)
    const payload = { id: 12, name: 'Duplicate Book' };
    console.log('🚀 Sending payload for negative book creation (duplicate):', payload);

    const res = await this.api.post('/books/', {
      headers: { Authorization: `Bearer ${this.token}` },
      data: payload,
    });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('❌ Negative CreateBook Status:', status);
    console.log('❌ Negative CreateBook Response:', body);

    expect(status, 'Negative book creation with duplicate data should return status 500').toBe(500);
  }
}