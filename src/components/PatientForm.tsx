import React from 'react';
import { View, TextInput, Text, Switch } from 'react-native';
import tw from 'tailwind-react-native-classnames';

// Define the shape of the patient form data
export type Data = {
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

// PatientForm component renders inputs for ventilated vs spontaneous breathing
export default function PatientForm({ ventilated, data, onToggleVent, onChange }: Props) {
  return (
    <View style={tw`p-4 bg-white rounded-lg shadow`}>
      {/* Toggle between ventilated and spontaneous breathing modes */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`text-lg`}>Ventilated</Text>
        <Switch value={ventilated} onValueChange={onToggleVent} />
      </View>

      {/* Conditionally render fields based on mode */}
      {ventilated ? (
        <>
          <Text>Minute Volume (L/min):</Text>
          <TextInput
            style={tw`border p-2 mb-2`}
            keyboardType="numeric"
            value={data.minVent}
            onChangeText={(text) => onChange('minVent', text)}
          />

          <Text>Bias Flow (L/min):</Text>
          <TextInput
            style={tw`border p-2 mb-2`}
            keyboardType="numeric"
            value={data.bias}
            onChangeText={(text) => onChange('bias', text)}
          />
        </>
      ) : (
        <>
          <Text>Flow Rate (L/min):</Text>
          <TextInput
            style={tw`border p-2 mb-2`}
            keyboardType="numeric"
            value={data.flow}
            onChangeText={(text) => onChange('flow', text)}
          />
        </>
      )}

      {/* FiO₂ and flight time inputs */}
      <Text>FiO₂ (0-1):</Text>
      <TextInput
        style={tw`border p-2 mb-2`}
        keyboardType="numeric"
        value={data.fiO2}
        onChangeText={(text) => onChange('fiO2', text)}
      />

      <Text>Flight Time (h):</Text>
      <TextInput
        style={tw`border p-2`}
        keyboardType="numeric"
        value={data.hours}
        onChangeText={(text) => onChange('hours', text)}
      />
    </View>
  );
}
