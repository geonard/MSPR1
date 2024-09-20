import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { getEvents } from './services/billeterieService'; // Importer le service qui envoie la requête au back

const BilleterieScreen = () => {
  const [events, setEvents] = useState([]);  // Pour stocker les événements
  const [loading, setLoading] = useState(true);  // Indicateur de chargement
  const [error, setError] = useState(null);  // Pour stocker d'éventuelles erreurs

  useEffect(() => {
    // Appel API pour récupérer les événements dès le montage du composant
    getEvents()
      .then(data => {
        setEvents(data);  // Stocker les événements reçus
        setLoading(false);  // Désactiver l'indicateur de chargement
      })
      .catch(err => {
        setError(err.message);  // Gérer les erreurs
        setLoading(false); 
      });
  }, []);  // Le tableau vide [] signifie que l'effet est exécuté une seule fois après le premier rendu

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erreur lors de la récupération des événements : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billetterie - Concert 3 jours</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDescription}>{item.description}</Text>
            <Text style={styles.eventDate}>Date : {item.date}</Text>
            <Text style={styles.eventPrice}>Prix : {item.price} €</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventItem: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 16,
    marginVertical: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  eventPrice: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default BilleterieScreen;
