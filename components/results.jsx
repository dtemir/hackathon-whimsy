import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import HackKU from '../public/hackku.svg'
import HackMIT from '../public/hackmit.svg'
import PennApps from '../public/pennapps.svg'
import HackTheNorth from '../public/hackthenorth.svg'
import HackUIowa from '../public/hackuiowa.svg'
import HackUTD from '../public/hackutd.svg'
import TreeHacks from '../public/treehacks.svg'
import QWERHacks from '../public/qwerhacks.svg'

const hackathonImages = {
    HackKU,
    HackMIT,
    PennApps,
    HackTheNorth,
    HackUIowa,
    HackUTD,
    TreeHacks,
    QWERHacks
};

function Results({ maxScoreHackathon }) {
    const [percentage, setPercentage] = useState(null);

    const handleDownload = () => {
        const imageSrc = hackathonImages[maxScoreHackathon].src;
        fetch(imageSrc)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `${maxScoreHackathon}.svg`; // Assuming the images are SVGs
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(() => alert('Could not download the image'));
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `My Hackathon Match - ${maxScoreHackathon}`,
                text: `I match ${percentage.toFixed(2)}% with ${maxScoreHackathon}! Check it out!`,
                url: document.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            alert('Web Share API is not supported in your browser.');
        }
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
            setPercentage(data.percentage);
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
                {percentage !== null && (
                    <p className="text-lg font-bold mb-4 text-black">You match with {percentage.toFixed(2)}% whose hackathon is {maxScoreHackathon}</p>
                )}
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
