import React from 'react';
import './Formations.scss';
import jsonData from '../json/formations.json';

const formations = jsonData.values; // Utiliza los valores del JSON tratado.

const FormationsSelect = ({ onFormationSelect }) => {
  const handleFormationChange = (event) => {
    const selectedFormationName = event.target.value;
    const selectedFormation = formations.find((formation) => formation.name === selectedFormationName);
    onFormationSelect(selectedFormation);
  };

  return (
    <div className="formations-select">
      <select onChange={handleFormationChange}>
        <option value="">Select a formation</option>
        {formations.map((formation) => (
          <option key={formation.name} value={formation.name}>
            {formation.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormationsSelect;
