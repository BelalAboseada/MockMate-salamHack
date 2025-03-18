import styles from "./style.module.scss";
import logoDesktop from "../../../assets/images/mockmate-logo.png";
import logoMobile from "../../../assets/images/Logo.png";
import { Link } from "react-router-dom";
import clsx from "classnames";
import { useSelector } from "react-redux";

export const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 w-full py-2 px-3 lg:px-[60px] flex items-center justify-between bg-white">
      {/* Logo */}
      <Link
        to="/"
        className={clsx(styles.logoContainer, "p-2")}
        aria-label="MockMate - Home"
      >
        <picture>
          <source
            media="(min-width: 1024px)"
            type="image/png"
            srcSet={logoDesktop}
          />
          <source
            media="(max-width: 768px)"
            type="image/png"
            srcSet={logoMobile}
          />
          <img
            src={logoDesktop}
            alt="MockMate Logo"
            className="h-6 w-auto"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
            aria-hidden="true"
            draggable="false"
          />
        </picture>
      </Link>

      {/* Sign In Button */}

      <div className={styles.authContainer}>
        {!user ? (
          <Link to="/signUp">
            <button className="text-lg font-bold py-2 px-2 lg:px-4 transition-colors hover:text-primary-500">
              Sign Up
            </button>
          </Link>
        ) : (
          <span>
            <span className="text-lg font-bold py-2 px-2 lg:px-4 transition-colors  ">
              Hi , <span className="text-primary">{user.userName}</span>
            </span>
          </span>
        )}
      </div>
    </header>
  );
};
