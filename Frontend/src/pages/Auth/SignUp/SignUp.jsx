import styles from "./style.module.scss";
import signUpImage from "../../../assets/images/singUp.png";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className={styles.SignUp}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            src={signUpImage}
            alt="signUpImage"
            className={styles.signUpImage}
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            aria-hidden="true"
          />
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>Create Account</h1>
          <form className={styles.form}>
            <input
              type="text"
              placeholder="Full name"
              className="input"
              name="name"
              id="name"
              autoComplete="on"
              required
              pattern="^[A-Za-z\s]+$"
              title="Please enter a valid name (only letters and spaces are allowed)."
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input"
              name="email"
              id="email"
              autoComplete="on"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              title="Please enter a valid email address."
            />
            <div className={styles.password}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="input"
                name="password"
                id="password"
                autoComplete="on"
                required
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                minLength="8"
                maxLength="20"
              />
              <span className={styles.icon} onClick={handleShowPass}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className={`flex items-center gap-2 `}>
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className={`appearance-none   !w-4 !h-4 p-0  rounded border-2 border-gray-300  checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary c`}
                placeholder=""
                value="agree"
                required
                aria-required="true"
              />
              <label
                htmlFor="agree"
                className={`text-sm font-medium  text-balance `}
              >
                Agree with
                <span className="text-primary underline underline-offset-1 px-1">
                  terms & condition
                </span>
              </label>
            </div>

            <button>Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
