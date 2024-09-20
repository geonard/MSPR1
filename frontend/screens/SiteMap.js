import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './SiteMap.css';
import { getPointsOfInterest } from './services/pointsOfInterest';
import mapboxSdk from '@mapbox/mapbox-sdk'; // Importer le SDK de Mapbox
import directions from '@mapbox/mapbox-sdk/services/directions'; // Service Directions

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbmFyZCIsImEiOiJjbTA0NnRzMmgwNGxnMmpyNXY0OGt5MXVjIn0.Ojuo6UTNN_g2LaE5HR2q6g';

const SiteMap = ({ isFullScreen, toggleFullScreen }) => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const fetchPointsOfInterest = async () => {
      try {
        const data = await getPointsOfInterest();
        console.log('Points of Interest:', data);
        setPointsOfInterest(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des points d\'intérêt:', error);
      }
    };

    fetchPointsOfInterest();
  }, []);

  useEffect(() => {
    if (pointsOfInterest.length > 0) {
      const initializeMap = () => {
        const mapInstance = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-1.2785, 47.0930], // Coordonnées initiales
          zoom: 15,
        });

        mapInstance.addControl(new mapboxgl.NavigationControl());

        // Ajouter les points d'intérêt sur la carte
        pointsOfInterest.forEach(point => {
          const popup = new mapboxgl.Popup().setHTML(`<h3>${point.title}</h3><p>${point.description}</p>`);
          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([point.lng, point.lat])
            .setPopup(popup)
            .addTo(mapInstance);
        });

        // Calcul du barycentre des marqueurs sauf certains points
        const redMarkers = pointsOfInterest.filter(point => point.title !== "Statue Lemmy" && point.title !== "Camping Hellfest");
        const latSum = redMarkers.reduce((sum, point) => sum + point.lat, 0);
        const lngSum = redMarkers.reduce((sum, point) => sum + point.lng, 0);
        const numPoints = redMarkers.length;
        const barycenterLat = latSum / numPoints;
        const barycenterLng = lngSum / numPoints;

        // Ajouter le barycentre sur la carte
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat([barycenterLng, barycenterLat])
          .addTo(mapInstance);

        // Dessiner la zone de Hellfest
        const hellfestArea = [
          [47.095, -1.290],
          [47.090, -1.275],
          [47.095, -1.270],
          [47.100, -1.280],
          [47.095, -1.290]
        ];

        mapInstance.on('load', () => {
          mapInstance.addSource('hellfest-area', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [hellfestArea]
              }
            }
          });

          mapInstance.addLayer({
            'id': 'hellfest-area',
            'type': 'fill',
            'source': 'hellfest-area',
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.5
            }
          });

          // Utiliser le SDK Directions pour afficher un itinéraire en bleu
          const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
          const directionsService = directions(mapboxClient);

          directionsService.getDirections({
            profile: 'walking',
            waypoints: [
              { coordinates: [-1.2739205370730342, 47.102325111993366] }, // Coordonnées de départ
              { coordinates: [-1.26554, 47.09905] } // Coordonnées de destination
            ]
          })
            .send()
            .then(response => {
              const data = response.body;
              if (data.routes.length > 0) {
                const route = data.routes[0];
                mapInstance.addSource('route', {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    geometry: route.geometry
                  }
                });

                // Ajouter une couche pour dessiner l'itinéraire en bleu
                mapInstance.addLayer({
                  id: 'route',
                  type: 'line',
                  source: 'route',
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#3887be', // Couleur bleue
                    'line-width': 5
                  }
                });
              } else {
                console.error('Aucun itinéraire trouvé.');
              }
            })
            .catch(error => {
              console.error('Erreur lors de la récupération de l\'itinéraire:', error);
            });
        });

        setMap(mapInstance);
      };

      initializeMap();
    }
  }, [pointsOfInterest]);

  return (
    <div className={`map-container ${isFullScreen ? 'full-screen' : ''}`}>
      <button onClick={toggleFullScreen} className="fullscreen-toggle">
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
      <div id="map" className="map" />
    </div>
  );
};

export default SiteMap;
