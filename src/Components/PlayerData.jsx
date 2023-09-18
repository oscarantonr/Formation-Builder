import React from 'react';
import './PlayerData.scss';

const PlayerData = ({ data, onPlayerDelete, onAllPlayersDelete }) => {
    const today = new Date();

    const renderPlayerRow = (item, index) => {
        const { birthdate, firstName, lastName, overallRating } = item.player;
        const age = today.getFullYear() - new Date(birthdate).getFullYear();
        const fullName = firstName ? firstName + " " + lastName : `Player ${index + 1}`;

        return (
            <tr key={index} className="player-row">
                <td className="player-name">
                    {item.player.id && (
                        <button className="delete-button" onClick={() => onPlayerDelete(index)}>X</button>
                    )}
                    <span className='player-fullname'>{fullName}</span>
                </td>
                <td className="player-age">{age || ""}</td>
                <td className="player-rating">{overallRating || ""}</td>
            </tr>
        );
    };

    const rows = Array.from({ length: 11 }, (_, index) => data[index] || { player: { lastName: '', overallRating: 0 } });

    return (
        <div>
            <div className="player-buttons">
                {data.length > 0 && (
                    <button className="delete-all-button" onClick={onAllPlayersDelete}>
                        <span>Delete All</span>
                    </button>
                )}
            </div>
            <table className="player-table">
                <thead>
                    <tr>
                        <th style={{ width: '65%' }}>Player</th>
                        <th style={{ width: '15%' }}>Age</th>
                        <th style={{ width: '20%' }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) => renderPlayerRow(item, index))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerData;
