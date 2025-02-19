const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Book = require("../models/Book");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(uri);
  // Create a test user
  const testUser = new User({
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  });
  await testUser.save();

  // Generate a JWT token
  token = jwt.sign({ id: testUser._id }, process.env.JWT_USER_PASSWORD, {
    expiresIn: "1h",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Test GET /books
describe("GET /books", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/books").set("token", token);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Test POST /books
describe("POST /books", () => {
  it("should create a new book", async () => {
    const newBook = {
      title: "The Alchemist",
      author: "Paulo Coelho",
      publishedDate: "1988-04-15",
      genre: "Fiction",
    };

    const res = await request(app)
      .post("/books")
      .set("token", token)
      .send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("title", "The Alchemist");
  });
});

// Test GET /books/:id (Fetching a book by ID)
describe("GET /books/:id", () => {
  it("should return a single book", async () => {
    const book = new Book({
      title: "Mock Book",
      author: "Test Author",
      publishedDate: "2000-01-01",
      genre: "Test Genre",
    });

    await book.save();
    const res = await request(app)
      .get(`/books/${book._id}`)
      .set("token", token);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Mock Book");
  });
});

// Test PUT /books/:id (Updating a book)
describe("PUT /books/:id", () => {
  it("should update a book", async () => {
    const book = new Book({
      title: "Old Title",
      author: "Old Author",
      publishedDate: "1990-01-01",
      genre: "Old Genre",
    });

    await book.save();
    const updatedData = { title: "New Title" };

    const res = await request(app)
      .put(`/books/${book._id}`)
      .set("token", token)
      .send(updatedData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "New Title");
  });
});

// Test DELETE /books/:id
describe("DELETE /books/:id", () => {
  it("should delete a book", async () => {
    const book = new Book({
      title: "To Be Deleted",
      author: "Unknown",
      publishedDate: "2005-06-07",
      genre: "Mystery",
    });

    await book.save();
    const res = await request(app)
      .delete(`/books/${book._id}`)
      .set("token", token);
    expect(res.statusCode).toBe(200);
  });
});
