import React, { useState } from "react";
import styles from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
// import { submitAnswer, finishQuiz } from "../redux/quizSlice";
import { AiOutlineAudio } from "react-icons/ai";
import WarningPopup from "../../../components/UI/popup/WarningPopup";

const questions = [
  "وضح الفرق بين HTTP GET و HTTP POST؟",
  "ما هو RESTful API؟",
  "كيف يعمل التوثيق في HTTP؟",
  "ما هو CORS؟",
  "ما هو JWT؟",
  "ما هو JSON Web Token؟",
  "ما هو JSON Web Signature؟",
  "ما هو JSON Web Encryption؟",
  "ما هو JSON Web Key؟",
  "ما هو JSON Web Token (JWT)؟",
];

const Interview = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));

  const handleInputChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // dispatch(finishQuiz(answers));
    }
  };
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-5xl bg-white  rounded-lg p-6  ">
        <div className="flex justify-between items-center mb-4">
          <button
            className=" text-Neutral-700 select-none hover:text-Neutral-600 disabled:opacity-50 disabled:cursor-not-allowed  cursor-pointer"
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            &larr; Back End
          </button>
          <span className="text-lg font-semibold">
            {currentQuestion + 1}{" "}
            <span
              className={` ${
                currentQuestion + 1 === questions.length
                  ? "text-Neutral-700"
                  : "text-Neutral"
              }`}
            >
              /{questions.length} Question
            </span>
          </span>
          <button
            className={`${
              currentQuestion + 1 === questions.length
                ? "text-primary-700 bg-primary-100 "
                : "bg-red-100  text-red-600 "
            } px-6 py-2 rounded-2xl `}
            onClick={() => setPopupOpen(true)}
          >
            End & Review
          </button>
          <WarningPopup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onConfirm={() => {
              setPopupOpen(false);
              console.log("Interview Ended");
            }}
          />
        </div>
        <div
          className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center"
          style={{
            background: "rgba(253, 253, 253, 1)",
          }}
        >
          <h2 className="text-xl font-semibold mb-4" dir="rtl">
            {questions[currentQuestion]}
          </h2>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-700 placeholder:text-left"
            placeholder="Type your answer"
            value={answers[currentQuestion]}
            dir="rtl"
            rows="10"
            cols="50"
            onChange={handleInputChange}
          ></textarea>
          <div className="flex flex-col items-center mt-4">
            <span className="text-gray-500 mb-2">Or</span>
            <button className="p-3 bg-gray-200 rounded-full">
              <AiOutlineAudio size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-6 bg-primary text-white px-10 py-2 rounded-lg hover:bg-primary-700"
            onClick={handleSubmit}
          >
            {currentQuestion < questions.length - 1 ? "Next" : "Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
