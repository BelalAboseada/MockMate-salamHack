import styles from "../SignUp/style.module.scss";
import signUpImage from "../../../assets/images/singUp.png";
import { useState, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../../redux/authSlice";
import Loader from "../../../components/Loader/Loader";

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  console.log(useSelector((state) => state.auth));
  

  const handleShowPass = useCallback(() => {
    setShowPass((prev) => !prev);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Account created successfully!");
        navigate("/");
        window.location.reload();
      }
    });
    setFormData({
      email: "",
      password: "",
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
                autoComplete="current-password"
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

            {/* Error Message */}
            {error && (
              <p className={`text-center text-sm text-red-500`}>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.signUp__btn}
              disabled={loading}
              aria-disabled={loading}
            >
              Sign In
            </button>
            <p className={`text-center text-sm text-gray-500`}>
              don’t have an account? 
              <Link
                to="/signUp"
                className={`underline underline-offset-1 text-primary`}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default SignIn;
