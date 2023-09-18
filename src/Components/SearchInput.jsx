import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const SearchInput = ({ onPlayerSelect }) => {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState(null);
    const searchInputRef = useRef(null);

    const handleKeywordChange = (event) => {
        const newKeyword = event.target.value;
        setKeyword(newKeyword);
    };

    useEffect(() => {
        if (keyword.length > 2) {
            const fetchPlayerData = async () => {
                try {
                    const url = `http://localhost:3001/rating?search=${keyword}`
                    const response = await axios.get(url);
                    console.log(response.data.items);
                    setData(response.data.items);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchPlayerData();
        } else {
            setData(null);
        }
    }, [keyword]);

    const handlePlayerClick = (player) => {
        setKeyword('');
        setData(null);
        onPlayerSelect(player);
    };

    return (
        <div className="search-container">
            <input
                autoFocus
                className="search-input"
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                ref={searchInputRef}
                name="text"
                required
            />
            <label className='label-name'>
                <span className="content-name">Player's name</span>
            </label>
            {data && (
                <div className="dropdown-container">
                    {data.slice(0, 10).map((player) => (
                        <div
                            className="dropdown-item"
                            key={player.id}
                            onClick={() => handlePlayerClick(player)}
                        >
                            <div className="dropdown-item-player">
                                <div className="player-name">{player.firstName + " " + player.lastName}</div>
                                <div className="player-overall">{player.overallRating}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
