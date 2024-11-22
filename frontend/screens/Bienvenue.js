import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bienvenue = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue à l'application !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Bienvenue;
