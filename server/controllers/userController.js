import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// Handler function to authenticate and login a user
const loginUser = asyncHandler(async (req, res) => {
  // Destructure email and password from request body
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  } 

  // Generate and set JWT token in response cookie
  generateToken(res, user._id);

  // Send JSON response with user details
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// Handler function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  // Destructure name, email, and password from request body
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({ name, email, password });

  // Generate and set JWT token in response cookie
  generateToken(res, user._id);

  // Send JSON response with user details
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// Handler function to update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find user by ID
  const user = await User.findById(req.body._id);

  // Check if user exists
  if (user) {
    // Update user profile data
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    await user.save();

    // Send JSON response with updated user details
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Handler function to log out user by clearing cookies
const logoutUser = asyncHandler(async (req, res) => {
  // Clear JWT and session cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("connect.sid", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // Send JSON response indicating successful logout
  res.status(200).json({
    message: "Logged out successfully",
  });
});

// Handler function to send password reset token via email
const forgotPassword = asyncHandler(async (req, res) => {
  // Destructure email from request body
  const { email } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Create and save password reset token
  const resetToken = user.createPasswordResetToken();
  user.save();

  // Construct reset URL and message
  const resetUrl = `${req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
  const message = `Forgot Password? Click on this link to reset your Password: ${resetUrl}`;

  // Send email with reset token
  try {
    await sendEmail({
      email: user.email,
      subject: "Your Password Reset Token (valid for 10 minutes)",
      message,
    });
    // Send JSON response indicating successful token sent
    res.status(200).json({
      message: "Token sent to email",
    });
  } catch (error) {
    // Handle email sending error
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save();
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error sending email. Please try again later",
    });
  }
});

// Handler function to reset user password
const resetPassword = asyncHandler(async (req, res) => {
  // Hash reset token
  const hashedToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  // Find user by hashed token and expiry date
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // Check if user exists
  if (!user) {
    res.status(400).json({
      status: "fail",
      message: "Token is invalid or has expired",
    });
  }

  // Update user password and clear reset token
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();

  // Generate and set JWT token in response cookie
  generateToken(res, user._id);

  // Send JSON response with updated user details
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// Export user authentication handler functions
export {
  loginUser,
  registerUser,
  updateUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
};
