import React from 'react';
import { View, Text, Button, Alert, SafeAreaView } from 'react-native';
import { clearAll } from '../utils/storage';

export default function SettingsScreen({ navigation }: any) {
  const handleClear = () => {
    Alert.alert('Confirm', 'Clear all data?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: async () => { await clearAll(); navigation.navigate('Home'); } },
    ]);
  };

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Text style={{ fontSize: 24 }}>Amsler Labs O₂ App</Text>
      </View>
      <Button title="Clear All Data" onPress={handleClear} color="red" />
    </SafeAreaView>
  );
}
