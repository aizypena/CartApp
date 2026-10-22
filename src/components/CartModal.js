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
        <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />

        <View
          className="bg-canvas rounded-t-3xl max-h-[88%]"
          style={{ paddingBottom: insets.bottom + 12 }}
        >
          {/* GRABBER + HEADER */}
          <View className="items-center pt-2.5">
            <View className="w-10 h-1 rounded-full bg-line" />
          </View>
          <View className="flex-row justify-between items-center px-5 pt-3 pb-4">
            <View>
              <Text className="text-xl font-semibold text-ink tracking-tight">Your cart</Text>
              <Text className="text-muted text-xs mt-0.5">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.6}
              accessibilityLabel="Close cart"
              className="w-9 h-9 bg-subtle rounded-full items-center justify-center"
            >
              <Text className="text-body text-lg leading-5">×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerClassName="px-4 pb-4" keyboardShouldPersistTaps="handled">
            <CartList />
            {cart.length > 0 && (
              <View className="mt-3">
                <OrderSummary />
              </View>
            )}
          </ScrollView>

          {/* CHECKOUT */}
          {cart.length > 0 && (
            <View className="px-4 pt-3 border-t border-line">
              <TouchableOpacity
                onPress={onCheckout}
                activeOpacity={0.85}
                className="bg-ink flex-row justify-between items-center px-5 py-4 rounded-2xl"
              >
                <Text className="text-white font-semibold text-base">Checkout</Text>
                <Text className="text-white font-semibold text-base">{formatPrice(finalTotal)}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
