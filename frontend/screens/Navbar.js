import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import NewsList from './News';
import SecurityInfo from './SecurityInfo'; 
import Programs from './Programs'; 
import Faq from './Faq'; 
import SocialMedia from './Partners'; 
import Partners from './SocialMedia'; 
import Home from './Home'; 
import SiteMap from './SiteMap'; 
import BilleterieScreen from './BilleterieScreen'; 

const POINTS_TYPES = {
  CARTE: 'carte interactive',
  SCENES: 'scènes',
  RESTAURATION: 'restaurations',
  BARS: 'bars',
  MAGASINS: 'magasins',
  WC: 'wc',
  OTHER: 'other',
};

const Navbar = ({ onTypeSelect }) => {
  const [showComponent, setShowComponent] = useState(''); 
  const [showMenu, setShowMenu] = useState(false); 
  const [selectedPoint, setSelectedPoint] = useState(null); 
  const [pointsOfInterest, setPointsOfInterest] = useState([]);
  const [gpsCoordinates, setGpsCoordinates] = useState('');

  useEffect(() => {
    if (showComponent in POINTS_TYPES) {
      fetchPointsOfInterest(showComponent.toLowerCase());
      Alert.alert('Titre de l\'alerte', 'Message de l\'alerte');
    }
  }, [showComponent]);

  const fetchPointsOfInterest = async (type) => {
    try {
      const response = await fetch(`/api/pointsOfInterest/${type}`);
      const data = await response.json();
      setPointsOfInterest(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des points d\'intérêt:', error);
    }
  };

  const handleHamburgerClick = () => {
    setShowMenu(!showMenu);
  };

  const handleLogoClick = () => {
    setShowComponent('Home');
    setShowMenu(false);
  };

  const handleMenuClick = (item) => {
    setShowComponent(item);
    setShowMenu(false);
    setSelectedPoint(null);
  };

  const getEmojiForType = (type) => {
    switch (type) {
      case POINTS_TYPES.CARTE:
        return '🗺️'; // Carte interactive ou information
      case POINTS_TYPES.SCENES:
        return '🎸'; // Scènes de concert
      case POINTS_TYPES.BARS:
        return '🍻'; // Bars pour boissons
      case POINTS_TYPES.RESTAURATION:
        return '🍴'; // Restauratwion (restaurants, snacks)
      case POINTS_TYPES.MAGASINS:
        return '🛒'; // Magasins pour achats
      case POINTS_TYPES.WC:
        return '🚻'; // Toilettes
      default:
        return '❓'; // Emoji par défaut pour un type non spécifié
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gpsContainer}>
        <Text style={styles.gpsText}>{gpsCoordinates}</Text>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.hamburger} onPress={handleHamburgerClick}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogoClick}>
          <Image source={require('../assets/logo.webp')} style={styles.logo} />
        </TouchableOpacity>
      </View>

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
              {Object.values(POINTS_TYPES).map(type => (
                <TouchableOpacity key={type} onPress={() => onTypeSelect(type)}>
                  <Text style={styles.menuItem}>{getEmojiForType(type)} {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>

          </View>
        </ScrollView>
      )}

      {showComponent === 'Home' && <Home />}
      {showComponent === 'Infos en cours' && <NewsList />}
      {showComponent === 'Informations de Sécurité' && <SecurityInfo />}
      {showComponent === 'Programmes' && <Programs />}
      {showComponent === 'Informations Pratiques et FAQ' && <Faq />}
      {showComponent === 'Partenaires' && <Partners />}
      {showComponent === 'Réseaux Sociaux' && <SocialMedia />}
      {showComponent === 'Billeterie' && <BilleterieScreen />}
      {showComponent === 'Carte Interactive' && 
      <SiteMap selectedPoint={selectedPoint} pointsOfInterest={pointsOfInterest} />}
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
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  hamburger: {
    padding: 20,
  },
  hamburgerText: {
    fontSize: 40,
    color: 'blue',
  },
  logo: {
    width: 100,
    height: 40,
    marginLeft: 10,
  },
  menu: {
    position: 'absolute',
    top: 120,
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
    flex: 1,
    paddingRight: 10,
  },
  menuHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 5,
  },
  gpsContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  gpsText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Navbar;

