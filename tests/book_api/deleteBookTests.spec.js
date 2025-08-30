import { expect } from '@playwright/test';

export class DeleteBookTests {
  constructor(api, token) {
    this.api = api;
    this.token = token;
  }

async positiveDeleteBook(bookId) {
  console.log(`🚀 Sending request to delete book ID ${bookId}`);

  const res = await this.api.delete(`/books/${bookId}`, {
    headers: { Authorization: `Bearer ${this.token}` },
  });
  const status = res.status();
  const body = await res.json().catch(() => res.text());

  console.log('✅ DeleteBook Status:', status);
  console.log('✅ DeleteBook Response:', body);

  // Assert the status code is 200
  expect(status, `Positive delete for book ID ${bookId} should return status 200`).toBe(200);

  // ✅ Assert the response body contains the correct success message
  expect(body, 'The response should contain the correct deletion message').toEqual({
    message: 'Book deleted successfully',
  });
}

  async negativeDeleteBook() {
    const invalidBookId = '999999999';
    console.log(`🚀 Sending request to delete non-existent book ID ${invalidBookId}`);

    const res = await this.api.delete(`/books/${invalidBookId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
    const status = res.status();
    const body = await res.json().catch(() => res.text());

    console.log('❌ Negative Delete_Book Status:', status);
    console.log('❌ Negative Delete_Book Response:', body);

    expect(status, 'Negative delete with invalid ID should return status 422').toBe(404);
  }
}