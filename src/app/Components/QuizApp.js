"use client";
import React, { useRef, useState, useEffect } from "react";
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
  {
    id: 4,
    question: "What is React?",
    options: [
      "A database",
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A CSS framework",
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
  },
  {
    id: 5,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctAnswer: "<a>",
  },
  {
    id: 6,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperText and Links Markup Language",
      "Home Tool Markup Language",
    ],
    correctAnswer: "HyperText Markup Language",
  },
  {
    id: 7,
    question: "Which method is used to add an element to the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
  },
  {
    id: 8,
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["variable x = 5;", "var x = 5;", "v x = 5;", "x := 5;"],
    correctAnswer: "var x = 5;",
  },
];

export default function QuizApp() {
    const buttonRef = useRef(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(5);
  const [isTimerActive, setIsTimerActive] = useState(true);

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || showResults) return;

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // Timer expired - auto-submit with no answer (marked as wrong)
      if (!selectedOption) {
        setIsCorrect(false);
        playSound("/sounds/lost.mp3");
        
        setTimeout(() => {
          setSelectedOption(null);
          setIsCorrect(null);
          if (currentQ < questions.length - 1) {
            setCurrentQ((prev) => prev + 1);
            setTimer(5);
            setIsTimerActive(true);
          } else {
            setShowResults(true);
          }
        }, 2000);
      }
    }
  }, [timer, isTimerActive, showResults, selectedOption, currentQ]);

  // Reset timer when question changes
  useEffect(() => {
    if (!showResults) {
      setTimer(5);
      setIsTimerActive(true);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [currentQ, showResults]);

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

    setIsTimerActive(false); // Stop timer when submitting
    const correct = selectedOption === questions[currentQ].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore((prev) => prev + 1);
      playSound("/sounds/win.mp3");
      handleConfetti();
    } else {
      playSound("/sounds/lost.mp3");
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setTimer(5);
        setIsTimerActive(true);
      } else {
        setShowResults(true);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
    setTimer(5);
    setIsTimerActive(true);
  };

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">Quiz Completed! 🎉</h2>
          
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2 text-blue-600">
              {score}/{questions.length}
            </div>
            <div className="text-2xl font-semibold text-gray-700">
              {percentage}%
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              {percentage >= 80
                ? "🌟 Excellent work! You're a quiz master!"
                : percentage >= 60
                ? "👍 Good job! Keep practicing!"
                : "💪 Keep learning! You'll do better next time!"}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg transition-colors"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* {showConfetti && <Confetti />} */}

      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              Score: {score}/{currentQ > 0 ? currentQ : 0}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Timer */}
        <div className="mb-4 flex justify-center">
          <div
            className={`px-4 py-2 rounded-lg font-bold text-lg ${
              timer <= 2
                ? "bg-red-100 text-red-600 animate-pulse"
                : timer <= 3
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            ⏱️ {timer}s
          </div>
        </div>

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
