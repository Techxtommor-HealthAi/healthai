import { useState } from "react";

export default function MedicalHistory() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      title: "Chronic and Past Health Conditions",
      description:
        "Include any chronic conditions or medical issues experienced. Essential for understanding health history and personalized care.",
      options: ["No", "Yes"],
    },
    {
      id: 2,
      title: "Allergies",
      description:
        "Do you have any known allergies to medications, food, or other substances?",
      options: ["No", "Yes"],
    },
    {
      id: 3,
      title: "Current Medications",
      description:
        "Are you currently taking any prescribed or over-the-counter medications?",
      options: ["No", "Yes"],
    },
    {
      id: 4,
      title: "Family Medical History",
      description:
        "Is there a family history of any major illnesses or conditions?",
      options: ["No", "Yes"],
    },
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-11/12 md:w-2/3 lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-lg text-teal-600 font-semibold">
            MEDICAL HISTORY
          </h2>
          <p className="text-sm text-gray-500">
            {currentQuestion + 1}/{questions.length}
          </p>
        </div>

        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-gray-800">
            {questions[currentQuestion].title}
          </h3>
          <p className="text-gray-600 mt-2">
            {questions[currentQuestion].description}
          </p>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="bg-teal-100 hover:bg-teal-200 text-teal-700 font-semibold py-2 px-4 rounded-lg shadow transition"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`${
              currentQuestion === 0
                ? "bg-gray-300 text-gray-500"
                : "bg-teal-500 text-white hover:bg-teal-600"
            } font-semibold py-2 px-4 rounded-lg transition`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            className={`${
              currentQuestion === questions.length - 1
                ? "bg-gray-300 text-gray-500"
                : "bg-teal-500 text-white hover:bg-teal-600"
            } font-semibold py-2 px-4 rounded-lg transition`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
