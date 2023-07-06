import React, { useState, useRef } from 'react';
import axios from 'axios';

const SearchInput = ({ onPlayerSelect }) => {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState(null);
    const searchInputRef = useRef(null);

    const handleKeywordChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);

        if (newKeyword.length > 2) {
            fetchData(newKeyword);
        } else {
            setData(null);
        }
    };

    const fetchData = async (keyword) => {
        try {
            const url = `https://ratings-api.ea.com/v2/entities/fifa-23-ratings?sort=ranking%3AASC&limit=40&filter=((fullNameForSearch%3A*${keyword}*%20OR%20commonname%3A*${keyword}*))`;
            const response = await axios.get(url);
            setData(response.data.docs);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePlayerClick = (player) => {
        setKeyword('');
        setData(null);
        onPlayerSelect(player);
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Enter a player's name"
                ref={searchInputRef}
            />
            {data && (
                <div className="dropdown-container">
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
        </div>
    );
};

export default SearchInput;
