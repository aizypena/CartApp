import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatPrice } from '../utils/format';
import ProductThumb from './ProductThumb';

function StepperButton({ label, onPress, accessibilityLabel }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      accessibilityLabel={accessibilityLabel}
      className="w-8 h-8 items-center justify-center"
    >
      <Text className="text-ink text-lg leading-5">{label}</Text>
    </TouchableOpacity>
  );
}

export default function CartItem({ item, isLast, onIncrease, onDecrease, onRemove }) {
  return (
    <View className={`flex-row p-4 ${isLast ? '' : 'border-b border-line'}`}>
      <ProductThumb product={item} size="sm" />

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-start">
          <Text className="flex-1 text-sm font-semibold text-ink mr-3" numberOfLines={2}>
            {item.productName}
          </Text>
          <Text className="text-sm font-semibold text-ink">
            {formatPrice(item.price * item.quantity)}
          </Text>
        </View>
        <Text className="text-xs text-muted mt-0.5">{formatPrice(item.price)} each</Text>

        <View className="flex-row items-center justify-between mt-3">
          {/* QUANTITY STEPPER */}
          <View className="flex-row items-center border border-line rounded-lg">
            <StepperButton
              label="−"
              onPress={() => onDecrease(item.id)}
              accessibilityLabel={`Decrease ${item.productName} quantity`}
            />
            <Text className="w-8 text-center text-sm font-semibold text-ink">{item.quantity}</Text>
            <StepperButton
              label="+"
              onPress={() => onIncrease(item)}
              accessibilityLabel={`Increase ${item.productName} quantity`}
            />
          </View>

          <TouchableOpacity
            onPress={() => onRemove(item.id)}
            activeOpacity={0.6}
            accessibilityRole="button"
            accessibilityLabel={`Remove ${item.productName} from cart`}
            className="py-1.5 px-1"
          >
            <Text className="text-xs font-medium text-danger">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
