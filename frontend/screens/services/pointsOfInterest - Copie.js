const BASE_URL = process.env.REACT_APP_BASE_URL + '/pointsOfInterest';

// Fonction pour récupérer les points d'intérêt
export const getPointsOfInterest = async () => {alert('here ok');
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des points d\'intérêt');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};
