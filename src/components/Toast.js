import React from 'react';
import { View, Text } from 'react-native';

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <View pointerEvents="none" className="absolute bottom-28 left-6 right-6 items-center">
      <View className="bg-ink px-4 py-3 rounded-xl">
        <Text className="text-white font-medium text-sm">{toast.message}</Text>
      </View>
    </View>
  );
}
