import React from 'react';
import { View, TextInput, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type Props = {
  index: number;
  psi: string;
  onChange: (index: number, value: string) => void;
};

export default function CylinderInput({ index, psi, onChange }: Props) {
  return (
    <View style={tw`flex-row items-center my-2`}>
      <Text style={tw`w-1/4`}>Tank {index + 1} PSI:</Text>
      <TextInput
        style={tw`border p-2 flex-1`}
        keyboardType="numeric"
        value={psi}
        onChangeText={(text) => onChange(index, text)}
        placeholder="e.g. 2000"
      />
    </View>
  );
}
