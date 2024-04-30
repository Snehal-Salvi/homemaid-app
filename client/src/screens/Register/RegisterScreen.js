import React, { useState } from "react";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/userSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/spinner/Spinner";
import { BACKEND_URL } from "../../constants";
import Modal from "../../components/modal/Modal";
import LoginScreen from "../../screens/Login/LoginScreen";
import styles from "./registerScreen.module.css";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterScreen({ onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Function to open the login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Function to close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        // Call register mutation
        const res = await register({ name, email, password }).unwrap();
        // Dispatch action to set user credentials
        dispatch(setCredentials({ ...res }));
        // Navigate to maids page after successful registration
        navigate("/maids");
        // Show success message
        toast.success("Register Successful");
        // Close the register modal
        onClose();
      } catch (error) {
        // Show error message if registration fails
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  const handleGoogleAuth = () => {
    try {
      // Redirect to Google OAuth endpoint for registration
      window.location.href = `${BACKEND_URL}/auth/google/callback`;
    } catch (err) {
      // Show error message if Google OAuth fails
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className={styles.formContainer}>
        {/* Input fields for name, email, password, and confirm password */}
        {/* Controlled components with state hooks */}
        <div className={styles.formInput}>
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formInput}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {/* Button to submit registration form */}
        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleRegister}
          disabled={isLoading}
        >
          Register
        </button>
        {/* Button to initiate Google OAuth registration */}
        <button
          type="button"
          className={styles.googleAuthButton}
          onClick={handleGoogleAuth}
        >
          <FontAwesomeIcon icon={faGoogle} /> Sign up with Google
        </button>
        {/* Loading spinner while registration is in progress */}
        {isLoading && <Spinner />}
      </form>
      {/* Link to open login modal */}
      <p className={styles.signInLink}>
        Already have an account?{" "}
        <button className="text-blue-500" onClick={openLoginModal}>
          Sign In
        </button>
      </p>

      {/* Modal for login screen */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginScreen onClose={closeLoginModal} /> {/* Pass onClose function here */}
      </Modal>
    </div>
  );
}
