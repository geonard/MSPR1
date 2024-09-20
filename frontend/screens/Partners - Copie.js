// Partners.js
import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import partners from './data/Partners.json'; // Importez les données depuis le fichier JSON

const Partners = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Nos Partenaires</Text>
        {partners.map((partner, index) => (
          <View key={index} style={styles.partnerItem}>
            <Image source={{ uri: partner.logo }} style={styles.partnerLogo} />
            <Text style={styles.partnerName}>{partner.name}</Text>
            <Text style={styles.partnerCategory}>Catégorie: {partner.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  partnerItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  partnerLogo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  partnerCategory: {
    fontSize: 16,
  },
});

export default Partners;
