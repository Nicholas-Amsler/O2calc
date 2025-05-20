import React from 'react';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

type Props = {
  consumed: number;
  supply: number;
  fraction: number;
  status: string;
};

export default function ResultCard({ consumed, supply, fraction, status }: Props) {
  const badgeColor = status === 'OK' ? 'green-500' : status === 'CAUTION' ? 'yellow-500' : 'red-500';
  return (
    <View style={tw`p-4 bg-white rounded-lg shadow mt-4`}>
      <Text>Total Consumed: {consumed.toFixed(0)} L</Text>
      <Text>Total Supply: {supply.toFixed(0)} L</Text>
      <Text>Remaining: {(fraction * 100).toFixed(1)}%</Text>
      <View style={tw`mt-2 p-2 bg-${badgeColor} rounded`}>
        <Text style={tw`text-white text-center font-bold`}>{status}</Text>
      </View>
    </View>
  );
}

