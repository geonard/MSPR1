import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './SiteMap.css';
import API_URL from './config'

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbmFyZCIsImEiOiJjbTA0NnRzMmgwNGxnMmpyNXY0OGt5MXVjIn0.Ojuo6UTNN_g2LaE5HR2q6g';

const SiteMap = ({ selectedType }) => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);

  // Récupération et filtrage des points d'intérêt depuis l'API
  useEffect(() => {
    const fetchPointsOfInterest = async () => {alert(selectedType);
      try {
        const response = await fetch(`${API_URL}/pointsOfInterest`);
        const data = await response.json();
        const filteredPoints = (selectedType === "carte interactive"
          ? Object.values(data).flat() // Récupère tous les points
          : data[selectedType] || []).filter(point => 
            typeof point.lat === 'number' && typeof point.lng === 'number'
          );
        
        setPointsOfInterest(filteredPoints);
      } catch (error) {
        console.error("Erreur lors de la récupération des points d'intérêt:", error);
      }
    };

    if (selectedType) {
      fetchPointsOfInterest();
    }
  }, [selectedType]);

  // Initialisation de la carte au chargement
  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-1.2785, 47.0930], // Coordonnées initiales
        zoom: 15,
      });

      // Ajout des contrôles de navigation
      map.addControl(new mapboxgl.NavigationControl());

      setMapInstance(map);
    };

    if (!mapInstance) {
      initializeMap();
    }
  }, [mapInstance]);

  // Ajout des marqueurs en fonction des points d'intérêt filtrés
  useEffect(() => {
    if (mapInstance && pointsOfInterest.length > 0) {
      // Supprime les anciens marqueurs avant d'ajouter les nouveaux
      const markers = pointsOfInterest.map(point => {
        const markerColor = selectedType === 'magasins' ? 'blue' : 'green';

        const marker = new mapboxgl.Marker({ color: markerColor })
          .setLngLat([point.lng, point.lat])
          .addTo(mapInstance);

        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <h3>${point.title}</h3>
            <p>${point.description || 'Aucune description disponible.'}</p>
          `);

        marker.setPopup(popup);

        return marker;
      });

      // Fonction de nettoyage pour supprimer les anciens marqueurs
      return () => {
        markers.forEach(marker => marker.remove());
      };
    }
  }, [mapInstance, pointsOfInterest, selectedType]);

  return <div id="map" style={{ height: '500px', width: '1500px' }} />;
};

export default SiteMap;
