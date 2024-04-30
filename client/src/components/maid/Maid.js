import React from "react";
import { Link } from "react-router-dom";
import styles from "./maid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faInfoCircle,
  faClock,
  faRupeeSign,
  faBook,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

// Maid component displays information about a maid.

export default function Maid({ maid }) {
  // Calculate the number of filled stars based on the rating
  const filledStars = [];
  for (let i = 0; i < Math.floor(maid.rating); i++) {
    filledStars.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }

  // Check if Category exists and is an array before joining
  const category =
    maid.category && Array.isArray(maid.category) ? maid.category : [];

  return (
    <>
      {/* Link to maid details page */}
      <Link to={`/maid/${maid._id}`} className={styles.maidCard}>
        <div>
          {/* Maid image */}
          <img src={maid.image} alt={maid.name} className={styles.maidImage} />

          {/* Maid name */}
          <div className={styles.maidName}>{maid.name}</div>

          {/* Maid rating */}
          <div className={styles.maidRating}>
            <div className={styles.ratingStars}>{filledStars}</div>
          </div>

          {/* Verification badge */}
          {maid.isVerified && <div className={styles.verificationBadge}></div>}

          {/* Maid services */}
          <div className={styles.maidServices}>
            {/* Maid categories */}
            <div className={styles.categories}>
              {category.map((cat, index) => (
                <div key={index} className={styles.categoryBox}>
                  {cat}
                </div>
              ))}
            </div>
            {/* Maid location */}
            <p>
              <FontAwesomeIcon icon={faLocationDot} /> {maid.location}
            </p>
            {/* Maid availability */}
            <p>
              <FontAwesomeIcon icon={faClock} /> {maid.time}
            </p>
            {/* Maid price */}
            <p>
              <FontAwesomeIcon icon={faRupeeSign} /> {maid.price}
            </p>
            {/* More info icon */}
            <FontAwesomeIcon
              icon={faInfoCircle}
              className={styles.moreInfoIcon}
            />{" "}
            More Info
          </div>

          {/* Book maid button */}
          <button className={styles.bookingButton}>
            <FontAwesomeIcon icon={faBook} /> Book Maid
          </button>
        </div>
      </Link>
    </>
  );
}
