import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import animationStyles from "./animation.module.css";
import problemImg from "../../assets/problem.png";
import solutionImg from "../../assets/solution.png";
import MaidScreen from "../Maids/MaidScreen";
import AboutScreen from "../About/AboutScreen";
import BlogScreen from "../Blog/BlogScreen";
import ContactScreen from "../Contact/ContactScreen";
import { FaRegStar, FaUsers, FaWhatsapp } from "react-icons/fa";

/**
 * HomeScreen component displays the main landing page of the application.
 */
export default function HomeScreen() {
  return (
    <>
      <div className={styles.mainContainer}>
        {/* Flipping banner with problem and solution */}
        <div className={animationStyles.flipContainer}>
          <div className={animationStyles.flipper}>
            <div className={animationStyles.front}>
              <img src={problemImg} alt="problem-banner" />
            </div>
            <div className={animationStyles.back}>
              <img src={solutionImg} alt="solution-banner" />
            </div>
          </div>
        </div>
        
        {/* Additional information box */}
        <div className={styles.additionalInfoBox}>
          {/* Information about chat support, available maids, and customer reviews */}
          <aside className={styles.arrow}> <FaWhatsapp className={styles.whatsappIcon} /> 24 hours chat support</aside>
          <aside className={styles.arrow}> <FaUsers className={styles.usersIcon} /> 100 + maids available</aside>
          <aside className={styles.arrow}><FaRegStar className={styles.starIcon} /> 250 + customer reviews</aside>
        </div>

        {/* Messages section */}
        <div className={styles.messageContainer}>
          {/* Messages about maid cancellation */}
          <div className={styles.messageBox}>
            <p className={styles.messageContent}>
              Did your maid cancel at the last minute?? 😞 😞
            </p>
          </div>
          <div className={styles.messageBox}>
            <p className={styles.messageContent}>
              Mom is angry because the maid called off at the last minute!! 😡 😡
            </p>
          </div>
          <div className={styles.messageBox}>
            <p className={styles.messageContent}>
              Ohh No..The maid cancelled unexpectedly again!! 😔 😔
            </p>
          </div>
        </div>

        {/* Right container with background image and overlay text */}
        <div className={styles.rightContainer}>
          <div className={styles.backgroundImage}></div>
          <div className={styles.overlayText}>
            {/* Animated text */}
            <div className={animationStyles.roller}>
              <span className={animationStyles.rolltext}>
                Don't Worry!!
                <br />
                Maid's Are Online!!
                <br />
                Book Now!!
                <br />
                It's Hassle Free!!
                <br />
              </span>
            </div>
            {/* Link to login page */}
            <Link to="/maids" className={animationStyles.animatedButton}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Book A Maid
            </Link>
          </div>
        </div>
      </div>

      {/* Render MaidScreen, AboutScreen, BlogScreen, and ContactScreen components */}
      <MaidScreen />
      <AboutScreen />
      <BlogScreen />
      <ContactScreen />
    </>
  );
}
