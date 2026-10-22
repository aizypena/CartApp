import React from 'react';
import { View, Text } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

// Shared cart items list, used both inline on the shop screen and inside the cart sheet
export default function CartList() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <View className="bg-slate-900 p-8 rounded-3xl border border-slate-800 items-center justify-center">
        <Text className="text-4xl mb-3">🛍️</Text>
        <Text className="text-white font-bold text-base mb-1">Your cart is empty</Text>
        <Text className="text-slate-400 text-xs text-center">
          Tap "Add to Cart" on any product to start building your setup.
        </Text>
      </View>
    );
  }

  return (
    <View className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
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
