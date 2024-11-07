import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import axios from 'axios';
import NotificationBox from './NotificationBox';
import { Helmet } from 'react-helmet';
import API_URL from './config';

const BilleterieScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [selectedItem, setSelectedItem] = useState(''); // État pour l'élément sélectionné
  const [isPickerVisible, setIsPickerVisible] = useState(false); // Gérer la visibilité de Picker
  const [groupData, setGroupData] = useState(''); // État pour stocker les groupes récupérés

  // Exemple de données JSON pour la liste
  const jsonData = [
    { id: '1', name: 'Option 1: Nom JSON' },
    { id: '2', name: 'Option 2: Texte' },
    { id: '3', name: 'Option 3: Autre Texte' },
  ];

  // Afficher les notifications
  const showNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  // Gestion de l'envoi des données à l'API
  const handleSubmit = async (endpoint) => {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, {
        email,
        password,
      });
      showNotification(response.data.message, 'success');
      if (isLogin) {
        // Connexion réussie
      } else {
        setIsLogin(true); // Basculer vers la connexion après l'inscription
      }
    } catch (error) {
      if (error.response) {
        showNotification(error.response.data.message, 'error');
      } else {
        showNotification('Une erreur est survenue', 'error');
      }
    }
  };

  const handleLogin = () => {
    handleSubmit('login');
  };

  const handleRegister = () => {
    handleSubmit('register');
  };

  // Vérifie si le mot de passe est "geo" pour afficher le ComboBox
  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text === 'geo') {
      setIsPickerVisible(true); // Afficher ComboBox si "geo"
    } else {
      setIsPickerVisible(false); // Masquer ComboBox sinon
    }
  };

  // Gestion de la sélection de l'option
  const handleSelectItem = async (itemValue) => {
    setSelectedItem(itemValue);
  
    // Si l'option sélectionnée est "Option 1", récupérez les groupes depuis le backend
    if (itemValue === 'Option 1: Nom JSON') {
      try {
        console.log('Envoi de la requête pour récupérer les groupes...'); // Vérifie que la fonction est appelée
        const response = await axios.get(`${API_URL}/groups`);
        
        console.log('Réponse reçue :', response.data); // Affiche la réponse brute pour analyse
  
        // Vérifie que les données contiennent bien la clé 'groups'
        if (response.data && response.data.groups) {
          const groupList = response.data.groups
            .map(group => group.name) // Transformez les données pour obtenir uniquement les noms
            .join(', '); // Concaténez les noms en une chaîne de caractères
  
          setGroupData(groupList); // Mettez à jour la zone de texte avec les noms des groupes
          console.log('Liste des groupes :', groupList); // Vérifie la transformation des données
        } else {
          console.warn("Erreur : 'groups' non trouvé dans la réponse de l'API.");
          showNotification("Erreur lors de la récupération des groupes.", 'error');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des groupes :', error); // Affiche l'erreur pour diagnostic
        showNotification('Erreur lors de la récupération des groupes', 'error');
      }
    } else {
      setGroupData(''); // Réinitialisez la zone de texte si une autre option est sélectionnée
    }
  };
  

  return (
    <View style={styles.container}>
      <Helmet>
        <title>{isLogin ? 'Connexion - Billeterie' : 'Inscription - Billeterie'}</title>
        <meta name="description" content="Écran de connexion et d'inscription pour la billeterie." />
      </Helmet>

      {notificationMessage && (
        <NotificationBox
          message={notificationMessage}
          type={notificationType}
          onClose={() => setNotificationMessage('')}
        />
      )}

      <Text style={styles.header}>{isLogin ? 'Connexion' : 'Inscription'}</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button title={isLogin ? "Se connecter" : "S'inscrire"} onPress={isLogin ? handleLogin : handleRegister} />
      <Button title={isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"} onPress={() => setIsLogin(!isLogin)} />

      {/* Affichage de ComboBox si le mot de passe est "geo" */}
      {isPickerVisible && (
        <View style={styles.comboboxContainer}>
          <Text style={styles.label}>Sélectionnez une option :</Text>
          <Picker
            selectedValue={selectedItem}
            onValueChange={handleSelectItem}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionner..." value="" />
            {jsonData.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.name} />
            ))}
          </Picker>
          <TextInput
            style={styles.selectedText}
            placeholder="Groupes sélectionnés"
            value={groupData} // Affiche la liste des groupes
            editable={false} // Non modifiable par l'utilisateur
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f0f0f0',
    paddingTop: 50,
    marginTop: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  comboboxContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 40,
    marginBottom: 10,
  },
  selectedText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'gray',
  },
});

export default BilleterieScreen;
