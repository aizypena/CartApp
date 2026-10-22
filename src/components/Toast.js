import React from 'react';
import { View, Text } from 'react-native';

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <View pointerEvents="none" className="absolute top-24 left-6 right-6 items-center">
      <View className="bg-emerald-600 px-4 py-2.5 rounded-2xl">
        <Text className="text-white font-bold text-sm">✓ {toast.message}</Text>
      </View>
    </View>
  );
}
