import React from "react";
import styles from "./about.module.css";
import cleaningImg from "../../assets/cleaning.png";
import deepCleaningImg from "../../assets/deepcleaning.png";
import specializedCleaningImg from "../../assets/specializedcleaning.png";
import experiencedImg from "../../assets/experienced.png";
import customizedImg from "../../assets/customized.png";
import reliableImg from "../../assets/reliable.png";

/**
 * AboutScreen component displays information about the cleaning services and reasons to choose the company.
 * It includes sections for different types of cleaning services offered and reasons to choose the company.
 */
export default function AboutScreen() {
  return (
    <div className={styles.container}>
      {/* Title */}
      <h1 className={styles.title}> &mdash; About Us &mdash;</h1>
      
      {/* Section: Cleaning Services */}
      <div className={styles.cardContainer}>
        {/* Regular Cleaning */}
        <div className={styles.card}>
          <img src={cleaningImg} alt="Regular Cleaning" className={styles.cardImg} />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Regular Cleaning</h2>
            <p className={styles.cardText}>Keep your home fresh and tidy with our regular cleaning services. We'll take care of all the essential tasks, including dusting, vacuuming, mopping, and more.</p>
          </div>
        </div>
        
        {/* Deep Cleaning */}
        <div className={styles.card}>
          <img src={deepCleaningImg} alt="Deep Cleaning" className={styles.cardImg} />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Deep Cleaning</h2>
            <p className={styles.cardText}>For a more thorough clean, our deep cleaning services are designed to tackle dirt, grime, and bacteria in every corner of your home. We'll scrub, sanitize, and disinfect to leave your space sparkling clean.</p>
          </div>
        </div>
        
        {/* Specialized Cleaning */}
        <div className={styles.card}>
          <img src={specializedCleaningImg} alt="Specialized Cleaning" className={styles.cardImg} />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Specialized Cleaning</h2>
            <p className={styles.cardText}>From move-in/move-out cleaning to post-renovation cleanup, we offer specialized cleaning services to meet your specific needs. Our team is equipped to handle any cleaning challenge, big or small.</p>
          </div>
        </div>
      </div>
      
      {/* Section: Why Choose Us */}
      <h2 className={styles.subtitle}>Why Choose Us?</h2>
      <div className={styles.cardContainer}>
        {/* Experienced Professionals */}
        <div className={styles.card}>
          <img src={experiencedImg} alt="Experienced Professionals" className={styles.cardImg} />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Experienced Professionals</h2>
            <p className={styles.cardText}>Our team consists of skilled and experienced cleaners who are passionate about delivering exceptional results.</p>
          </div>
        </div>
        
        {/* Customized Solutions */}
        <div className={styles.card}>
          <img src={customizedImg} alt="Customized Solutions" className={styles.cardImg} />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Customized Solutions</h2>
            <p className={styles.cardText}>We understand that every home is unique, which is why we offer customized cleaning solutions tailored to your preferences and requirements.</p>
          </div>
        </div>
        
        {/* Reliable Service */}
        <div className={styles.card}>
          <img src={reliableImg} alt="Reliable Service" className={styles.cardImg} />
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Reliable Service</h2>
            <p className={styles.cardText}>With Home Maid, you can always count on reliable and punctual service. We arrive on time and complete our work efficiently, leaving your home spotless every time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}  
