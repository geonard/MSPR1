// SimpleMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Fonction pour le composant SimpleMenu
const SimpleMenu = ({ title, links }) => {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.title}>{title}</Text>
      {links.map((link, index) => (
        <TouchableOpacity key={index} style={styles.linkButton}>
          <Text style={styles.linkText}>{link}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles du composant SimpleMenu
const styles = StyleSheet.create({
  menuContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkButton: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default SimpleMenu;
