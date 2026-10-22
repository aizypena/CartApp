import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import ProductCard from '../components/ProductCard';
import CartList from '../components/CartList';
import CartModal from '../components/CartModal';
import OrderSummary from '../components/OrderSummary';
import Toast from '../components/Toast';

export default function ShopScreen({ loggedInUser, onLogout }) {
  const { products, cart, addToCart, decreaseQuantity, clearCart, totalItemCount, finalTotal, toast } =
    useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const insets = useSafeAreaInsets();

  // useMemo: category chips derived from the product data instead of hardcoded
  const categories = useMemo(
    () => ['All', ...new Set(products.map((p) => p.category))],
    [products]
  );

  // useMemo: filtered product list only recomputes when the filter or products change
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  // useMemo: O(1) quantity lookup per product card
  const quantities = useMemo(
    () => Object.fromEntries(cart.map((item) => [item.id, item.quantity])),
    [cart]
  );

  const itemLabel = `${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'}`;

  const handleCheckout = () => {
    setIsCartOpen(false);
    Alert.alert(
      'Order placed',
      `Thank you for your purchase of ${itemLabel} totalling ${formatPrice(finalTotal)}.`,
      [{ text: 'OK', onPress: clearCart }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top', 'left', 'right']}>
      {/* HEADER BAR */}
      <View className="px-5 pt-2 pb-4 flex-row justify-between items-center">
        <View className="flex-1 mr-3">
          <Text className="text-xs text-muted">Signed in as</Text>
          <Text className="text-sm font-medium text-ink" numberOfLines={1}>
            {loggedInUser || 'Guest'}
          </Text>
        </View>

        <TouchableOpacity onPress={onLogout} activeOpacity={0.6} className="px-3 py-2 mr-2">
          <Text className="text-sm text-body">Sign out</Text>
        </TouchableOpacity>

        {/* REAL-TIME CART COUNT: tap to open the cart */}
        <TouchableOpacity
          onPress={() => setIsCartOpen(true)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={`Open cart, ${itemLabel}`}
          className="flex-row items-center bg-ink pl-4 pr-1.5 py-1.5 rounded-full"
        >
          <Text className="text-white text-sm font-semibold mr-2">Cart</Text>
          <View className="bg-white min-w-6 h-6 px-1.5 rounded-full items-center justify-center">
            <Text className="text-ink text-xs font-semibold">{totalItemCount}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5"
        contentContainerStyle={{ paddingBottom: insets.bottom + (cart.length > 0 ? 112 : 32) }}
        keyboardShouldPersistTaps="handled"
      >
        {/* PAGE TITLE */}
        <Text className="text-3xl font-semibold text-ink tracking-tight mt-2">Shop</Text>
        <Text className="text-sm text-muted mt-1 mb-5">
          {products.length} products for your workspace
        </Text>

        {/* CATEGORY FILTER */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5 -mx-5"
          contentContainerClassName="px-5"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.8}
                className={`mr-2 px-4 py-2 rounded-full border ${
                  isActive ? 'bg-ink border-ink' : 'bg-surface border-line'
                }`}
              >
                <Text className={`text-sm ${isActive ? 'text-white font-medium' : 'text-body'}`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* PRODUCTS LIST */}
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={quantities[product.id] ?? 0}
            onAdd={addToCart}
            onDecrease={decreaseQuantity}
          />
        ))}

        {/* CART SECTION */}
        <View className="mt-8 mb-3 flex-row justify-between items-baseline">
          <Text className="text-xl font-semibold text-ink tracking-tight">Your cart</Text>
          <Text className="text-sm text-muted">{itemLabel}</Text>
        </View>
        <CartList />

        {/* TOTALS & VOUCHER SECTION */}
        {cart.length > 0 && (
          <View className="mt-3">
            <OrderSummary />
          </View>
        )}
      </ScrollView>

      {/* FLOATING CHECKOUT BAR */}
      {cart.length > 0 && (
        <View className="absolute left-5 right-5" style={{ bottom: insets.bottom + 16 }}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCheckout}
            className="bg-ink flex-row justify-between items-center px-5 py-4 rounded-2xl"
          >
            <View>
              <Text className="text-white/60 text-xs">Total · {itemLabel}</Text>
              <Text className="text-white text-lg font-semibold">{formatPrice(finalTotal)}</Text>
            </View>
            <Text className="text-white font-semibold text-base">Checkout</Text>
          </TouchableOpacity>
        </View>
      )}

      <CartModal
        visible={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <Toast toast={toast} />
    </SafeAreaView>
  );
}
