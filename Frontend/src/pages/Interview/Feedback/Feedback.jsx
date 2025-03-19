import React from "react";

const feedbackTips = [
  "يحتوي على توزيع طبيعي إلى حد ما للأحرف، على عكس استخدام",
  "استخدام طريقة لوريم إيبسوم لجعل توزيعها طبيعيًا",
  "هناك العديد من الاختلافات في مقاطع لوريم إيبسوم المتاحة، ولكن الأغلبية",
  "هناك العديد من الاختلافات في مقاطع لوريم إيبسوم المتاحة، ولكن الأغلبية",
  "حالة حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيشغل القارئ عن الشكل",
];

const Feedback = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-6 w-full max-w-5xl rounded-lg shadow">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm">
            Back End
          </button>
          <h2 className="text-center text-xl font-semibold">Feedback & Tips</h2>
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm">
            Completed
          </span>
        </div>

        {/* Progress Section */}
        <p className="text-center text-gray-600 mb-4">
          <span className="text-green-600 font-bold">60</span> / 100
        </p>

        {/* Timeline List */}
        <ol className="relative border-s border-gray-300">
          {feedbackTips.map((tip, index) => (
            <li key={index} className="mb-6 ms-4 relative">
              {/* Dot Indicator */}
              <div className="absolute w-3 h-3 bg-teal-500 rounded-full mt-1.5 -start-1.5 border border-white"></div>

              {/* Feedback Content */}
              <div
                className={`p-3 rounded-md shadow text-gray-700 ${
                  index % 2 === 0 ? "bg-blue-50" : "bg-yellow-50"
                }`}
              >
                {tip}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Feedback;
