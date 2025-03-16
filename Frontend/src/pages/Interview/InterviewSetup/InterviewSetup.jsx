import React, { useState } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";

const InterviewSetup = () => {
  const [position, setPosition] = useState("");
  const [roleLevel, setRoleLevel] = useState("");
  const [collegeDegree, setCollegeDegree] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ position, roleLevel, collegeDegree, note });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Interview Setup</h2>

        {/* Position Selection */}
        <label className={styles.label}>
          Position <span>*</span>
        </label>
        <input
          type="text"
          placeholder="Ex: Product design"
          className={styles.input}
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <div className={styles.tags}>
          {[
            "UI & UX Designer",
            "Full Stack",
            "SEO Manager",
            "Human Resource Management",
            "Sales Representative",
            "Front End Developer",
            "Marketing Coordinator",
            "Qa Engineer",
            "Project Manager",
          ].map((job) => (
            <button
              key={job}
              className={styles.tagButton}
              onClick={() => setPosition(job)}
            >
              {job}
            </button>
          ))}
        </div>

        {/* Role Level */}
        <label className={styles.label}>
          Role Level <span>*</span>
        </label>
        <select
          className={styles.input}
          value={roleLevel}
          onChange={(e) => setRoleLevel(e.target.value)}
        >
          <option value="">Select your role level</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        {/* College Degree */}
        <label className={styles.label}>College Degree</label>
        <input
          type="text"
          placeholder="Ex: Bachelor"
          className={styles.input}
          value={collegeDegree}
          onChange={(e) => setCollegeDegree(e.target.value)}
        />

        {/* Note */}
        <label className={styles.label}>Note</label>
        <textarea
          className={styles.textarea}
          placeholder=""
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.instructions}>
        {/* Instructions Box */}
        <h3>التعليمات</h3>
        <div className={styles.instructionsBox}>
          <ul>
            <li>
              سيتكون تقييم الفيديو هذا من 10 أسئلة ويجب أن يستغرق إكماله 30
              دقيقة، اعتمادًا على عدد الأسئلة المخصصة لك.
            </li>
            <li>يجب عليك إكمال تقييمك في جلسة واحدة.</li>
            <li>بمجرد طرح سؤالك الأول، يبدأ مؤقت تلقائي.</li>
            <li>تذكر أن تتابع المؤقت أثناء تحضير أو تسجيل إجابتك.</li>
            <li>
              ابحث عن مكان هادئ مع إضاءة كافية وخدمة WiFi قوية لإجراء التقييم
              الخاص بك.
            </li>
            <li className={styles.warning}>
              ⚠️ يرجى ملاحظة: لا تقم بتحديث الصفحة أو إغلاقها أو الخروج منها
              بمجرد بدء المقابلة، حيث لن يُسمح لك بالوصول إلى رابط المقابلة بعد
              الآن.
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <Link to={"/interview"}>
          <button
            className={styles.button}
            // onClick={handleSubmit}
          >
            Proceed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewSetup;
