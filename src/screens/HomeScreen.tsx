import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import PatientForm from '../components/PatientForm';
import ResultCard from '../components/ResultCard';
import {
  ventedFlow,
  usageLiters,
  remainingFraction,
  statusMessage,
  tankLitersWithFactor,
} from '../utils/calculations';
import { loadData, saveData } from '../utils/storage';

type AircraftOption = {
  label: string;
  value: string;
  factor: number;
};

const AIRCRAFT_OPTIONS: AircraftOption[] = [
  { label: 'Bell 407 & AS350 (Single)', value: 'bell-single', factor: 0.99 },
  { label: 'Bell 407 (Dual)', value: 'bell-dual', factor: 1.63 },
  { label: 'H135/H145 (Dual)', value: 'h135-dual', factor: 1.98 },
  { label: 'Ground Main (H cyl)', value: 'ground-main', factor: 3.14 },
  { label: 'Fixed Wing Spectrum', value: 'fw-spectrum', factor: 1.57 },
  { label: 'Fixed Wing Lifeport', value: 'fw-lifeport', factor: 1.57 },
];

type HomeScreenProps = { navigation: any };

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [ventilated, setVentilated] = useState<boolean>(true);
  const [data, setData] = useState({ minVent: '', bias: '', fiO2: '', hours: '', flow: '' });
  const [psies, setPsies] = useState<string[]>(['']);
  const [aircraft, setAircraft] = useState<string>(AIRCRAFT_OPTIONS[0].value);
  const [factor, setFactor] = useState<number>(AIRCRAFT_OPTIONS[0].factor);
  const [results, setResults] = useState({ consumed: 0, supply: 0, fraction: 0, status: 'OK' });

  // Load persisted state
  useEffect(() => {
    (async () => {
      const saved = await loadData();
      if (saved) {
        setVentilated(saved.ventilated);
        setData(saved.data);
        setPsies(saved.psies);
        setAircraft(saved.aircraft);
        setFactor(saved.factor);
      }
    })();
  }, []);

  // Persist and calculate
  useEffect(() => {
    saveData({ ventilated, data, psies, aircraft, factor });

    const flowLpm = ventilated
      ? ventedFlow(+data.minVent, +data.bias, +data.fiO2)
      : +data.flow;
    const consumed = usageLiters(flowLpm, +data.hours);
    const supply = psies.reduce((sum, psi) => sum + tankLitersWithFactor(+psi, factor), 0);
    const fraction = remainingFraction(consumed, supply);
    setResults({ consumed, supply, fraction, status: statusMessage(fraction) });
  }, [ventilated, data, psies, factor]);

  const handleChange = (field: keyof typeof data, value: string) =>
    setData({ ...data, [field]: value });
  const handlePsiChange = (i: number, val: string) =>
    setPsies(psies.map((p, idx) => (idx === i ? val : p)));
  const addTank = () => setPsies([...psies, '']);
  const removeTank = (i: number) => setPsies(psies.filter((_, idx) => idx !== i));

  const onSelectAircraft = (val: string) => {
    const opt = AIRCRAFT_OPTIONS.find((o) => o.value === val);
    setAircraft(val);
    if (opt) setFactor(opt.factor);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20 }}>

          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#111827' }}>
              O₂ Calculator
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Feather name="settings" size={28} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Aircraft Picker */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <Text style={{ marginBottom: 8, fontSize: 16, color: '#374151' }}>
              Aircraft Type
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={aircraft}
                onValueChange={onSelectAircraft}
              >
                {AIRCRAFT_OPTIONS.map((opt) => (
                  <Picker.Item
                    key={opt.value}
                    label={opt.label}
                    value={opt.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Patient Form */}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 16,
              marginBottom: 24,
              elevation: 2,
            }}
          >
            <PatientForm
              ventilated={ventilated}
              data={data}
              onToggleVent={() => setVentilated(!ventilated)}
              onChange={handleChange}
            />
          </View>

          {/* Tank List */}
          <View style={{ marginBottom: 24 }}>
            {psies.map((psi, idx) => (
              <View
                key={idx}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  elevation: 1,
                }}
              >
                <Text style={{ width: 80, fontSize: 16, color: '#374151' }}>
                  Tank {idx + 1}
                </Text>
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    padding: 8,
                    borderRadius: 8,
                    marginRight: 12,
                  }}
                  keyboardType="numeric"
                  value={psi}
                  onChangeText={(t) => handlePsiChange(idx, t)}
                  placeholder="PSI"
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity onPress={() => removeTank(idx)}>
                  <Feather name="trash-2" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              onPress={addTank}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#6366F1',
                paddingVertical: 16,
                borderRadius: 12,
                elevation: 2,
              }}
            >
              <MaterialIcons name="add-circle-outline" size={24} color="#FFFFFF" />
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '600',
                  marginLeft: 8,
                }}
              >Add Tank</Text>
            </TouchableOpacity>
          </View>

          {/* Results */}
          <ResultCard {...results} />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
