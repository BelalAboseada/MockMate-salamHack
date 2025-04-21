import { useNavigate, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineAudio } from "react-icons/ai";
import WarningPopup from "../../../components/UI/popup/WarningPopup";
import interviewService from "../../../services/InterviewSerice";
import Loader from "../../../components/Loader/Loader";

const Interview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { interviewId, interviewQA } = location.state;

  // Store current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [answers, setAnswers] = useState([...interviewQA]); // Deep copy to avoid modifying state directly
  const [Loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // Handle input change
  const handleInputChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion].answer = e.target.value || "";
    setAnswers(updatedAnswers);
  };

  // Handle submit
  const handleSubmit = useCallback(async () => {
    const formattedAnswers = answers.map(({ _id, number, answer }) => ({
      questionId: _id,
      number,
      answer: answer || "Not answered yet",
    }));
  

    try {
      setLoading(true);
      const res = await interviewService.submitInterview(interviewId, {
        answers: formattedAnswers,
      });
    
      setLoading(false);
      navigate("/interview/Feedback", {
        state: { feedback: res.data.interview },
      });
    } catch (error) {
      console.error("Error submitting interview:", error);
      setLoading(false);
    }
  }, [answers]);

  // Handle navigation
  const handleNext = () => {
    if (currentQuestion < interviewQA.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // countdown  effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleSubmit(); // Auto-submit on timeout
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="flex flex-col items-center py-4 md:p-6">
      {Loading ? (
        <Loader />
      ) : (
        <div className="w-full md:max-w-5xl bg-white rounded-lg p-3 md:p-6">
          <div
            className={`absolute top-8 right-8 text-sm md:text-base bg-gray-100 px-4 py-2 rounded-md shadow-md ${
              timeLeft > 10 * 60 ? "text-success" : "text-red-600"
            }  font-semibold z-10`}
          >
            ⏱ Time Left: {formatTime(timeLeft)}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-4">
            <button
              className={`text-Neutral-700 hover:text-Neutral-600 cursor-pointer ${
                currentQuestion === 0 ? "opacity-0" : "opacity-100"
              }`}
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              &larr; Q {currentQuestion}
            </button>

            <span className="text-lg font-semibold">
              {currentQuestion + 1}{" "}
              <span
                className={`${
                  currentQuestion + 1 === interviewQA.length
                    ? "text-Neutral-700"
                    : "text-Neutral"
                }`}
              >
                /{interviewQA.length}
                <span className="hidden md:block">Question</span>
              </span>
            </span>

            <button
              className={`px-4 md:px-6 py-2 rounded-2xl text-sm md:text-base ${
                currentQuestion + 1 === interviewQA.length
                  ? "text-primary-700 bg-primary-100"
                  : "bg-red-100 text-red-600"
              }`}
              onClick={
                currentQuestion + 1 === interviewQA.length
                  ? handleSubmit()
                  : () => setPopupOpen(true)
              }
            >
              End & Review
            </button>

            <WarningPopup
              isOpen={isPopupOpen}
              onClose={() => setPopupOpen(false)}
              onConfirm={handleSubmit}
              title={"Are You Sure You Want To End This Interview?"}
              sub_title={"You Will Lose Your Progress"}
              btn={"End"}
            />
          </div>

          {/* Question & Answer Section */}
          <div
            className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center"
            style={{ background: "rgba(253, 253, 253, 1)" }}
          >
            <h2 className="text-xl font-semibold mb-4" dir="rtl">
              {interviewQA[currentQuestion].question} ؟
            </h2>

            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-700 placeholder:text-left"
              placeholder="Type your answer"
              value={answers[currentQuestion]?.answer || ""}
              dir="rtl"
              rows="10"
              cols="50"
              onChange={handleInputChange}
            />

            {/* Voice Input Button
          <div className="flex flex-col items-center mt-4">
            <span className="text-gray-500 mb-2">Or</span>
            <button className="p-3 bg-gray-200 rounded-full">
              <AiOutlineAudio size={24} className="text-gray-600" />
            </button>
          </div> */}
          </div>

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              className="mt-6 bg-primary select-none text-white px-10 py-2 rounded-lg hover:bg-primary-700"
              onClick={handleNext}
            >
              {currentQuestion < interviewQA.length - 1 ? "Next" : "Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
