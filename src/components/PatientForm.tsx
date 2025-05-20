import React from 'react';
import { View, TextInput, Text, Switch } from 'react-native';
import tw from 'tailwind-react-native-classnames';

// Define the shape of the patient form data
type Data = {
  minVent: string;
  bias: string;
  fiO2: string;
  hours: string;
  flow: string;
};

// Define props for the PatientForm component
type Props = {
  ventilated: boolean;
  data: Data;
  onToggleVent: () => void;
  onChange: (field: keyof Data, value: string) => void;
};

// PatientForm component renders inputs for ventilated vs spontaneous breathing modes
export default function PatientForm({ ventilated, data, onToggleVent, onChange }: Props) {
  return (
    <View style={tw`p-4 bg-white rounded-lg shadow mb-4`}>
      {/* Toggle between ventilated and spontaneous breathing modes */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-lg font-semibold`}>{ventilated ? 'Ventilated' : 'Non-Ventilated'}</Text>
        <Switch value={ventilated} onValueChange={onToggleVent} />
      </View>

      {/* Conditionally render fields based on mode */}
      {ventilated ? (
        <>
          <Text style={tw`mb-1`}>Minute Volume (L/min):</Text>
          <TextInput
            style={tw`border p-2 mb-4 rounded`}
            keyboardType="numeric"
            value={data.minVent}
            onChangeText={(text) => onChange('minVent', text)}
          />

          <Text style={tw`mb-1`}>Bias Flow (L/min):</Text>
          <TextInput
            style={tw`border p-2 mb-4 rounded`}
            keyboardType="numeric"
            value={data.bias}
            onChangeText={(text) => onChange('bias', text)}
          />
        </>
      ) : (
        <>
          <Text style={tw`mb-1`}>Flow Rate (L/min):</Text>
          <TextInput
            style={tw`border p-2 mb-4 rounded`}
            keyboardType="numeric"
            value={data.flow}
            onChangeText={(text) => onChange('flow', text)}
          />
        </>
      )}

      {/* FiO₂ and flight time inputs */}
      <Text style={tw`mb-1`}>FiO₂ (0-1):</Text>
      <TextInput
        style={tw`border p-2 mb-4 rounded`}
        keyboardType="numeric"
        value={data.fiO2}
        onChangeText={(text) => onChange('fiO2', text)}
      />

      <Text style={tw`mb-1`}>Flight Time (h):</Text>
      <TextInput
        style={tw`border p-2 rounded`}
        keyboardType="numeric"
        value={data.hours}
        onChangeText={(text) => onChange('hours', text)}
      />
    </View>
  );
}
