import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/format';
import ProductThumb from './ProductThumb';

function ProductCard({ product, quantityInCart, onAdd }) {
  const inCart = quantityInCart > 0;

  return (
    <View className="bg-surface p-4 mb-3 rounded-2xl border border-line">
      <View className="flex-row">
        <ProductThumb product={product} />

        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <Text className="flex-1 text-base font-semibold text-ink mr-3" numberOfLines={2}>
              {product.productName}
            </Text>
            <Text className="text-base font-semibold text-ink">{formatPrice(product.price)}</Text>
          </View>

          <Text className="text-xs text-muted mt-1">
            {product.category} · {product.rating.toFixed(1)} rating
          </Text>
        </View>
      </View>

      <Text className="text-sm text-body leading-5 mt-3">{product.description}</Text>

      <View className="flex-row items-center justify-between mt-4">
        <Text className="text-xs font-medium text-muted uppercase tracking-wider">{product.badge}</Text>

        <TouchableOpacity
          onPress={() => onAdd(product)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.productName} to cart`}
          className={`px-4 py-2.5 rounded-xl ${inCart ? 'bg-surface border border-ink' : 'bg-ink'}`}
        >
          <Text className={`text-sm font-semibold ${inCart ? 'text-ink' : 'text-white'}`}>
            {inCart ? `Add another · ${quantityInCart} in cart` : 'Add to cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// memo: a card only re-renders when its own product/quantity changes
export default memo(ProductCard);
