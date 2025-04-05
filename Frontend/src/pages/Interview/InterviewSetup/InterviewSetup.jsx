import { useNavigate } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
import interviewService from "../../../services/InterviewSerice";
import { toast } from "react-toastify";
import Loader from "../../../components/Loader/Loader";

const InterviewSetup = () => {
  const [position, setPosition] = useState("");
  const [experience_years, setExperience_years] = useState("");
  const [degree, setDegree] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const jobTitles = useMemo(
    () => [
      "UI & UX Designer",
      "Full Stack",
      "SEO Manager",
      "Human Resourcpe Management",
      "Sales Representative",
      "Front End Developer",
      "Marketing Coordinator",
      "QA Engineer",
    ],
    []
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!position || !experience_years) {
        toast.error("Position and Role Level are required!");
        return;
      }

      setLoading(true);
      try {
        const response = await interviewService.postInterviewSetup({
          position,
          experience_years,
          degree,
          note,
        });
        console.log(response);

        if (response.status === 202) {
          toast.success("Interview setup successful!");
          navigate("/interview", {
            state: {
              interviewId: response.data.interview._id,
              interviewQA: response.data.interview.interviewQA,
            },
          });
        }

        setPosition("");
        setExperience_years("");
        setDegree("");
        setNote("");
      } catch (error) {
        toast.error("Error setting up interview. Please try again.");
        console.error("Error setting up interview:", error);
      } finally {
        setLoading(false);
      }
    },
    [position, experience_years, degree, note, navigate]
  );

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className={styles.formContainer} onSubmit={handleSubmit}>
            {/* Position Selection */}
            <label className={styles.label}>
              Position <span>*</span>
            </label>
            <input
              type="text"
              id="position"
              placeholder="Ex: Product Designer"
              className={styles.input}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />

            <div className={styles.tags}>
              {jobTitles.map((job) => (
                <button
                  key={job}
                  className={styles.tagButton}
                  onClick={() => setPosition(job)}
                  type="button"
                >
                  {job}
                </button>
              ))}
            </div>

            {/* Role Level */}
            <label htmlFor="experience_years" className={styles.label}>
              Role Level <span>*</span>
            </label>
            <select
              className={styles.input}
              value={experience_years}
              onChange={(e) => setExperience_years(e.target.value)}
              required
              id="experience_years"
              aria-describedby="experience_years-desc"
            >
              <option value="">Select your role level</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>

            {/* College Degree */}
            <label htmlFor="degree" className={styles.label}>
              College Degree <span>*</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Bachelor"
              className={styles.input}
              value={degree}
              required
              onChange={(e) => setDegree(e.target.value)}
              name="degree"
              id="degree"
            />

            {/* Note */}
            <label htmlFor="note" className={styles.label}>
              Note <span>*</span>
            </label>
            <textarea
              className={styles.textarea}
              placeholder=""
              value={note}
              onChange={(e) => setNote(e.target.value)}
              name="note"
              id="note"
              required
              form="note"
              aria-labelledby="note"
              aria-describedby="note"
            ></textarea>
            <button
              className={styles.button}
              disabled={loading}
              type={"submit"}
            >
              Proceed
            </button>
          </form>

          <div className={styles.instructions}>
            {/* Instructions Box */}
            <h3 className={styles.instructionsTitle}>التعليمات</h3>
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
                  ابحث عن مكان هادئ مع إضاءة كافية وخدمة WiFi قوية لإجراء
                  التقييم الخاص بك.
                </li>
                <li>جميع نتائج المقابلات سوف تجدها في الصفحة الخاصه بك</li>
                <li className={styles.warning}>
                  يرجى ملاحظة: لا تقم بتحديث الصفحة أو إغلاقها أو الخروج منها
                  بمجرد بدء المقابلة، حيث لن يُسمح لك بالوصول إلى رابط المقابلة
                  بعد الآن.
                </li>
              </ul>
            </div>

            {/* Submit Button */}
          </div>
        </>
      )}
    </div>
  );
};

export default InterviewSetup;
