import styles from "./style.module.scss";
import signUpImage from "../../../assets/images/singUp.png";
import { useState, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleShowPass = useCallback(() => {
    setShowPass((prev) => !prev);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.signUp}>
      <div className={styles.signUp__container}>
        {/* Left Section */}
        <div className={styles.signUp__left}>
          <img
            src={signUpImage}
            alt="Sign up illustration"
            className={styles.signUp__image}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
        </div>

        {/* Right Section */}
        <div className={styles.signUp__right}>
          <h1 className={styles.signUp__title}>Create Account</h1>

          <form className={styles.signUp__form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full name"
              className={styles.form__input}
              name="name"
              id="name"
              autoComplete="name"
              required
              pattern="^[A-Za-z\s]+$"
              title="Please enter a valid name (only letters and spaces are allowed)."
            />

            <input
              type="email"
              placeholder="Email Address"
              className={styles.form__input}
              name="email"
              id="email"
              autoComplete="email"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address."
            />

            <div className={styles.signUp__password}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
                name="password"
                id="password"
                autoComplete="new-password"
                required
                // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                minLength="8"
                maxLength="20"
              />
              <button
                type="button"
                className={styles.togglePass}
                onClick={handleShowPass}
                aria-label="Toggle password visibility"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Terms & Conditions */}
            <div className={`flex items-center gap-2 `}>
              <input
                className={`appearance-none   !w-4 !h-4 p-0  rounded border-2 border-gray-300  checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary `}
                type="checkbox"
                id="agree"
                name="agree"
                value="agree"
                required
                aria-required="true"
              />
              <label
                htmlFor="agree"
                className={`text-sm font-medium  text-balance  mb-4 select-none`}
              >
                Agree with
                <span className="text-primary underline underline-offset-1 px-1">
                  terms & condition
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className={styles.signUp__btn}
              disabled={!document.getElementById("agree")?.checked}
              aria-disabled={!document.getElementById("agree")?.checked}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
