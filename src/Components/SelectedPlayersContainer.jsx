import React from 'react';
import './Styles.scss';

// const SelectedPlayersContainer = ({ selectedPlayers, handleRemovePlayer }) => {
//     return (
//         <div className="selected-players-container">
//             {selectedPlayers.length > 0 && <h2>Jugadores seleccionados</h2>}
//             {selectedPlayers.map((player) => (
//                 <div className="selected-player-container" key={player.primaryKey}>
//                     <div>
//                         <h3>{player.fullNameForSearch}</h3>
//                         <button className="remove-button" onClick={() => handleRemovePlayer(player)}>
//                         </button>
//                     </div>
//                     <p>Overall Rating: {player.overall_rating}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

const SelectedPlayersContainer = ({ selectedPlayers, handleRemovePlayer }) => {
    const overallRatingSum = selectedPlayers.reduce((sum, player) => sum + player.overall_rating, 0);
    const overallRatingAvg = overallRatingSum / selectedPlayers.length;

    return (
        <div className="selected-players-container">
            {selectedPlayers.length > 0 && <h2>Jugadores seleccionados</h2>}
            {selectedPlayers.map((player) => (
                <div key={player.primaryKey} className="selected-player-item">
                    <div className="selected-player-name">
                        <h3>{player.fullNameForSearch}</h3>
                    </div>
                    <div className="selected-player-rating">
                        <p>Rating: {player.overall_rating}</p>
                    </div>
                    <button className="remove-button" onClick={() => handleRemovePlayer(player)}></button>
                </div>
            ))}
            {/* {selectedPlayers.length > 0 && (
                <p>Media total del overall rating: {Math.round(overallRatingAvg * 100) / 100}</p>
            )} */}
        </div>
    );
};



export default SelectedPlayersContainer;
