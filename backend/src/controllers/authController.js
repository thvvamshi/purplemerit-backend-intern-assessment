const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    message
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (password) => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return sendError(res, 400, "All fields are required");
    }

    if (!isValidEmail(email)) {
      return sendError(res, 400, "Invalid email format");
    }

    if (!isStrongPassword(password)) {
      return sendError(
        res,
        400,
        "Password must be at least 8 characters and include uppercase, lowercase, and number"
      );
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return sendError(res, 409, "Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user"
    });

    const token = createToken(user);

    res.status(201).json({
      status: "success",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch {
    sendError(res, 500, "Signup failed");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, 401, "Invalid credentials");
    }

    if (user.status === "inactive") {
      return sendError(res, 403, "User is inactive");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return sendError(res, 401, "Invalid credentials");
    }

    user.lastLogin = new Date();
    await user.save();

    const token = createToken(user);

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch {
    sendError(res, 500, "Login failed");
  }
};

exports.logout = async (req, res) => {
  return res.status(200).json({
    status: "success",
    message: "Logged out successfully"
  });
};
