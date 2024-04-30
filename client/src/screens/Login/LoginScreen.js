import React, { useState } from "react";
import { useLoginMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { useForgotPasswordMutation } from "../../slices/userApiSlice";
import { BACKEND_URL } from "../../constants";
import styles from "./loginScreen.module.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * LoginScreen component displays the login form and handles user login.
 */
export default function LoginScreen({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isLoadingPassword }] = useForgotPasswordMutation();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successful");
      onClose(); // Close the login modal
      navigate("/maids"); // Navigate to the maids page
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  // Function to handle forgot password
  const handleForgotPassword = async () => {
    if (!email) alert("Please enter your email");
    else {
      try {
        const res = await forgotPassword({ email }).unwrap();
        toast.success(res.message);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Function to handle Google authentication
  const handleGoogleAuth = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google/callback`;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        {/* Email input */}
        <div className={styles.formInput}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password input */}
        <div className={styles.formInput}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Forgot password link */}
        <p className={styles.forgotPassword} onClick={handleForgotPassword}>
          Forgot Password? Click here
        </p>
        {/* Loading spinner */}
        {isLoadingPassword && <Spinner />}
        {/* Login button */}
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleLogin}
          disabled={isLoading}
        >
          Login
        </button>
        {/* Google authentication button */}
        <button
          type="button"
          className={styles.googleAuthButton}
          onClick={handleGoogleAuth}
        >
          <FontAwesomeIcon icon={faGoogle} /> {'    '}
          Sign in with Google
        </button>
        {/* Loading spinner */}
        {isLoading && <Spinner />}
      </form>
      {/* Register link */}
      <p className={styles.registerLink}>
        Don't have an account?{" "}
        <Link
          to="/register"
          onClick={() => {
            onClose(); // Close the login modal before navigating to /register
          }}
        >
          Register here
        </Link>
      </p>
    </div>
  );
}
