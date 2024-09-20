// src/MapDetail.js
import React from 'react';
import Navbar from './Navbar'; // Assurez-vous que le chemin est correct
import MapComponent from './MapComponent'; // Assurez-vous que le chemin est correct
import './MapDetail.css'; // Ajouter des styles spécifiques à cette vue

const MapDetail = () => {
  return (
    <div className="map-detail">
      <Navbar /> {/* Affiche la barre de navigation */}
      <div className="map-container">
        <MapComponent /> {/* Affiche la carte en grande taille */}
      </div>
    </div>
  );
};

export default MapDetail;
