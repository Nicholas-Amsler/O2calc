import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Settings } from 'lucide-react-native';
import GmrLogo from '../assets/gmr-logo.jpg';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleClearAll = async () => {
    try {
      await AsyncStorage.clear();
      // Reset navigation to Home with fresh state
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      Alert.alert('Data Cleared', 'All saved data has been removed.');
    } catch (error) {
      Alert.alert('Error', 'Unable to clear data.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={GmrLogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.header}>GMR O₂ Calculation</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleClearAll}>
          <Settings size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
          <Text style={styles.clearText}>CLEAR ALL DATA</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0B3954',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  header: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  iconButton: {
    padding: 4,
  },
  content: {
    padding: 16,
  },
  clearButton: {
    backgroundColor: '#2C9C7A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  clearText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
