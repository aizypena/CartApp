import React from 'react';
import { View, Text } from 'react-native';

// Muted tile tones per category, used in place of product photography
const TONES = {
  Peripherals: { bg: '#E9E6DF', fg: '#4A4335' },
  Audio: { bg: '#E3E8EC', fg: '#34424F' },
  Furniture: { bg: '#E6EBE5', fg: '#3A4A3C' },
};
const DEFAULT_TONE = { bg: '#EFEEEA', fg: '#3F4248' };

export const getTone = (category) => TONES[category] ?? DEFAULT_TONE;

// "Noise-Cancelling Headphones" -> "NH"
export const initials = (name) =>
  name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

const SIZES = {
  md: { box: 'w-14 h-14 rounded-xl', text: 'text-base' },
  sm: { box: 'w-11 h-11 rounded-lg', text: 'text-sm' },
};

export default function ProductThumb({ product, size = 'md' }) {
  const tone = getTone(product.category);
  const s = SIZES[size];

  return (
    <View className={`${s.box} items-center justify-center`} style={{ backgroundColor: tone.bg }}>
      <Text className={`${s.text} font-semibold tracking-wide`} style={{ color: tone.fg }}>
        {initials(product.productName)}
      </Text>
    </View>
  );
}
