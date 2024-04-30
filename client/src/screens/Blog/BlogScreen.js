import React from "react";
import styles from "./blog.module.css"; 
import clientImg from "../../assets/client.png"

/**
 * BlogScreen component displays a list of blogs and reviews from happy clients.
 */
export default function BlogScreen() {
  return (
    <div className={styles.container}>
      {/* Title */}
      <h1 className={styles.title}> &mdash;  Blogs &mdash;  </h1>
      
      {/* Section: Happy Clients */}
      <h2>Our Happy Clients</h2>
      <p className={styles.description}>
        Hear what our customers have to say about their experience with our
        homemade app!
      </p>
      
      {/* Review Section */}
      <div className={styles.reviewSection}>
        {/* Review Item 1 */}
        <div className={styles.reviewItem}>
          <div className={styles.top}>
            <div className={styles.clientImage}>
              <img src={clientImg} alt="" />
              <span>Mary Johnson</span>
            </div>
          </div>
          <article>
            <p className={styles.review}>
              "I absolutely love this homemade app! It's made my life so much
              easier. I use it to find maids at they are just available in no time!"
            </p>
            <p>March 15, 2024</p>
          </article>
        </div>
        
        {/* Review Item 2 */}
        <div className={styles.reviewItem}>
          <div className={styles.top}>
            <div className={styles.clientImage}>
              <img src={clientImg} alt="" />
              <span>John Smith</span>
            </div>
          </div>
          <article>
            <p className={styles.review}>
              "As someone who loves to clean but struggles with organization,
              this app has been a game-changer for me. It's intuitive to use and
              has helped me a lot."
            </p>
            <p>April 02, 2024</p>
          </article>
        </div>
        
        {/* Review Item 3 */}
        <div className={styles.reviewItem}>
          <div className={styles.top}>
            <div className={styles.clientImage}>
              <img src={clientImg} alt="" />
              <span>Amy Williams</span>
            </div>
          </div>
          <article>
            <p className={styles.review}>
              "I've been using this homemade app for a few months now, and I'm
              impressed with how it continues to improve. The developers are
              responsive to feedback, and I appreciate the regular updates."
            </p>
            <p>April 10, 2024</p>
          </article>
        </div>
      </div>
    </div>
  );
}
