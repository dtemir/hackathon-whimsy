import React, { useEffect } from 'react';
import Image from 'next/image';
import HackKU from '../public/HackKU.svg'

const hackathonImages = {
    HackKU
};

function Results({ maxScoreHackathon }) {
    const handleDownload = () => {
        console.log("Download the image");
    };

    const handleShare = () => {
        console.log("Share on social media");
    };

    const handleResults = (resultId, resultValue) => {
        fetch('/.netlify/functions/mongo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resultId, resultValue })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    useEffect(() => {
        const resultId = Date.now().toString();
        const resultValue = `${maxScoreHackathon}`;
        handleResults(resultId, resultValue);
    }, [maxScoreHackathon]);  

    const imageSrc = hackathonImages[maxScoreHackathon];

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-2xl flex flex-col items-center">
                <Image src={imageSrc} alt={`${maxScoreHackathon}`} className="mb-6" />
                <div className="flex justify-between w-full px-4">
                    <button
                        onClick={handleDownload}
                        className="bg-white p-3 rounded-lg shadow text-black hover:bg-cyan-100 border-2 border-cyan-100 flex-grow mr-2"
                    >
                        Download
                    </button>
                    <button
                        onClick={handleShare}
                        className="bg-white p-3 rounded-lg shadow text-black hover:bg-cyan-100 border-2 border-cyan-100 flex-grow ml-2"
                    >
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Results;
