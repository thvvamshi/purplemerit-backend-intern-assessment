
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();


beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.connection.close();
});

test("Signup success", async () => {
  const res = await request(app).post("/api/auth/signup").send({
    fullName:"Test",
    email:"test1@mail.com",
    password:"Test@1234"
  });
  expect(res.status).toBe(201);
});

test("Login success", async () => {
  const res = await request(app).post("/api/auth/login").send({
    email:"test1@mail.com",
    password:"Test@1234"
  });
  expect(res.status).toBe(200);
});

test("Reject weak password", async () => {
  const res = await request(app).post("/api/auth/signup").send({
    fullName:"Weak",
    email:"weak@mail.com",
    password:"123"
  });
  expect(res.status).toBe(400);
});

test("Block inactive user", async () => {
  await User.updateOne({ email:"test1@mail.com" },{ status:"inactive" });
  const res = await request(app).post("/api/auth/login").send({
    email:"test1@mail.com",
    password:"Test@1234"
  });
  expect(res.status).toBe(403);
});

test("Admin fetch users", async () => {
  const admin = await User.create({
    fullName:"Admin",
    email:"admin@mail.com",
    password:"hashed",
    role:"admin"
  });
  const token = jwt.sign({ id:admin._id, role:"admin" },process.env.JWT_SECRET);
  const res = await request(app)
    .get("/api/users")
    .set("Authorization",`Bearer ${token}`);
  expect(res.status).toBe(200);
});
