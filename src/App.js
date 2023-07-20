import './App.css';
import './Components/Header.scss';
import './Components/Styles.scss';
import React, { useState } from 'react';
import Formations from './Components/Formations';
import FormationsSelect from './Components/FormationsSelect';

const App = () => {
  const [selectedFormation, setSelectedFormation] = useState(null);

  const handleFormationSelect = (formation) => {
    setSelectedFormation(formation);
  };

  return (
    <div>
      <header className='header'>
        Squad Builder
      </header>
      <main >
        <div className="component-container">
          <FormationsSelect onFormationSelect={handleFormationSelect} />
        </div>
        <div className="component-container">
          {selectedFormation && <Formations formation={selectedFormation} />}
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
};

export default App;
