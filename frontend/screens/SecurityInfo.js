import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import axios from 'axios';

export default function SecurityInfo() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const animation = useRef(new Animated.Value(0)).current;

  const fetchNewsData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3003/security'); // Assurez-vous que l'URL est correcte
      setNewsData(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération de security.');
      console.error('Erreur lors de la récupération des alertes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  useEffect(() => {
    const animationLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    
    animationLoop.start();

    return () => animationLoop.stop(); // Arrêter l'animation lorsque le composant est démonté
  }, [animation]);

  const handleLinkPress = (link) => {
    console.log('Lien cliqué:', link);
  };

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f00', '#ff0'], // Rouge à Jaune
  });

  if (loading) {
    return <Text style={styles.loadingText}>Chargement...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {newsData.map((alert) => (
        <Animated.View
          style={[styles.alertItem, { backgroundColor }]} // Appliquer l'animation de couleur
          key={alert.id}
        >
          <Text style={styles.alertText}>
            {alert.message}
            {alert.link && (
              <TouchableOpacity onPress={() => handleLinkPress(alert.link)}>
                <Text style={styles.alertLink}> (Plus d'infos)</Text>
              </TouchableOpacity>
            )}
          </Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  alertItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 36,
  },
  alertLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  loadingText: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
  },
});
