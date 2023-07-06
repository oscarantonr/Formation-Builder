import React from 'react';
import './PlayerData.scss'; // Importar el archivo CSS de estilos

const PlayerData = ({ data }) => {
    return (
        <div>
            <h2>Player Data:</h2>
            <table className="player-table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Age</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        const birthdate = new Date(item.player.birthdate);
                        const today = new Date();
                        const age = today.getFullYear() - birthdate.getFullYear();

                        return (
                            <tr key={index} className="player-row">
                                <td className="player-name">{item.player.fullNameForSearch}</td>
                                <td className="player-age">{age}</td>
                                <td className="player-rating">{item.player.overall_rating}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerData;
