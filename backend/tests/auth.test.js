const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

/**
 * Connect once before all tests
 */
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

/**
 * Clean DB + close connection after tests
 */
afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe("Authentication & User Management", () => {

  test("Signup success", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Test User",
        email: "test1@mail.com",
        password: "Test@1234",
      });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  test("Login success", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test1@mail.com",
        password: "Test@1234",
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("Reject weak password", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        fullName: "Weak User",
        email: "weak@mail.com",
        password: "123",
      });

    expect(res.status).toBe(400);
  });

  test("Block inactive user", async () => {
    await User.updateOne(
      { email: "test1@mail.com" },
      { status: "inactive" }
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test1@mail.com",
        password: "Test@1234",
      });

    expect(res.status).toBe(403);
  });

  test("Admin fetch users", async () => {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await User.create({
      fullName: "Admin",
      email: "admin@mail.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const res = await request(app)
      .get("/api/users?page=1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.users).toBeInstanceOf(Array);
  });

});
