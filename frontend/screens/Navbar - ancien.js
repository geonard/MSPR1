import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import SocialMedia from './SocialMedia'; 
import NewsList from './News';
import SecurityInfo from './SecurityInfo'; 
import Programs from './Programs'; 
import Faq from './Faq'; 
import Partners from './Partners'; 
import Home from './Home'; 
import SiteMap from './SiteMap'; 
import BilleterieScreen from './BilleterieScreen'; 

const Navbar = () => {
  const [showComponent, setShowComponent] = useState(''); // Gère quel composant afficher
  const [showMenu, setShowMenu] = useState(false); // Gère l'affichage du menu
  const [selectedPoint, setSelectedPoint] = useState(null); // Gère le point sélectionné sur la carte

  // Gestion du clic sur l'icône "hamburger" pour afficher ou cacher le menu
  const handleHamburgerClick = () => {
    setShowMenu(!showMenu); 
  };

  // Gestion du clic sur le logo pour afficher le composant "Home"
  const handleLogoClick = () => {
    setShowComponent('Home');
    setShowMenu(false); 
  };

  // Gestion de la sélection d'un élément du menu
  const handleMenuClick = (item) => {
    setShowComponent(item); 
    setShowMenu(false); 
    if (item === 'Statue Lemmy') {
      setSelectedPoint('Statue Lemmy');
    } else {
      setSelectedPoint(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Icône du menu hamburger */}
        <TouchableOpacity style={styles.hamburger} onPress={handleHamburgerClick}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>

        {/* Logo cliquable */}
        <TouchableOpacity onPress={handleLogoClick}>
          {/* Utilisation de require pour charger une image locale */}
          <Image source={require('../assets/logo.webp')} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Affichage du menu déroulant si l'état showMenu est vrai */}
      {showMenu && (
        <ScrollView style={styles.menu} contentContainerStyle={styles.menuContainer}>
          <View style={styles.menuColumns}>
            <View style={styles.menuColumn}>
              <Text style={styles.menuHeader}>Menu général</Text>
              <TouchableOpacity onPress={() => handleMenuClick('Infos en cours')}>
                <Text style={styles.menuItem}>🔔 Infos en cours</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Informations de Sécurité')}>
                <Text style={styles.menuItem}>🔒 Informations de Sécurité</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Programmes')}>
                <Text style={styles.menuItem}>📅 Programmes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Informations Pratiques et FAQ')}>
                <Text style={styles.menuItem}>ℹ️ Informations Pratiques et FAQ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Réseaux Sociaux')}>
                <Text style={styles.menuItem}>🌐 Réseaux Sociaux</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Partenaires')}>
                <Text style={styles.menuItem}>🤝 Partenaires</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Billeterie')}>
                <Text style={styles.menuItem}>🎫 Billeterie</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuColumn}>
              <Text style={styles.menuHeader}>Carte Interactive</Text>
              <TouchableOpacity onPress={() => handleMenuClick('Carte Interactive')}>
                <Text style={styles.menuItem}>🗺️ Carte Interactive</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMenuClick('Statue Lemmy')}>
                <Text style={styles.menuItem}>🎸 Statue Lemmy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Affichage du composant sélectionné */}
      {showComponent === 'Home' && <Home />}
      {showComponent === 'Infos en cours' && <NewsList />}
      {showComponent === 'Informations de Sécurité' && <SecurityInfo />}
      {showComponent === 'Programmes' && <Programs />}
      {showComponent === 'Informations Pratiques et FAQ' && <Faq />}
      {showComponent === 'Carte Interactive' && <SiteMap selectedPoint={selectedPoint} />}
      {showComponent === 'Réseaux Sociaux' && <SocialMedia />}
      {showComponent === 'Partenaires' && <Partners />}
      {showComponent === 'Billeterie' && <BilleterieScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hamburger: {
    padding: 10,
  },
  hamburgerText: {
    fontSize: 24,
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  menu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  menuContainer: {
    padding: 10,
  },
  menuColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuColumn: {
    width: '48%',
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default Navbar;
