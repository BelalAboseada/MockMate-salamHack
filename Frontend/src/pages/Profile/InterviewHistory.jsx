import React, { useEffect, useState } from "react";
import styles from "./InterviewTable.module.scss";
import { Link } from "react-router-dom";
import interviewService from "../../services/InterviewSerice";
import Loader from "../../components/Loader/Loader";

const InterviewHistory = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await interviewService.getInterviewHistory();
        console.log(response.data.interviews);
        setInterviews(response.data.interviews);
      } catch (err) {
        setError("Failed to fetch interview history");
        console.error("Error fetching interview history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className={`${styles.container} w-full max-w-5xl`}>
        <h2
          className="text-center font-semibold mb-4"
          style={{ color: "rgba(101, 101, 101, 1)" }}
        >
          Review Your Previous Interviews And Feedback
        </h2>

        {loading ? (
          <Loader />
        ) : (
          <div className="border-gray-300 mt-20 m-auto">
            {interviews.length > 0 ? (
              interviews.map((interview, index) => (
                <div
                  key={index}
                  className={`flex flex-col gap-1 md:flex-row md:justify-between p-4 ${
                    index !== interviews.length - 1 && "border-b"
                  } border-gray-200`}
                >
                  <span className="text-gray-700">
                    {interview.position || "N/A"}
                  </span>
                  <span className="text-gray-500 font-medium">
                    {interview.isCompleted ? interview.total_score : 0}{" "}
                    <span className="text-gray-800">/100</span>
                  </span>
                  <span className="text-gray-500">
                    {formatDate(interview.createdAt) || "N/A"}
                  </span>
                  <span
                    className={`${styles.status} ${
                      interview.isCompleted
                        ? styles.completed
                        : styles.uncompleted
                    }`}
                  >
                    {interview.isCompleted ? "Completed" : "Un Completed"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No interview history available.
              </p>
            )}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link to="/interview/setup" className={styles.button}>
            Start a new interview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewHistory;
