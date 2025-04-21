import styles from "./style.module.scss";
import logoDesktop from "../../../assets/images/mockmate-logo.png";
import logoMobile from "../../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import clsx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";
import { useState } from "react";
import WarningPopup from "../../UI/popup/WarningPopup";

export const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/signIn");
  };

  return (
    <>
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
            <div className="flex items-center  gap-7">
              <Link to={"/profile/interview/history"}>interviews history</Link>
              <button
                className="text-base font-medium py-2 px-2 lg:px-4 transition-colors text-gray-300 hover:text-black rounded-2xl "
                onClick={() => setPopupOpen(true)}
                aria-label="Logout"
              >
                Logout
              </button>
            </div>

            // <Link to={"/profile/interview/history"}>
            //   <span
            //     className={`text-lg font-bold py-2 px-2 lg:px-4 transition-colors  ${styles.profile}`}
            //   >
            //     Hi , <span className="text-primary">{user.userName}</span>
            //   </span>
            // </Link>
          )}
        </div>
        <WarningPopup
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleLogout}
          title={"Are You Sure You Want To Logout?"}
          btn={"Logout"}
        />
      </header>
      {/* 
      <div className={`  ${styles.profilePopover}`}>       
          interviews History
        <button className="text-lg font-bold py-2 px-2 lg:px-4 transition-colors hover:text-primary-500">
          Logout
        </button>
      </div> 
      */}
    </>
  );
};
