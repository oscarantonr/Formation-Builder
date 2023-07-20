import React from 'react';
import './PlayerData.scss'; // Importar el archivo CSS de estilos

const PlayerData = ({ data }) => {
    const rows = Array.from({ length: 11 }, (_, index) => data[index] || { player: { fullNameForSearch: '', overall_rating: 0 } });

    return (
        <div>
            {/* <h2>Team</h2> */}
            <table className="player-table">
                <thead>
                    <tr>
                        <th style={{ width: '70%' }}>Player</th>
                        <th style={{ width: '15%' }}>Age</th>
                        <th style={{ width: '15%' }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) => {
                        const birthdate = new Date(item.player.birthdate);
                        const today = new Date();
                        const fullName = item.player.fullNameForSearch;
                        const age = today.getFullYear() - birthdate.getFullYear();
                        const overallRating = item.player.overall_rating;

                        return (
                            <tr key={index} className="player-row">
                                <td className="player-name">{fullName ? fullName : "Player " + (index + 1)}</td>
                                <td className="player-age">{age ? age : ""}</td>
                                <td className="player-rating">{overallRating ? overallRating : ""}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerData;
