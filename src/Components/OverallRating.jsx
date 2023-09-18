import React from 'react';

const OverallRating = ({ data }) => {
    const calculateOverallRating = (statKey) => {
        const overallStat = data.map((item) => item.player[statKey]);
        const totalOverallStat = Math.round(overallStat.reduce((sum, rating) => sum + rating, 0) / data.length);
        return totalOverallStat;
    };

    const calculateOverall = (statKey) => {
        const overallStat = data.map((item) => item.player.stats[statKey].value);
        const totalOverallStat = Math.round(overallStat.reduce((sum, rating) => sum + rating, 0) / data.length);
        return totalOverallStat;
    };

    const overallRating = calculateOverallRating('overallRating');
    const overallPac = calculateOverall('pac');
    const overallSho = calculateOverall('sho');
    const overallPas = calculateOverall('pas');
    const overallDri = calculateOverall('dri');
    const overallDef = calculateOverall('def');
    const overallPhy = calculateOverall('phy');

    return (
        <div className='stats'>
            <h2>Overall Rating: {overallRating}</h2>
            <div className='overall-stats'>
                <div>Overall Stats:</div>
                Pace: {overallPac} - Shoot: {overallSho} - Passing: {overallPas} - Dribbling: {overallDri} - Defense: {overallDef} - Physical: {overallPhy}
            </div>
        </div>
    );
};

export default OverallRating;