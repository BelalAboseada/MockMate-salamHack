import styles from "./style.module.scss";
import Banner1 from "../../assets/images/Banner1.png";
import Banner2 from "../../assets/images/Banner2.png";
import Banner3 from "../../assets/images/Banner3.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={styles.Home}>
      <div className={styles.container}>
        {/* Left Section (Text & Buttons) */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            Ace Your Next <br /> Interview With{" "}
            <span>
              AI- <br />
              Powered Practice!
            </span>
          </h1>
          <p className={styles.description}>
            Prepare with confidence using MockMate – your AI-driven interview
            coach that generates personalized questions, analyzes your
            responses, and helps you improve your interview skills.
          </p>
          <div className={styles.buttons}>
            <Link to="/interview" className={styles.primaryBtn}>
              Get Started
            </Link>
            <Link to="/interview" className={styles.secondaryBtn}>
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Section (Images) */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <div className={styles.backdrop} />
            <img
              src={Banner1}
              alt="Person wearing a VR headset for AI interview practice"
              className={styles.Banner1}
              loading="lazy"
            />
            <img
              src={Banner2}
              alt="Candidate working on a CV for an AI-powered mock interview"
              className={styles.Banner2}
              loading="lazy"
            />
            <img
              src={Banner3}
              alt="Your AI Interview Coach helping with practice questions"
              className={styles.Banner3}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
