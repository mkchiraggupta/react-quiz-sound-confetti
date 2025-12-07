"use client";
import React, { useRef, useState } from "react";
import confetti from "canvas-confetti";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    id: 3,
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
];

export default function QuizApp() {
    const buttonRef = useRef(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const playSound = (file) => {
    const audio = new Audio(file);
    audio.play().catch((err) => console.error("Sound play failed:", err));
  };

  const handleConfetti = () => {
    if (!buttonRef.current) return;

    // Get button position
    const rect = buttonRef.current.getBoundingClientRect();

    // Fire confetti from button center
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const correct = selectedOption === questions[currentQ].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      playSound("/sounds/win.mp3");
    //   setShowConfetti(true);
    handleConfetti();
    //   setTimeout(() => setShowConfetti(false), 3000);
    } else {
      playSound("/sounds/lost.mp3");
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        alert("Quiz Finished 🎉");
      }
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* {showConfetti && <Confetti />} */}

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {questions[currentQ].question}
        </h2>

        <div className="space-y-2">
          {questions[currentQ].options.map((option, idx) => (
            <label
              key={idx}
              className={`block p-2 border rounded-lg cursor-pointer transition-colors duration-200 
              ${
                selectedOption === option
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
                className="hidden"
              />
              {option}
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          ref={buttonRef}
          disabled={!selectedOption}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Submit
        </button>

        {isCorrect !== null && (
          <p
            className={`mt-3 text-center font-medium ${
              isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {isCorrect ? "✅ Correct Answer!" : "❌ Wrong Answer!"}
          </p>
        )}
      </div>
    </div>
  );
}
