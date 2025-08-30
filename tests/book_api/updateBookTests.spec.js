import { expect } from '@playwright/test';

export class UpdateBookTests {
  constructor(api, token) {
    this.api = api;
    this.token = token;
  }

  async positiveUpdateBook(bookId) {
    const payload = { author: 'Updated Author Name' };
    console.log(`🚀 Sending payload to update book ID ${bookId}:`, payload);

    const res = await this.api.put(`/books/${bookId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      data: payload,
    });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('✅ UpdateBook Status:', status);
    console.log('✅ UpdateBook Response:', body);

    expect(status, `Positive update for book ID ${bookId} should return status 200`).toBe(200);
    expect(body, 'The response body should match the data that was sent').toMatchObject(payload);
    console.log('✅ Updated Book Response is validated');
  }

  async negativeUpdateBook() {
    const invalidBookId = '999999999';
    console.log(`🚀 Sending payload to update non-existent book ID ${invalidBookId}`);

    const res = await this.api.put(`/books/${invalidBookId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
      data: { author: 'Invalid Update' },
    });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('❌ Negative UpdateBook Status:', status);
    console.log('❌ Negative UpdateBook Response:', body);

    expect(status, 'Negative update with invalid ID should return status 404').toBe(404);
  }
}