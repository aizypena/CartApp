import React from 'react';
import { View, Text, Image } from 'react-native';

// Muted tile tones per category, used when a product has no photo
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
  lg: { box: 'w-24 h-24 rounded-2xl', pad: 'p-1.5', text: 'text-xl' },
  md: { box: 'w-14 h-14 rounded-xl', pad: 'p-1', text: 'text-base' },
  sm: { box: 'w-14 h-14 rounded-lg', pad: 'p-1', text: 'text-sm' },
};

export default function ProductThumb({ product, size = 'md' }) {
  const s = SIZES[size];

  // Real product photo on a white tile (photos are shot on white backgrounds)
  if (product.image) {
    return (
      <View className={`${s.box} ${s.pad} bg-surface border border-line overflow-hidden`}>
        <Image
          source={product.image}
          resizeMode="contain"
          accessibilityLabel={product.productName}
          style={{ width: '100%', height: '100%' }}
        />
      </View>
    );
  }

  // Fallback: initials on a category-tinted tile
  const tone = getTone(product.category);
  return (
    <View className={`${s.box} items-center justify-center`} style={{ backgroundColor: tone.bg }}>
      <Text className={`${s.text} font-semibold tracking-wide`} style={{ color: tone.fg }}>
        {initials(product.productName)}
      </Text>
    </View>
  );
}
