import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/format';

function ProductCard({ product, quantityInCart, onAdd }) {
  return (
    <View className="bg-slate-900 p-5 mb-4 rounded-3xl border border-slate-800">
      {/* TOP ROW: ICON, BADGE, RATING, PRICE */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-slate-800 rounded-2xl items-center justify-center border border-slate-700/60 mr-3">
            <Text className="text-2xl">{product.icon}</Text>
          </View>
          <View>
            <View className="bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 rounded-full self-start mb-1">
              <Text className="text-indigo-400 text-[10px] font-bold uppercase">{product.badge}</Text>
            </View>
            <Text className="text-slate-400 text-xs font-semibold">⭐ {product.rating} / 5.0</Text>
          </View>
        </View>

        <Text className="text-2xl font-black text-indigo-400">{formatPrice(product.price)}</Text>
      </View>

      {/* TITLE & DESCRIPTION */}
      <Text className="text-lg font-bold text-white mb-1">{product.productName}</Text>
      <Text className="text-slate-300 text-sm mb-4 leading-relaxed">{product.description}</Text>

      {/* ACTION BUTTON */}
      <TouchableOpacity
        onPress={() => onAdd(product)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Add ${product.productName} to cart`}
        className="bg-indigo-600 py-3.5 px-4 rounded-2xl flex-row items-center justify-center"
      >
        <Text className="text-white font-bold text-sm mr-2">
          {quantityInCart > 0 ? 'Add Another (+1)' : 'Add to Cart'}
        </Text>
        {quantityInCart > 0 && (
          <View className="bg-indigo-800 px-2.5 py-0.5 rounded-full">
            <Text className="text-white font-bold text-xs">{quantityInCart} in cart</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

// memo: a card only re-renders when its own product/quantity changes
export default memo(ProductCard);
