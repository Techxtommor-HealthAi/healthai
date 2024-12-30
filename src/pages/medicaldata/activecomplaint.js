import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import questions from './questions.json';

const MedicalHistory = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cookies] = useCookies(['username']);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOptionSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        selected: option,
        details: option === "No" ? "" : (prev[questionId]?.details || "")
      }
    }));
  };

  const handleDetailChange = (questionId, details) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        details
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/activecomplaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: cookies.username, answers })
      });

      if (response.ok) {
        console.log('Active complaint added successfully');
        router.push('/');
      } else {
        throw new Error('Failed to save active complaint');
      }
    } catch (error) {
      console.error('Error saving active complaint:', error);
      alert('Error saving active complaint');
    }
  };

  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.title]) {
      acc[question.title] = [];
    }
    acc[question.title].push(question);
    return acc;
  }, {});

  if (!isClient) {
    return null;
  }

  if (showSummary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-300 p-6">
        <div className="w-11/12 md:w-2/3 lg:w-1/2 shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">Medical History Summary</h2>
          
          {Object.entries(groupedQuestions).map(([title, categoryQuestions]) => (
            <div key={title} className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h3>
              {categoryQuestions.map(question => (
                <div key={question.id} className="mb-4 pl-4">
                  <p className="text-gray-700 font-medium mb-2">{question.description}</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600">
                      Response: {answers[question.id]?.selected || "Not answered"}
                    </p>
                    {answers[question.id]?.selected === "Yes" && answers[question.id]?.details && (
                      <p className="text-gray-600 mt-2">
                        Details: {answers[question.id].details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          <button
            onClick={() => setShowSummary(false)}
            className="bg-teal-500 text-white hover:bg-teal-600 font-semibold py-2 px-4 rounded-lg transition w-full mt-4"
          >
            Edit Responses
          </button>
          <button
            onClick={handleSubmit}
            className="bg-teal-500 text-white hover:bg-teal-600 font-semibold py-2 px-4 rounded-lg transition w-full mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-300">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-lg text-teal-600 font-semibold">
            {questions[currentQuestion].title}
          </h2>
          <p className="text-sm text-gray-500">
            {currentQuestion + 1}/{questions.length}
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-lg">
            {questions[currentQuestion].description}
          </p>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(questions[currentQuestion].id, option)}
              className={`${
                answers[questions[currentQuestion].id]?.selected === option
                  ? "bg-teal-500 text-white"
                  : "bg-teal-100 text-teal-700 hover:bg-teal-200"
              } font-semibold py-2 px-4 rounded-lg shadow transition`}
            >
              {option}
            </button>
          ))}
        </div>

        {answers[questions[currentQuestion].id]?.selected === "Yes" && (
          <div className="mt-6">
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={questions[currentQuestion].detailPrompt}
              value={answers[questions[currentQuestion].id]?.details || ""}
              onChange={(e) => handleDetailChange(questions[currentQuestion].id, e.target.value)}
              rows={3}
            />
          </div>
        )}

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
            className="bg-teal-500 text-white hover:bg-teal-600 font-semibold py-2 px-4 rounded-lg transition"
          >
            {currentQuestion === questions.length - 1 ? "Show Summary" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;