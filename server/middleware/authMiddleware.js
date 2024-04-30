import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Middleware function to protect routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if JWT token is present in request cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded user ID and exclude password field
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      // Send 401 Unauthorized status and error message if token verification fails
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    // Send 401 Unauthorized status and error message if no token found in request
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Middleware function to check if user is an admin
const admin = (req, res, next) => {
  // Check if user exists in request and if user is an admin
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    // Send 401 Unauthorized status and error message if user is not an admin
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

// Export protect and admin middleware functions
export { protect, admin };
