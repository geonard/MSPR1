import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const BilleterieScreen = () => {
    const [billets, setBillets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBillets = async () => {
            try {
                const response = await axios.get('http://localhost:3003/billeterie');
                setBillets(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des billets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBillets();
    }, []);

    if (loading) {
        return <Text>Chargement...</Text>;
    }

    return (
        <FlatList
            data={billets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View>
                    <Text>Nombre de jours: {item.nombreDeJours}</Text>
                    <Text>Prix: {item.prix}€</Text>
                    <Text>Description: {item.description}</Text>
                </View>
            )}
        />
    );
};

export default BilleterieScreen;
