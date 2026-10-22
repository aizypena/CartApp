import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/format';

export default function CartItem({ item, isLast, onIncrease, onDecrease, onRemove }) {
  return (
    <View className={`p-4 ${isLast ? '' : 'border-b border-slate-800'}`}>
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center flex-1 mr-2">
          <Text className="text-2xl mr-3">{item.icon || '📦'}</Text>
          <View className="flex-1">
            <Text className="font-bold text-white text-base">{item.productName}</Text>
            <Text className="text-indigo-400 font-semibold text-xs mt-0.5">
              {formatPrice(item.price)} each · {formatPrice(item.price * item.quantity)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.productName} from cart`}
          className="bg-rose-500/10 border border-rose-500/30 px-3 py-2 rounded-xl"
        >
          <Text className="text-rose-400 font-bold text-xs">Remove 🗑️</Text>
        </TouchableOpacity>
      </View>

      {/* QUANTITY CONTROLLER ROW */}
      <View className="flex-row items-center justify-between bg-slate-950 p-2.5 rounded-2xl border border-slate-800/80">
        <Text className="text-slate-400 font-medium text-xs ml-2">Quantity</Text>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => onDecrease(item.id)}
            activeOpacity={0.7}
            accessibilityLabel={`Decrease ${item.productName} quantity`}
            className="w-9 h-9 items-center justify-center bg-slate-800 border border-slate-700 rounded-xl"
          >
            <Text className="text-white font-bold text-base">−</Text>
          </TouchableOpacity>

          <Text className="w-10 text-center font-black text-white text-base">{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => onIncrease(item)}
            activeOpacity={0.7}
            accessibilityLabel={`Increase ${item.productName} quantity`}
            className="w-9 h-9 items-center justify-center bg-slate-800 border border-slate-700 rounded-xl"
          >
            <Text className="text-white font-bold text-base">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
