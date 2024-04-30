import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useResetPasswordMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";

/**
 * ResetPassword component handles resetting the user's password.
 */
export default function ResetPassword() {
  const { resetToken } = useParams(); // Get the reset token from the URL parameters
  const navigate = useNavigate(); // Navigation hook

  const [resetPassword, { isLoading }] = useResetPasswordMutation(); // Mutation for resetting password
  const [password, setPassword] = useState(""); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password input

  // Function to handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (password !== confirmPassword) {
      // Check if passwords match
      alert("Passwords do not match"); // Show alert if passwords do not match
    } else {
      try {
        // Attempt to reset password
        await resetPassword({ resetToken, password }).unwrap(); // Call reset password mutation
        toast.success("Password Reset Successfully"); // Show success message
        navigate("/"); // Navigate to home page
      } catch (error) {
        // Handle error
        toast.error(error?.data?.message || error?.error); // Show error message
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 mb-28 p-4 max-w-md">
      {/* Reset password form */}
      <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        {/* Password input */}
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
          />
        </div>
        {/* Confirm password input */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="text-gray-700">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white border border-gray-300 p-2 rounded-md mt-2 w-full"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
        >
          Submit
        </button>
        {/* Loading spinner */}
        {isLoading && <Spinner />}
      </form>
    </div>
  );
}
