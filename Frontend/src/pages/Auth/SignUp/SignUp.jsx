import styles from "./style.module.scss";
import signUpImage from "../../../assets/images/singUp.png";

const SignUp = () => {
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
            />
            <input type="email" placeholder="Email Address" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <div className={`flex items-center gap-2 `}>
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className={`appearance-none   !w-4 !h-4 p-0  rounded border-2 border-gray-300  checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                placeholder=""
                value=""
              />
              <label
                htmlFor="agree"
                className={`text-sm font-medium  text-balance `}
              >
                Agree with  
                <span className="text-primary underline underline-offset-1 ">
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
