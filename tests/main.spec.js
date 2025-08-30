// tests/main.spec.js
import { test, expect } from '@playwright/test';
import { createApiContext } from '../utils/apiContextFixture.spec.js';

import { SignupTests } from './signup_api/signupTests.spec.js';
import { LoginTests } from './login_api/loginTests.spec.js';
import { GetAllBooksTests } from './book_api/getAllBooksTests.spec.js';
import { CreateBookTests } from './book_api/createBookTests.spec.js';
import { UpdateBookTests } from './book_api/updateBookTests.spec.js';
import { DeleteBookTests } from './book_api/deleteBookTests.spec.js';

// Use a describe block to group all related API tests
test.describe('Bookstore API Test Suite', () => {
  let api;
  let token;

  // -- Test Instances --
  let signup;
  let login;
  let getBooks;
  let createBook;
  let updateBook;
  let deleteBook;

  // beforeAll runs once before all tests in this describe block
  test.beforeAll(async () => {
    api = await createApiContext();
    signup = new SignupTests(api);
    login = new LoginTests(api);

    // Step 1: Create a user and log in to get a token for other tests
    await test.step('SETUP: Create User and Login', async () => {
      const creds = await signup.positiveSignup();
      token = await login.positiveLogin(creds.email, creds.password);
      expect(token, 'Authentication token must be generated for tests').toBeTruthy();
    });

    // Initialize all other test classes with the valid token
    getBooks = new GetAllBooksTests(api, token);
    createBook = new CreateBookTests(api, token);
    updateBook = new UpdateBookTests(api, token);
    deleteBook = new DeleteBookTests(api, token);
  });

  test('Authentication API | Signup and Login negative cases', async () => {
    await test.step('Negative Test: Signup with invalid data', async () => {
      await signup.negativeSignup();
    });

    await test.step('Negative Test: Login with wrong credentials', async () => {
      await login.negativeLogin();
    });
  });

  test('Get All Books API | Positive and Negative cases', async () => {
    await test.step('Positive Test: Get all books', async () => {
      await getBooks.positiveGetAllBooks();
    });

    await test.step('Negative Test: Get books from invalid endpoint', async () => {
      await getBooks.negativeGetAllBooks();
    });
  });

  test('Book API | Full CRUD Flow (Create, Update, Delete)', async () => {
    let bookId;

    await test.step('Step 1: Positive - Create a new book', async () => {
      bookId = await createBook.positiveCreateBook();
      expect(bookId, 'A valid Book ID should be returned after creation').toBeTruthy();
    });

    await test.step('Step 2: Negative - Attempt to create a duplicate book', async () => {
      await createBook.negativeCreateBook();
    });

    await test.step('Step 3: Positive - Update the created book', async () => {
      await updateBook.positiveUpdateBook(bookId);
    });

    await test.step('Step 4: Negative - Attempt to update a non-existent book', async () => {
      await updateBook.negativeUpdateBook();
    });

    await test.step('Step 5: Positive - Delete the created book', async () => {
      await deleteBook.positiveDeleteBook(bookId);
    });

    await test.step('Step 6: Negative - Attempt to delete a non-existent book', async () => {
      await deleteBook.negativeDeleteBook();
    });
  });
});