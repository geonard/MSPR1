// screens/HomeStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Concerts from './Concerts';
import Tickets from './Tickets';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Concerts" component={Concerts} options={{ title: 'Concerts' }} />
      <Stack.Screen name="Tickets" component={Tickets} options={{ title: 'Tickets' }} />
    </Stack.Navigator>
  );
}
