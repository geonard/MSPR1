import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Linking } from 'react-native';
import SocialMedia from './SocialMedia'; 
import NewsList from './News';
import SecurityInfo from './SecurityInfo'; 
import Faq from './Faq'; 
import Partners from './Partners'; 
import Home from './Home'; 
import SiteMap from './SiteMap'; 
 // Importez votre fichier JSON ici

const Navbar = () => {
  const [showComponent, setShowComponent] = useState(''); // Gérer le composant à afficher
  const [showMenu, setShowMenu] = useState(false); // Gérer l'affichage du menu
  const [currentTime, setCurrentTime] = useState('');
  const [currentConcerts, setCurrentConcerts] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (showComponent === 'Programmes') {
      updateConcerts();
    }
  }, [showComponent]);

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
    if (item === 'Programmes') {
      updateConcerts(); // Met à jour les concerts à chaque fois que Programmes est cliqué
    }
  };

  const generateRandomDateAndTime = () => {
    // Définir les jours disponibles
    const days = ['Jour 1', 'Jour 2', 'Jour 3'];
    // Choisir un jour aléatoire
    const randomDay = days[Math.floor(Math.random() * days.length)];
    
    // Générer une heure aléatoire entre 00:00 et 23:59
    const randomHour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const randomMinute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
    const randomTime = `${randomHour}:${randomMinute}`;

    return { date: randomDay, time: randomTime };
  };

  const updateConcerts = () => {
    const { date, time } = generateRandomDateAndTime();
    setCurrentDate(date);
    setCurrentTime(time);
    const concertsInProgress = concertData.filter(concert => concert.date === date && concert.time === time);
    setCurrentConcerts(concertsInProgress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        {/* Menu Hamburger */}
        <TouchableOpacity style={styles.hamburger} onPress={handleHamburgerClick}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
        
        {/* Logo */}
        <TouchableOpacity onPress={handleLogoClick}>
          <Image source={{ uri: '/logo.webp' }} style={styles.logo} />
        </TouchableOpacity>
      </View>

      {/* Menu de navigation */}
      {showMenu && (
        <ScrollView style={styles.menu} contentContainerStyle={styles.menuContainer}>
          <Text style={styles.menuHeader}>Menu général</Text>
          <View style={styles.menuColumn}>
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
            <TouchableOpacity onPress={() => handleMenuClick('Carte Interactive')}>
              <Text style={styles.menuItem}>🗺️ Carte Interactive</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuClick('Réseaux Sociaux')}>
              <Text style={styles.menuItem}>🌐 Réseaux Sociaux</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuClick('Partenaires')}>
              <Text style={styles.menuItem}>🤝 Partenaires</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.menuColumn}>
            <TouchableOpacity onPress={() => handleMenuClick('Ma Position')}>
              <Text style={styles.menuItem}>📍 Ma Position</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuClick('Magasin')}>
              <Text style={styles.menuItem}>🛒 Magasin</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuClick('Restaurant')}>
              <Text style={styles.menuItem}>🍽️ Restaurant</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMenuClick('WC')}>
              <Text style={styles.menuItem}>🚻 WC</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Rendu conditionnel du composant sélectionné */}
      {showComponent === 'Home' && <Home />}
      {showComponent === 'Infos en cours' && <NewsList />}
      {showComponent === 'Informations de Sécurité' && <SecurityInfo />}
      {showComponent === 'Programmes' && (
        <View style={styles.programsContainer}>
          <Text style={styles.timeText}>Date: {currentDate}</Text>
          <Text style={styles.timeText}>Heure: {currentTime}</Text>
          <Text style={styles.title}>Concerts en cours</Text>
          {currentConcerts.length > 0 ? (
            currentConcerts.map(concert => (
              <View key={concert.id} style={styles.concert}>
                <Image source={{ uri: concert.image }} style={styles.concertImage} />
                <Text style={styles.concertName}>{concert.name}</Text>
                <Text>{concert.genre}</Text>
                <Text>Scene: {concert.scene}</Text>
                <Text>Heure: {concert.time}</Text>
                <TouchableOpacity onPress={() => Linking.openURL(concert.link)}>
                  <Text style={styles.concertLink}>Voir plus</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text>Aucun concert en cours pour cette date et heure.</Text>
          )}
        </View>
      )}
      {showComponent === 'Informations Pratiques et FAQ' && <Faq />}
      {showComponent === 'Carte Interactive' && <SiteMap />}
      {showComponent === 'Réseaux Sociaux' && <SocialMedia />}
      {showComponent === 'Partenaires' && <Partners />}
      {['Concerts', 'Billetterie', 'Plan du Site'].includes(showComponent) && <Home showSection={showComponent} />}
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
    flexDirection: 'row', // Utilisez les colonnes pour les éléments de menu
    flexWrap: 'wrap',
  },
  menuColumn: {
    width: '50%', // Divisez en deux colonnes
    padding: 10,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  programsContainer: {
    padding: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  concert: {
    marginBottom: 20,
  },
  concertImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  concertName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  concertLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Navbar;
