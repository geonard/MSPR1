import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './SiteMap.css';
import { getPointsOfInterest } from './services/pointsOfInterest'; // Importer la fonction

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbmFyZCIsImEiOiJjbTA0NnRzMmgwNGxnMmpyNXY0OGt5MXVjIn0.Ojuo6UTNN_g2LaE5HR2q6g';

const SiteMap = ({ isFullScreen, toggleFullScreen }) => {
  const [pointsOfInterest, setPointsOfInterest] = useState([]);

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
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-1.2785, 47.0930],
          zoom: 15,
        });

        map.addControl(new mapboxgl.NavigationControl());

        // Ajouter les points d'intérêt
        pointsOfInterest.forEach(point => {
          console.log('Point ajouté:', point);
          const popup = new mapboxgl.Popup().setHTML(`<h3>${point.title}</h3><p>${point.description}</p>`);
          new mapboxgl.Marker({ color: 'red' })
            .setLngLat([point.lng, point.lat])
            .setPopup(popup)
            .addTo(map);
        });

        function createCustomMarker(color) {
          const marker = document.createElement('div');
          marker.className = 'custom-marker';
          marker.style.backgroundColor = color;
          marker.style.width = '20px';
          marker.style.height = '20px';
          marker.style.borderRadius = '50%';
          marker.style.border = '2px solid black';
          return marker;
        }

        const hellfestArea = [
          [47.095, -1.290],
          [47.090, -1.275],
          [47.095, -1.270],
          [47.100, -1.280],
          [47.095, -1.290]
        ];

        map.on('load', () => {
          map.addSource('hellfest-area', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates': [hellfestArea]
              }
            }
          });

          map.addLayer({
            'id': 'hellfest-area',
            'type': 'fill',
            'source': 'hellfest-area',
            'layout': {},
            'paint': {
              'fill-color': '#088',
              'fill-opacity': 0.5
            }
          });

          const redMarkers = pointsOfInterest.filter(point => point.title !== "Statue Lemmy" && point.title !== "Camping Hellfest");
          const latSum = redMarkers.reduce((sum, point) => sum + point.lat, 0);
          const lngSum = redMarkers.reduce((sum, point) => sum + point.lng, 0);
          const numPoints = redMarkers.length;
          const barycenterLat = latSum / numPoints;
          const barycenterLng = lngSum / numPoints;

          new mapboxgl.Marker({
            element: createCustomMarker('blue'),
          })
            .setLngLat([barycenterLng, barycenterLat])
            .addTo(map);

          const directionsClient = Directions(MapboxClient({ accessToken: mapboxgl.accessToken }));

          directionsClient.getDirections({
            profile: 'walking',
            waypoints: [
              { coordinates: [-1.2739205370730342, 47.102325111993366] },
              { coordinates: [-1.26554, 47.09905] }
            ]
          })
            .send()
            .then(response => {
              const data = response.body;
              if (data.routes.length > 0) {
                const route = data.routes[0];
                map.addSource('route', {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    geometry: route.geometry
                  }
                });

                map.addLayer({
                  id: 'route',
                  type: 'line',
                  source: 'route',
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#3887be',
                    'line-width': 5
                  }
                });
              } else {
                console.error('No route found.');
              }
            })
            .catch(error => {
              console.error('Error fetching directions:', error);
            });
        });

        return () => map.remove();
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
