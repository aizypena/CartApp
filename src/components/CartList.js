import React from 'react';
import { View, Text } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

// Shared cart items list, used both inline on the shop screen and inside the cart sheet
export default function CartList() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <View className="bg-surface px-6 py-10 rounded-2xl border border-line items-center">
        <Text className="text-ink font-semibold text-base mb-1">Your cart is empty</Text>
        <Text className="text-muted text-sm text-center">
          Products you add will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-surface rounded-2xl border border-line overflow-hidden">
      {cart.map((item, index) => (
        <CartItem
          key={item.id}
          item={item}
          isLast={index === cart.length - 1}
          onIncrease={addToCart}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
        />
      ))}
    </View>
  );
}
