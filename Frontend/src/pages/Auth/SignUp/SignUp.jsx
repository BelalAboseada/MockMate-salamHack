import styles from "./style.module.scss";
import signUpImage from "../../../assets/images/singUp.png";
import { useState, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/authSlice";
import Loader from "../../../components/Loader/Loader";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleShowPass = useCallback(() => {
    setShowPass((prev) => !prev);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!document.getElementById("agree")?.checked) return;

    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Account created successfully!");
        navigate("/");
        window.location.reload();
      }
    });
  };
  return (
    <div className={styles.signUp}>
      {/* {loading ? (
        <Loader />
      ) : ( */}
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
              name="userName"
              value={formData.userName}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
                title="Password must be 8-20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
                required
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
            <label
              htmlFor="agree"
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                className={`appearance-none   !w-4 !h-4 p-0  rounded border-2 border-gray-300  checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary `}
                type="checkbox"
                id="agree"
                name="agree"
                required
              />
              <span htmlFor="agree" className="text-sm font-medium mb-4">
                Agree with
                <span className="text-primary underline px-1">
                  terms & condition
                </span>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.signUp__btn}
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default SignUp;
