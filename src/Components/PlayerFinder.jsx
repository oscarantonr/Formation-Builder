import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SelectedPlayersContainer from './SelectedPlayersContainer';
import FormationsSelect from './FormationsSelect';
import Formations from './Formations';

const PlayerFinder = () => {
    const [data, setData] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [overallRatingSum, setOverallRatingSum] = useState(0);
    const dropdownRef = useRef(null);
    const [selectedFormation, setSelectedFormation] = useState(null);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        const fetchData = async () => {
            try {
                let url = 'https://ratings-api.ea.com/v2/entities/fifa-23-ratings?sort=ranking%3AASC&limit=40';

                if (keyword) {
                    url += `&filter=((fullNameForSearch%3A*${keyword}*%20OR%20commonname%3A*${keyword}*))`;
                }

                const response = await axios.get(url);
                setData(response.data.docs);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (keyword.length > 2) {
            fetchData();
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [keyword]);

    useEffect(() => {
        // Calcula la suma total de overall rating
        const sum = selectedPlayers.reduce((total, player) => total + player.overall_rating, 0);
        setOverallRatingSum(sum);
    }, [selectedPlayers]);

    const handleOutsideClick = (event) => {
        // if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setData(null);
        // }
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    const handlePlayerClick = (player) => {
        const isPlayerSelected = selectedPlayers.find((selectedPlayer) => selectedPlayer.primaryKey === player.primaryKey);

        if (!isPlayerSelected && selectedPlayers.length < 11) {
            setSelectedPlayers((prevSelectedPlayers) => [...prevSelectedPlayers, player]);
        }
        setKeyword('');
        handleOutsideClick();
    };

    const handleRemovePlayer = (playerToRemove) => {
        setSelectedPlayers((prevSelectedPlayers) =>
            prevSelectedPlayers.filter((player) => player.primaryKey !== playerToRemove.primaryKey)
        );
    };

    const handlePlayerSelect = (player) => {
        setSelectedPlayer(player);
    };

    const handleFormationSelect = (formation) => {
        setSelectedFormation(formation);
    };

    const handleFormationChange = (formation) => {
        setSelectedFormation(formation);
    };

    return (
        <div className="player-finder-container">
            <h1>Lista de ratings FIFA 23</h1>
            <div className="search-container">
                <input
                    className="search-input"
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="Introduce el nombre de un jugador"
                />
                {data && (
                    <div className="dropdown dropdown-container" ref={dropdownRef}>
                        {data.slice(0, 10).map((player) => (
                            <div
                                className="dropdown-item"
                                key={player.primaryKey}
                                onClick={() => handlePlayerClick(player)}
                            >
                                <div className="dropdown-item-player">
                                    <div className="player-name">{player.fullNameForSearch}</div>
                                    <div className="player-overall">{player.overall_rating}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {selectedPlayer && (
                    <div className="selected-player">
                        <h2>{selectedPlayer.fullNameForSearch}</h2>
                        <p>Rating: {selectedPlayer.overall_rating}</p>
                        {/* Agrega más datos del jugador que deseas mostrar */}
                    </div>
                )}

                <SelectedPlayersContainer selectedPlayers={selectedPlayers} handleRemovePlayer={handleRemovePlayer} />
                {selectedPlayers.length === 11 && (
                    <div className="overall-rating-summary">
                        <h2>Media total del overall rating: {Math.round(overallRatingSum / 11)}</h2>
                    </div>
                )}
            </div>
            <FormationsSelect onFormationSelect={handleFormationSelect} />
            {selectedFormation && <Formations formation={selectedFormation} />}
        </div>
    );
}

export default PlayerFinder;
