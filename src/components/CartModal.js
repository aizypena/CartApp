import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import CartList from './CartList';
import OrderSummary from './OrderSummary';

export default function CartModal({ visible, onClose, onCheckout }) {
  const { cart, totalItemCount, finalTotal } = useCart();
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 justify-end"
      >
        {/* BACKDROP: tap outside the sheet to close */}
        <Pressable className="absolute inset-0 bg-black/60" onPress={onClose} />

        <View
          className="bg-slate-950 rounded-t-3xl border-t border-slate-800 max-h-[88%]"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          {/* SHEET HEADER */}
          <View className="flex-row justify-between items-center px-5 pt-5 pb-4 border-b border-slate-800">
            <View>
              <Text className="text-2xl font-black text-white">Your Cart 🛒</Text>
              <Text className="text-slate-400 text-xs font-semibold mt-0.5">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              accessibilityLabel="Close cart"
              className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-2xl items-center justify-center"
            >
              <Text className="text-white font-bold text-base">✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerClassName="p-4" keyboardShouldPersistTaps="handled">
            <CartList />
            {cart.length > 0 && (
              <View className="mt-4">
                <OrderSummary />
              </View>
            )}
          </ScrollView>

          {/* CHECKOUT */}
          {cart.length > 0 && (
            <View className="px-4 pt-2">
              <TouchableOpacity
                onPress={onCheckout}
                activeOpacity={0.9}
                className="bg-indigo-600 flex-row justify-between items-center p-4 rounded-3xl"
              >
                <Text className="text-white text-xl font-black">{formatPrice(finalTotal)}</Text>
                <Text className="text-white font-black text-sm">Checkout →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
