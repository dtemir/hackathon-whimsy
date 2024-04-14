'use client'
import React, { useState, useEffect } from 'react';
import quizData from '../public/quizData.json';
import Results from './results';

function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [scores, setScores] = useState({});

    const handleOptionSelect = (optionIndex) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = quizData[currentQuestionIndex].options[optionIndex];
        setUserAnswers(newAnswers);

        const weights = optionIndex === 0 ? quizData[currentQuestionIndex].weight_one : quizData[currentQuestionIndex].weight_two;
        const newScores = { ...scores };
        weights.forEach((hackathon, index) => {
            const points = weights.length - index;
            newScores[hackathon] = (newScores[hackathon] || 0) + points;
        });
        setScores(newScores);

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < quizData.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setCompleted(true);
            console.log("Final Scores:", newScores);
        }
    };

    useEffect(() => {
        console.log("Current Scores:", scores);
    }, [scores]);

    if (completed) {
        const maxScoreHackathon = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
        return <Results maxScoreHackathon={maxScoreHackathon} />;
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4 text-black">{quizData[currentQuestionIndex].question}</h2>
                <div className="grid grid-cols-2 gap-4">
                    {quizData[currentQuestionIndex].options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(index)}
                            className="bg-white p-3 rounded-lg shadow text-black hover:bg-cyan-100 border-2 border-cyan-100"
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
