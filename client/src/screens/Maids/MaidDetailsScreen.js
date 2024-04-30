import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetMaidDetailsQuery } from '../../slices/maidsApiSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/Spinner';
import styles from './maidsDetails.module.css';
import Modal from '../../components/modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBook, faClock, faLocationDot, faRupeeSign, faStar } from '@fortawesome/free-solid-svg-icons';
import BookingForm from '../BookingForm/BookingForm';
import { useSelector } from 'react-redux';

const MaidDetailsScreen = () => {
  const { id: maidId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: maid, isLoading, error } = useGetMaidDetailsQuery(maidId);
  const { userInfo } = useSelector((state) => state.user);

  // Show loading spinner while fetching maid details
  if (isLoading) {
    return <Spinner />;
  }

  // Show error message if there's an error fetching maid details
  if (error) {
    toast.error(error?.data?.message || error?.error);
  }

  // Fill stars based on maid's rating
  const filledStars = [];
  for (let i = 0; i < Math.floor(maid.rating); i++) {
    filledStars.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }

  // Toggle modal for booking maid
  const toggleModal = () => {
    if (userInfo) {
      setIsModalOpen(prevState => !prevState);
    } else {
      toast.error('Please login first to book.');
    }
  };

 // Render maids once data is loaded
return (
  <div className={styles.maidDetails}>
    {/* Link to go back to maids page */}
    <Link to={'/maids'} className={styles.goBackButton}>
      <FontAwesomeIcon icon={faArrowLeft} className={styles.arrowIcon} />
      Go Back
    </Link>

      {/* Maid details */}
      <div className={styles.maidDetailsContainer}>
        <div className={styles.profileContainer}>
          {/* Show verification badge if maid is verified */}
          {maid.isVerified && <div className={styles.verificationBadge}></div>}
          <img src={maid.image} alt={maid.name} className={styles.profileImage} />
        </div>
        <div className={styles.maidInfo}>
          <h1 className={styles.maidName}>{maid.name}</h1>
          <p className={styles.maidDescription}>{maid.description}</p>
          <div className={styles.maidRating}>
            <div className={styles.ratingStars}>{filledStars}</div>
            <span>({maid.numReviews} reviews)</span>
          </div>

          <div className={styles.priceAndAvailability}>
            <p className={styles.maidPrice}>
              <FontAwesomeIcon icon={faRupeeSign} /> {maid?.price?.toFixed(2)}
            </p>
            <p className={styles.maidLocation}>
              <FontAwesomeIcon icon={faLocationDot} /> {maid.location}
            </p>
            <p className={styles.maidAvailability}>
              <FontAwesomeIcon icon={faClock} /> Available Time: {maid.time}
            </p>
          </div>

          {/* Display maid categories */}
          <div className={styles.maidCategories}>
            {maid.category.map((cat, index) => (
              <div key={index} className={styles.categoryBox}>
                {cat}
              </div>
            ))}
          </div>

          {/* Button to book maid */}
          <button className={styles.bookMaidButton} onClick={toggleModal}>
            <FontAwesomeIcon icon={faBook} /> Book Me
          </button>
        </div>
      </div>

      {/* Modal for booking form */}
      {userInfo && (
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
          <BookingForm onClose={toggleModal} maidName={maid.name} maidPrice={maid.price} maidImage={maid.image} />
        </Modal>
      )}
    </div>
  );
};

export default MaidDetailsScreen;
