const User = require("../models/User");
const bcrypt = require("bcrypt");
const validatePassword = require("../utils/passwordValidator");

const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: "error",
    message
  });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    res.status(200).json({
      status: "success",
      data: user
    });
  } catch {
    sendError(res, 500, "Failed to fetch profile");
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName && !email) {
      return sendError(res, 400, "Nothing to update");
    }

    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user._id }
      });

      if (existingUser) {
        return sendError(res, 409, "Email already exists");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullName, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      status: "success",
      data: updatedUser
    });
  } catch {
    sendError(res, 500, "Profile update failed");
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { current, new: newPassword } = req.body;

    if (!current || !newPassword) {
      return sendError(res, 400, "All fields required");
    }

    if (!validatePassword(newPassword)) {
      return sendError(
        res,
        400,
        "Password must be 8+ chars, include uppercase, lowercase, number and special character"
      );
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    const match = await bcrypt.compare(current, user.password);
    if (!match) {
      return sendError(res, 401, "Current password incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Password updated successfully"
    });
  } catch {
    sendError(res, 500, "Password update failed");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      status: "success",
      data: {
        users,
        pagination: {
          page,
          totalPages: Math.ceil(total / limit),
          totalUsers: total
        }
      }
    });
  } catch {
    sendError(res, 500, "Failed to fetch users");
  }
};

exports.setStatus = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return sendError(res, 400, "Admin cannot change own status");
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.status = user.status === "active" ? "inactive" : "active";
    await user.save();

    res.status(200).json({
      status: "success",
      message: "User status updated"
    });
  } catch {
    sendError(res, 500, "Status update failed");
  }
};
