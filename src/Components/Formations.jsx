import React, { useState, useRef, useEffect } from 'react';
import SearchInput from './SearchInput';
import PlayerData from './PlayerData';
import OverallRating from './OverallRating';

const Formations = ({ formation }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [, setSelectedPlayer] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [previousButton, setPreviousButton] = useState(null);
  const buttonRefs = useRef([]); // Referencias a todos los botones
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("DATA " + data.length); // Mostrar el valor de data en la consola
  }, [data]);

  const handleSlotClick = (row, index) => {
    setSelectedSlot({ row, index });
    setSelectedPlayer(null);
    setShowSearchInput(true);
  };

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    const buttonId = previousButton;
    const newData = {
      player: player,
      playerId: player.primaryKey,
      previousButton: buttonId,
      firstnameId: player.firstnameid
    };

    const existingIndex = data.findIndex((item) => item.playerId === player.primaryKey);
    if (existingIndex !== -1) {
      // Si el jugador ya existe en data, eliminar el jugador existente
      setData((prevData) => {
        const newDataArray = [...prevData];
        newDataArray.splice(existingIndex, 1);
        return [...newDataArray, newData];
      });
    } else {
      // Si el jugador no existe en data, agregar el nuevo objeto al array de datos
      setData((prevData) => [...prevData, newData]);
    }

    if (previousButton) {
      const [row, index] = previousButton.split('-');
      const button = buttonRefs.current[row][index]?.current;
      if (button) {
        button.textContent = player.fullNameForSearch; // Asignar el nombre del jugador como texto del botón
      }
    }

    setShowSearchInput(false); // Ocultar el SearchInput después de seleccionar el jugador
  };



  const handleButtonClick = (row, index) => {
    const buttonId = `${row}-${index}`;
    setPreviousButton(buttonId);
    handleSlotClick(row, index);
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
    } else if (row === 3) {
      return 'DEL';
    } else {
      return `${row}-${index}`;
    }
  };

  const getPlayerImageUrl = (primaryKey) => {
    const baseUrl = 'https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/';
    const imageUrl = baseUrl + primaryKey + '.png';
    return imageUrl;
  };

  const formationsContainerStyles = {
    width: data.length > 0 ? '50%' : '100%',
  };

  return (
    <div className='formation-data'>
      <div className="formations-container" style={formationsContainerStyles}>
        <h2 className='formation-number'>{formation.name}</h2>
        {initializeButtonRefs()} {/* Inicializar las referencias a los botones */}
        {formation.rows.map((numSlots, row) => (
          <div className="squad-row" key={row}>
            {Array.from({ length: numSlots }, (_, index) => {
              const slotId = `${row}-${index}`; // Generar un id único para cada squad-slot
              const buttonId = `${row}-${index}`; // Generar un id único para cada botón
              const buttonData = data.find((item) => item.previousButton === buttonId);
              const buttonImage = buttonData && buttonData.playerId ? <img className='img-player' src={getPlayerImageUrl(buttonData.playerId)} alt="Imagen" /> : "";
              const buttonText = !buttonImage && buttonData ? (buttonData.player.commonname || buttonData.player.fullNameForSearch) : getButtonText(row, index);
              return (
                <button
                  id={buttonId} // Asignar el id del botón
                  className={`squad-slot ${selectedSlot?.row === row && selectedSlot?.index === index ? 'selected button-selected' : ''}`}
                  key={slotId}
                  onClick={() => handleButtonClick(row, index)}
                  ref={buttonRefs.current[row][index]} // Asignar la referencia al botón correspondiente
                >
                  {buttonImage || buttonText}
                </button>
              );
            })}
          </div>
        ))}
        {showSearchInput && <SearchInput onPlayerSelect={handlePlayerSelect} />}
      </div>
      <div className={data.length > 0 ? 'players-table' : 'players-table hidden'}>
        {data.length === 11 && <OverallRating data={data} />}
        {data.length > 0 && <PlayerData data={data} />}
      </div>
    </div>
  );
};

export default Formations;

