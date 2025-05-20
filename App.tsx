import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver`', // suppress that driver check warning
]);
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AppNavigator />
    </>
  );
}
