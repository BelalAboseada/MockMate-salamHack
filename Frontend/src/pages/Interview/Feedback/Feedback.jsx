import { Link, useLocation } from "react-router-dom";

const Feedback = () => {
  const location = useLocation();
  const { feedback } = location.state;
 

  return (
    <div className="flex justify-center items-center p-1 md:p-6">
      <div className="bg-white p-3 md:p-6 w-full max-w-5xl">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-100 text-gray-600 px-2 md:px-4 py-1 rounded-3xl text-xs md:text-sm">
            {feedback.position}
          </button>
          <h2 className="text-center text-base md:text-xl font-semibold">
            Feedback & Tips
          </h2>
          <span
            className="px-2 md:px-4 py-2 rounded-2xl text-xs md:text-sm"
            style={{
              color: feedback.isCompleted
                ? "rgba(27, 123, 126, 1)"
                : "var(--error-color)",
              backgroundColor: feedback.isCompleted
                ? "rgba(27, 123, 126, 0.1)"
                : "rgba(255, 0, 0, 0.1)",
            }}
          >
            {feedback.isCompleted ? "Completed" : "Ongoing"}
          </span>
        </div>

        {/* Progress Section */}
        <p className="text-center text-gray-600 bg-gray-100 py-1 rounded-xl w-fit px-4   my-10 mx-auto ">
          <span
            className={`${
              feedback.total_score >= 80
                ? "text-green-600"
                : feedback.total_score >= 60
                ? "text-yellow-600"
                : "text-red-600"
            } font-bold`}
          >
            {feedback.total_score}
          </span>{" "}
          / 100
        </p>
        {/* Feedback Tips */}
        <div className="w-full mx-auto mt-6" dir="rtl">
          {Array.isArray(feedback.feedbackTips) &&
            feedback.feedbackTips.length > 0 &&
            Object.keys(feedback.feedbackTips[0]).map((status) => (
              <div key={status} className="relative">
                {/* Vertical Line */}
                <div
                  className={`absolute -right-3 top-1 h-full w-0.5 ${
                    status === "good"
                      ? "bg-green-200"
                      : status === "medium"
                      ? "bg-yellow-200"
                      : "bg-red-300"
                  }`}
                ></div>

                <ul className="relative w-full ps-7">
                  {/* Status Circle */}
                  {Array.isArray(feedback.feedbackTips[0][status]) &&
                    feedback.feedbackTips[0][status].length > 0 && (
                      <div
                        className={`absolute w-3 h-3 ${
                          status === "good"
                            ? "bg-green-500"
                            : status === "medium"
                            ? "bg-yellow-300"
                            : "bg-red-400"
                        } rounded-full top-1 right-[-17px]`}
                      ></div>
                    )}
                  {/* List Items */}
                  {Array.isArray(feedback.feedbackTips[0][status]) &&
                    feedback.feedbackTips[0][status].map(
                      (tip, index, array) => (
                        <li
                          key={tip._id}
                          className={`mb-4 flex items-center font-medium text-lg ${
                            status === "good"
                              ? "bg-green-100"
                              : status === "medium"
                              ? "bg-yellow-100"
                              : "bg-red-100"
                          } py-2 px-3 rounded-3xl text-gray-800 shadow-sm`}
                        >
                          <p>{tip.tip}</p>
                        </li>
                      )
                    )}

                  {/* End Circle - Only for the last item in each status */}
                  {Array.isArray(feedback.feedbackTips[0][status]) &&
                    feedback.feedbackTips[0][status].length > 0 && (
                      <div
                        className={`absolute w-3 h-3 ${
                          status === "good"
                            ? "bg-green-500"
                            : status === "medium"
                            ? "bg-yellow-300"
                            : "bg-red-400"
                        } rounded-full -bottom-2 right-[-17px]`}
                      />
                    )}
                </ul>
              </div>
            ))}
        </div>

        {/* new interview btn */}
        <Link to={"/interview/setup"} className="flex justify-center mt-20 ">
          <button className="bg-primary text-white px-6 py-2 rounded-md">
            New interview
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Feedback;
