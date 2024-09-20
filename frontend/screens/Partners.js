import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import axios from 'axios';

export default function Partners() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données des partenaires
  const fetchNewsData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3003/partners'); // Assurez-vous que l'URL est correcte
      setNewsData(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des partenaires.');
      console.error('Erreur lors de la récupération des partenaires:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Nos Partenaires</Text>
        {newsData.map((partner, index) => (
          <View key={index} style={styles.partnerItem}>
            <Image source={{ uri: partner.logo }} style={styles.partnerLogo} />
            <Text style={styles.partnerName}>{partner.name}</Text>
            <Text style={styles.partnerCategory}>Catégorie: {partner.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles du composant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10, // Ajoutez un espacement autour du conteneur
  },
  scrollContainer: {
    flexGrow: 1, // Assurez-vous que le ScrollView occupe tout l'espace disponible
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  partnerItem: {
    marginBottom: 20, // Espacement entre les éléments
  },
  partnerLogo: {
    width: '100%',
    height: 100,
    resizeMode: 'contain', // Ajuste l'image pour qu'elle soit bien contenue
    marginBottom: 10,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  partnerCategory: {
    fontSize: 16,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
