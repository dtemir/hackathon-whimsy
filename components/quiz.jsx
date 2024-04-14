'use client'
import React, { useState } from 'react';
import quizData from '../public/quizData.json'; // Adjust the path according to your project structure
import Results from './results'; // Adjust the path according to your project structure

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);

    const handleOptionSelect = (option) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = option;
        setUserAnswers(newAnswers);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizData.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setCompleted(true);
        }
    };

    if (completed) {
        return <Results />;
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-black">{quizData[currentQuestionIndex].question}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {quizData[currentQuestionIndex].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className="bg-white p-3 rounded-lg shadow text-black hover:bg-cyan-100 border-2 border-cyan-100"  // Added colorful border
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
