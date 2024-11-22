import React, { useState, createContext } from 'react';
import SiteMap from './SiteMap';

// Créer un contexte pour les points d'intérêt filtrés
export const FilteredPointsContext = createContext();

const Navbar = () => {
  const [filteredPoints, setFilteredPoints] = useState([]);

  const fetchPointsOfInterest = async (type) => {
    try {
      const response = await fetch(`${API_URL}/pointsOfInterest`);
      const data = await response.json();

      let filteredPoints = [];
      if (type === 'restaurations') {
        filteredPoints = data.restaurations;
      } else if (type === 'magasins') {
        filteredPoints = data.magasins;
      }

      setFilteredPoints(filteredPoints); // Mettre à jour les points d'intérêt filtrés
    } catch (error) {
      console.error(`Erreur lors de la récupération des points ${type}:`, error);
    }
  };

  return (
    <FilteredPointsContext.Provider value={filteredPoints}>
      <button onClick={() => fetchPointsOfInterest('restaurations')}>
        Afficher les restaurants
      </button>
      <button onClick={() => fetchPointsOfInterest('magasins')}>
        Afficher les magasins
      </button>

      {/* Passer le contexte directement à SiteMap */}
      <SiteMap />
    </FilteredPointsContext.Provider>
  );
};

export default Navbar;
