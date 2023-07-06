import React from 'react';

const OverallRating = ({ data }) => {
    const getTotalOverallRating = () => {
        const overallRatings = data.map((item) => item.player.overall_rating);
        const totalOverallRating = Math.round((overallRatings.reduce((sum, rating) => sum + rating, 0)) / data.length);
        return totalOverallRating;
    };

    return (
        <div>
            <h2>Overall Rating:</h2>
            <p>Total Overall Rating: {getTotalOverallRating()}</p>
        </div>
    );
};

export default OverallRating;
