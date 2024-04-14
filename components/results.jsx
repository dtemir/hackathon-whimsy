import React from 'react';

function Results({ score, total }) {
    const handleDownload = () => {
        // Logic to download the image
        console.log("Download the image");
    };

    const handleShare = () => {
        // Logic to share on social media
        console.log("Share on social media");
    };

    return (
        <div className="flex flex-col items-center justify-start pt-20 min-h-screen">
            <div className="bg-blue-200 p-4 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
                <h2 className="text-lg font-bold mb-4">Your Score: {score}/{total}</h2>
                <img src="path_to_your_image.jpg" alt="Result Image" className="mb-4" />
                <div className="flex space-x-4">
                    <button onClick={handleDownload} className="bg-white p-2 rounded-lg shadow text-blue-900 hover:bg-blue-100">
                        Download
                    </button>
                    <button onClick={handleShare} className="bg-white p-2 rounded-lg shadow text-blue-900 hover:bg-blue-100">
                        Share
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Results;
