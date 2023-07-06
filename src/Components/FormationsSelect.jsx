import React from 'react';
import './Formations.scss';

const formations = [
  { name: '4-4-2', rows: [1, 4, 4, 2] },
  { name: '4-3-3', rows: [1, 4, 3, 3] },
  { name: '3-5-2', rows: [1, 3, 5, 2] },
  { name: '3-4-3', rows: [1, 3, 4, 3] }
];

const FormationsSelect = ({ onFormationSelect }) => {
  const handleFormationChange = (event) => {
    const selectedFormationName = event.target.value;
    const selectedFormation = formations.find((formation) => formation.name === selectedFormationName);
    onFormationSelect(selectedFormation);
  };

  return (
    <div className="formations-select">
      <h2>Select Formation:</h2>
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
