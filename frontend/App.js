import React, { useState } from 'react';
import Navbar from './screens//Navbar';
import SiteMap from './screens/SiteMap';

const App = () => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type); // Met à jour le type sélectionné
  };

  return (
    <div>
      <Navbar onTypeSelect={handleTypeSelect} />
      {selectedType && <SiteMap selectedType={selectedType} />} {/* Passe le type comme prop */}
    </div>
  );
};

export default App;
