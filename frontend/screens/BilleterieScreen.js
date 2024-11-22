import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker, ScrollView } from 'react-native';
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
  const [selectedItem, setSelectedItem] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [groupData, setGroupData] = useState('');

  const jsonData = [
    { id: '1', name: 'pointsOfInterest' },
    { id: '2', name: 'news' },
    { id: '3', name: 'security' },
    { id: '4', name: 'programms' },
    { id: '5', name: 'faq' },
    { id: '6', name: 'socialMedia' },
    { id: '7', name: 'partners' },
    { id: '8', name: 'billeterie' },
  ];

  const showNotification = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setTimeout(() => setNotificationMessage(''), 3000);
  };

  const handleSubmit = async (endpoint) => {
    try {
      const response = await axios.post(`${API_URL}/${endpoint}`, { email, password });
      showNotification(response.data.message, 'success');
      if (isLogin) {
        // Connexion réussie
      } else {
        setIsLogin(true); // Basculer vers la connexion après l'inscription
      }
    } catch (error) {
      showNotification(error.response?.data?.message || 'Une erreur est survenue', 'error');
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPickerVisible(text === 'g');
  };

  const handleSelectItem = async (itemValue) => {
    setSelectedItem(itemValue);

    try {
      const response = await axios.get(`${API_URL}/${itemValue}`);
      setGroupData(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      showNotification('Erreur lors de la récupération des données', 'error');
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`${API_URL}/${selectedItem}`, JSON.parse(groupData));
      showNotification('Modifications enregistrées avec succès', 'success');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des modifications :', error);
      showNotification('Erreur lors de l\'enregistrement des modifications', 'error');
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
        placeholder="E-mail pas finalisé"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={[styles.input, styles.passwordInput]}
        placeholder="Password Tapez g pour suite..."
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Button title={isLogin ? "Se connecter" : "S'inscrire"} onPress={isLogin ? handleSubmit : handleRegister} />
      <Button title={isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"} onPress={() => setIsLogin(!isLogin)} />

      {isPickerVisible && (
        <View style={styles.comboboxContainer}>
          <Text style={styles.label}>Modifiez un fichier JSON :</Text>
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
          <ScrollView>
            <TextInput
              style={styles.selectedText}
              placeholder="Contenu du fichier sélectionné"
              value={groupData}
              multiline
              onChangeText={setGroupData}
            />
          </ScrollView>
          <Button title="Valider les modifications" onPress={handleSaveChanges} />
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
    width: '600px',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  passwordInput: {
    borderColor: 'red',
    color: 'red',
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
    height: 200,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
  },
});

export default BilleterieScreen;
