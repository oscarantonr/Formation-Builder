import React, { useState, useEffect, useRef } from 'react';
import SearchInput from './SearchInput';
import PlayerData from './PlayerData';
import OverallRating from './OverallRating';
import Modal from './Modal';
import './Formations.scss';

const Formations = ({ formation }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [data, setData] = useState([]);
  const contenedorRef = useRef(null);
  const [halfScreen, setHalfScreen] = useState("");
  const buttonRefs = useRef([]);
  const [previousButton, setPreviousButton] = useState(null);

  useEffect(() => {
    const contenedorElement = contenedorRef.current;
    const classList = contenedorElement.classList;
    const isHidden = Array.from(classList).find(className => className === 'hidden');

    if (isHidden) {
      setHalfScreen("");
    } else {
      const halfScreen = "half-screen";
      setHalfScreen(halfScreen);
    }
  }, [data]);

  const renderButtons = (row, numSlots) => {
    return Array.from({ length: numSlots }, (_, index) => {
      const slotId = `${row}-${index}`;
      const buttonId = `${row}-${index}`;
      const buttonData = data.find((item) => item.previousButton === buttonId);
      const buttonImage = buttonData && buttonData.player.id ? <img className='img-player' src={getPlayerImageUrl(buttonData.player.id)} alt="Imagen" /> : "";
      const buttonText = !buttonImage && buttonData ? (buttonData.player.commonname || buttonData.player.fullNameForSearch) : getButtonText(row, index);

      return (
        <button
          id={buttonId}
          className={`squad-slot ${selectedSlot?.row === row && selectedSlot?.index === index ? 'selected button-selected' : ''}`}
          key={slotId}
          onClick={() => handleButtonClick(row, index)}
          ref={buttonRefs.current[row][index]}
        >
          {buttonImage || buttonText}
        </button>
      );
    });
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    const buttonId = previousButton;
    const newData = {
      player: player,
      playerId: player.id,
      previousButton: buttonId,
    };

    // Busca si el jugador ya existe en el estado
    const existingIndex = data.findIndex((item) => item.previousButton === buttonId);

    if (existingIndex !== -1) {
      // Si existe, reemplaza el jugador anterior con el nuevo
      setData((prevData) => {
        const newDataArray = [...prevData];
        newDataArray[existingIndex] = newData;
        return newDataArray;
      });
    } else {
      // Si no existe, simplemente agrega el nuevo jugador
      setData((prevData) => [...prevData, newData]);
    }

    if (previousButton) {
      const [row, index] = previousButton.split('-');
      const button = buttonRefs.current[row][index]?.current;
      if (button) {
        button.textContent = player.fullNameForSearch;
      }
    }

    setShowSearchInput(false);
  };


  const handleButtonClick = (row, index) => {
    const buttonId = `${row}-${index}`;
    setPreviousButton(buttonId);
    handleSlotClick(row, index);
  };

  const handleSlotClick = (row, index) => {
    setSelectedSlot({ row, index });
    setSelectedPlayer(null);
    setShowSearchInput(true);
  };

  const initializeButtonRefs = () => {
    buttonRefs.current = formation.rows.map(() => Array.from({ length: formation.numSlots }, () => React.createRef()));
  };

  const getButtonText = (row, index) => {
    if (row === 0) {
      return 'POR';
    } else if (row === 1) {
      return 'DEF';
    } else if (row === 2) {
      return 'MED';
    } else if (row === 3 || row === 4) {
      return 'DEL';
    } else {
      return `${row}-${index}`;
    }
  };

  const getPlayerImageUrl = (primaryKey) => {
    const imageUrl = 'https://media.contentapi.ea.com/content/dam/ea/easfc/fc-24/ratings/common/full/player-shields/en/' + primaryKey + '.png.adapt.100w.png'
    return imageUrl;
  };

  const handlePlayerDelete = (index) => {
    setData((prevData) => {
      const newDataArray = [...prevData];
      newDataArray.splice(index, 1);
      return newDataArray;
    });
  };

  const handleAllPlayersDelete = () => {
    setData([]);
  };

  return (
    <div className='formation-data'>
      <div className={`formations-container ${halfScreen}`}>
        <h2 className='formation-number'>{formation.name}</h2>
        {initializeButtonRefs()} {/* Inicializar las referencias a los botones */}
        {formation.rows.map((numSlots, row) => (
          <div className="squad-row" key={row}>
            {renderButtons(row, numSlots)}
          </div>
        ))}
        {showSearchInput && (
          <Modal isOpen={showSearchInput} onClose={() => setShowSearchInput(false)}>
            <SearchInput onPlayerSelect={handlePlayerSelect} />
          </Modal>
        )}
      </div>
      <div className={`players-table ${data.length > 0 ? '' : 'hidden'}`} ref={contenedorRef}>
        {data.length > 0 && <PlayerData data={data} onPlayerDelete={handlePlayerDelete} onAllPlayersDelete={handleAllPlayersDelete} />}
        {data.length === 11 && <OverallRating data={data} />}
      </div>
    </div>
  );
};

export default Formations;
