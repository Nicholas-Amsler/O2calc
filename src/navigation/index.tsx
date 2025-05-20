// src/navigation/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { Image, View, Text, TouchableOpacity } from 'react-native';
import GmrLogo from '../assets/gmr-logo.jpg';

const Stack = createStackNavigator();

// Your custom header component
function HeaderTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={GmrLogo}
        style={{ width: 32, height: 32, marginRight: 8 }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#2C9C7A' }}>
        GMR O₂ Calculation
      </Text>
    </View>
  );
}

// Shared screen options
const screenOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#0B3954', // deep blue primary
  },
  headerTintColor: '#2C9C7A',   // green accent for back button, etc.
  headerTitleAlign: 'center',
  headerTitle: () => <HeaderTitle />,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // no need to pass options here unless you want to override
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
