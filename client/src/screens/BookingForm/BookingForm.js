import React, { useState } from "react";
import { useCreateOrderMutation } from "../../slices/orderApiSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./BookingForm.module.css";

/**
 * BookingForm component allows users to book a maid by providing their information, address details, and selecting booking date and time.
 * @param {Object} props - Component props
 * @param {string} props.maidName - Name of the maid
 * @param {number} props.maidPrice - Price of the maid's service
 * @param {string} props.maidImage - URL of the maid's image
 * @param {Function} props.onClose - Function to close the booking form modal
 */
const BookingForm = ({ maidName, maidPrice, maidImage, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
    bookingDate: "",
    maid: maidName,
  });

  const { userInfo } = useSelector((state) => state.user);

  const [createOrder] = useCreateOrderMutation();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if address fields are empty
    const addressFields = ['address', 'postalCode'];
    const isAddressEmpty = addressFields.some((field) => formData[field].trim() === '');

    if (isAddressEmpty) {
      toast.error('Address fields are required to book an order');
      return;
    }
  
    try {
      const formDataWithUser = {
        ...formData,
        user: userInfo._id,
        // Include maid details in orderItems
        orderItems: [{
          maid: maidName,
          price: maidPrice,
          image: maidImage
        }]
      };
  
      const response = await createOrder(formDataWithUser);
  
      if (response.error) {
        console.error("Error creating order:", response.error);
      } else {
        console.log("Order created successfully:", response.data);
  
        toast.success("Order created successfully");
        onClose();
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle errors appropriately (e.g., display error message)
    }
  };
  

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Book Maid</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Your Information</h3>
          <div className={styles.inputField}>
            <label className={styles.label}>Your Name:</label>
            <input
              type="text"
              name="name"
              className={styles.input}
              value={userInfo.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputField}>
            <label className={styles.label}>Your Email:</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              value={userInfo.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Address Details</h3>
          <div className={styles.inputField}>
            <label className={styles.label}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} /> Address:
            </label>
            <input
              type="text"
              name="address"
              className={styles.input}
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputField}>
            <label className={styles.label}>
              <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} /> Postal Code:
            </label>
            <input
              type="text"
              name="postalCode"
              className={styles.input}
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputField}>
            <label className={styles.label}>
              <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} /> Booking Date and Time:
            </label>
            <input
              type="datetime-local"
              name="bookingDate"
              className={styles.input}
              value={formData.bookingDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.box}>
          <h3 className={styles.boxTitle}>Maid Details</h3>
          <div className={styles.inputField}>
            <img src={maidImage} alt="Maid" className={styles.maidImage} />
          </div>

          <div className={styles.inputField}>
            <label className={styles.label}>Maid Name:</label>
            <p className={styles.maidName}>{maidName}</p>
          </div>

          <div className={styles.inputField}>
            <label className={styles.label}>Price:</label>
            <p className={styles.maidPrice}>${maidPrice}</p>
          </div>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.submitButtonContainer}>
            <button type="submit" className={styles.submitButton}>
              Book Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
