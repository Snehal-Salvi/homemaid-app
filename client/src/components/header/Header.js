import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/userSlice";
import logo from "../../assets/logo.png";
import styles from "./header.module.css";
import Modal from "../../components/modal/Modal";
import LoginScreen from "../../screens/Login/LoginScreen";

/**
 * Header component displays the header section of the application.
 * It includes the app logo, app name, navigation links, and user authentication buttons.
 */
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Open the login modal
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Close the login modal
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // Handle logout action
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      setIsProfileMenuOpen(false);
      setIsAdminMenuOpen(false);
      navigate("/");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  // Render user profile button
  const renderProfileButton = () => {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="nav-link fs-5 font-weight-bold"
          aria-expanded={isProfileMenuOpen ? "true" : "false"}
        >
          <FaUser className="mr-1" />
          {userInfo?.name}
          {isProfileMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
        </button>
        <ul
          className={`dropdown-menu ${isProfileMenuOpen ? "show" : ""}`}
          style={{
            position: "absolute",
            right: 0,
            top: "100%",
            zIndex: 1000,
          }}
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              <FaUser className="mr-2" />
              Profile
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" onClick={handleLogout}>
              <FaSignOutAlt className="mr-1" />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  // Render admin actions button
  const renderAdminButton = () => {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          className="nav-link fs-5 font-weight-bold"
          aria-expanded={isAdminMenuOpen ? "true" : "false"}
        >
          Actions
          {isAdminMenuOpen ? <FaCaretUp /> : <FaCaretDown />}
        </button>
        <ul className={`dropdown-menu ${isAdminMenuOpen ? "show" : ""}`}>
          <li>
            <Link className="dropdown-item" to="/admin/users">
              Users
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/products">
              Maids
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" to="/admin/orders">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container-fluid">
        <img className={styles.appLogo} src={logo} alt="Homemaid-logo" />
        <Link className={`navbar-brand ${styles.appName}`} to="/">
          HOMEMAID
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Navigation links */}
            {!userInfo && (
              <>
                <li className="nav-item">
                  <Link className={`${styles.navLink} nav-link fs-5`} to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${styles.navLink} nav-link fs-5`}
                    to="/maids"
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${styles.navLink} nav-link fs-5`}
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${styles.navLink} nav-link fs-5`}
                    to="/blogs"
                  >
                    Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${styles.navLink} nav-link fs-5`}
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </>
            )}
            {/* User authentication buttons */}
            {userInfo && (
              <>
                <li className="nav-item">
                  <Link
                    className={`${styles.navLink} nav-link fs-5`}
                    to="/maids"
                  >
                    Book Maid
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`${styles.navLink} nav-link fs-5`}
                    to="/myorders"
                  >
                    My orders
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="relative group">{renderProfileButton()}</div>
                </li>
                {userInfo.isAdmin && (
                  <li className="nav-item">
                    <div className="relative group">{renderAdminButton()}</div>
                  </li>
                )}
              </>
            )}
            {/* Login button */}
            {!userInfo && (
              <li className="nav-item">
                <button
                  className={`${styles.loginButton} nav-link fs-5`}
                  onClick={openLoginModal}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* Login modal */}
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginScreen onClose={closeLoginModal} />
      </Modal>
    </nav>
  );
}

export default Header;
