import React from 'react';

const OverallRating = ({ data }) => {
    const getTotalOverallRating = () => {
        const overallRatings = data.map((item) => item.player.overall_rating);
        const totalOverallRating = Math.round((overallRatings.reduce((sum, rating) => sum + rating, 0)) / data.length);
        return totalOverallRating;
    };

    return (
        <div>
            <h2>Overall Rating: {getTotalOverallRating()}</h2>
        </div>
    );
};

export default OverallRating;
