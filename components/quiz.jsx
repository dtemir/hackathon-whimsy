'use client'
import React, { useState } from 'react';
import quizData from '../public/quizData.json'; 

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const handleOptionSelect = (option) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = option;
        setUserAnswers(newAnswers);

        // Move to next question or show results if it's the last question
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizData.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            showResults();
        }
    };

    const calculateResults = () => {
        return userAnswers.filter((answer, index) => answer === quizData[index].answer).length;
    };

    const showResults = () => {
        const score = calculateResults();
        alert(`Your score is ${score}/${quizData.length}`);
        // Implement image display and sharing functionality
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-yellow-800 p-4 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">{quizData[currentQuestionIndex].question}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {quizData[currentQuestionIndex].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="bg-white p-3 rounded-lg shadow text-blue-900 hover:bg-blue-100"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
