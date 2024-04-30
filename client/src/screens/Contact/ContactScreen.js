import React from "react";
import styles from "./contact.module.css";
import { toast } from "react-toastify";

/**
 * ContactScreen component displays contact information and a form to send a message.
 */
export default function ContactScreen() {
  // Function to handle click event when "Send Now" button is clicked
  const handleSendNowClick = () => {
    // Display success message using toastify
    toast.success("Thanks for contacting us!");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> &mdash;  Contact Us &mdash;  </h1>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          {/* Address details */}
          <div className={`${styles.address} ${styles.details}`}>
            <i className="fas fa-map-marker-alt"></i>
            <div className={styles.topic}>Address</div>
            <div className={styles.textOne}>Mumbai, MB12</div>
            <div className={styles.textTwo}>MarineLines 06</div>
          </div>
          {/* Phone details */}
          <div className={`${styles.phone} ${styles.details}`}>
            <i className="fas fa-phone-alt"></i>
            <div className={styles.topic}>Phone</div>
            <div className={styles.textOne}>+0078 5678 5647</div>
            <div className={styles.textTwo}>+0096 3434 9893</div>
          </div>
          {/* Email details */}
          <div className={`${styles.email} ${styles.details}`}>
            <i className="fas fa-envelope"></i>
            <div className={styles.topic}>Email</div>
            <div className={styles.textOne}>homemaid@gmail.com</div>
            <div className={styles.textTwo}>snehalsalvi099@gmail.com</div>
          </div>
        </div>
        <div className={styles.rightSide}>
          {/* Send message form */}
          <div className={styles.topicText}>Send us a message</div>
          <p>
            Whether you need regular maintenance cleaning or a one-time deep clean,
            Home Maid is here to help. Contact us today to learn more about our
            services and schedule your first cleaning appointment.
          </p>
          <form action="#">
            {/* Input fields for name, email, and message */}
            <div className={styles.inputBox}>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div className={styles.inputBox}>
              <input type="text" placeholder="Enter your email"  />
            </div>
            <div className={styles.inputBox}>
              <textarea placeholder="Type your message" />
            </div>
            {/* Button to send the message */}
            <div className={styles.button}>
              <input type="button" value="Send Now" onClick={handleSendNowClick} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
