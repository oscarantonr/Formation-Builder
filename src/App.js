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
      <header className='menu'>
        <div className='menu-title'>
          Squad Builder
        </div>
        <div className="menu-formation">
          <FormationsSelect onFormationSelect={handleFormationSelect} />
        </div>
      </header>
      <main >
        <div className="component-container">
          {!selectedFormation &&
            <div className='titles'>
              <div className='main-title'>Squad Builder</div>
              <div className='second-title'>Create your favorite lineup.</div>
              <div className='third-title'>Data used in EA Sports FC 24</div>
            </div>
          }
          {selectedFormation && <Formations formation={selectedFormation} />}
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
};

export default App;
