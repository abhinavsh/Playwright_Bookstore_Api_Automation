const { test, expect, request } = require("@playwright/test");

test.describe("Bookstore CRUD", () => {
  let apiContext;
  let token;
  let bookId;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({ baseURL: process.env.BASE_URL });

    // Login
    const loginRes = await apiContext.post("/login", {
      data: {
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      },
    });

    console.log("Status:", loginRes.status());
    console.log("Response:", await loginRes.text());

    expect(loginRes.ok()).toBeTruthy();
    token = (await loginRes.json()).access_token;
  });

  test("Create Book", async () => {
    const res = await apiContext.post("/books/", {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        id: 9,
        name: "Test_Book_name_9",
        author: "Abhinav_name",
        published_year: 2025,
        book_summary: "This is test book_name",
      },
    });

    console.log("Status:", res.status());
    console.log("Response:", await res.text());

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.name).toBe("Test_Book_name_9");
    bookId = body.id;
  });

  test("Get All Books", async () => {
    const res = await apiContext.get("/books/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Status:", res.status());
    console.log("Response:", await res.text());

    expect(res.ok()).toBeTruthy();
    const books = await res.json();
    expect(Array.isArray(books)).toBeTruthy();
  });

  test("Update Book", async () => {
    console.log("bookId before update:", bookId); // Check if it's set

    const endpoint = `/books/${bookId}`;
    const payload = {
      id: bookId,
      name: "Updated_Name_2",
      author: "Abhinav_name",
      published_year: 2025,
      book_summary: "Updated summary",
    };

    console.log("Endpoint:", endpoint);
    console.log("Payload:", payload);

    const res = await request.put(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: payload,
    });

    console.log("Status:", res.status());
    console.log("Response:", await res.text());

    expect(res.status()).toBe(200);
  });

  test("Delete Book", async () => {
    const endpoint = `/books/${bookId}`;

    console.log("Endpoint:", endpoint);

    const res = await apiContext.delete(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Status:", res.status());
    console.log("Response:", await res.text());

    expect(res.status()).toBe(200);
  });
});
