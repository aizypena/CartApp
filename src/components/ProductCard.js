import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/format';
import ProductThumb from './ProductThumb';

function StepButton({ label, onPress, accessibilityLabel }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className="w-10 h-10 items-center justify-center"
    >
      <Text className="text-white text-xl leading-6">{label}</Text>
    </TouchableOpacity>
  );
}

function ProductCard({ product, quantityInCart, onAdd, onDecrease }) {
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

        {inCart ? (
          // Once in the cart, the button becomes a quantity stepper (− at 1 removes it)
          <View className="flex-row items-center bg-ink rounded-xl">
            <StepButton
              label="−"
              onPress={() => onDecrease(product.id)}
              accessibilityLabel={
                quantityInCart === 1
                  ? `Remove ${product.productName} from cart`
                  : `Decrease ${product.productName} quantity`
              }
            />
            <Text className="min-w-8 text-center text-white text-sm font-semibold">{quantityInCart}</Text>
            <StepButton
              label="+"
              onPress={() => onAdd(product)}
              accessibilityLabel={`Increase ${product.productName} quantity`}
            />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => onAdd(product)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Add ${product.productName} to cart`}
            className="bg-ink px-4 h-10 rounded-xl items-center justify-center"
          >
            <Text className="text-sm font-semibold text-white">Add to cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// memo: a card only re-renders when its own product/quantity changes
export default memo(ProductCard);
