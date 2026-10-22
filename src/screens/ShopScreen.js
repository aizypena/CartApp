import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/format';
import ProductCard from '../components/ProductCard';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import Toast from '../components/Toast';

export default function ShopScreen({ loggedInUser, onLogout }) {
  const {
    products,
    cart,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItemCount,
    finalTotal,
    toast,
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const handleCheckout = () => {
    Alert.alert(
      'Order Placed! 🎉',
      `Thank you for your purchase of ${totalItemCount} item(s) for ${formatPrice(finalTotal)}.`,
      [{ text: 'OK', onPress: clearCart }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* HEADER BAR */}
      <View className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex-row justify-between items-center">
        <View className="flex-row items-center flex-1 mr-3">
          <View className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 items-center justify-center mr-3">
            <Text className="text-lg">👤</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              Welcome back
            </Text>
            <Text className="text-base font-bold text-white" numberOfLines={1}>
              {loggedInUser || 'Guest User'}
            </Text>
          </View>
        </View>

        {/* REAL-TIME CART COUNT */}
        <View className="mr-3">
          <Text className="text-2xl">🛒</Text>
          <View className="absolute -top-1 -right-2 bg-rose-500 min-w-5 h-5 px-1 rounded-full items-center justify-center">
            <Text className="text-white text-[10px] font-black">{totalItemCount}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onLogout}
          activeOpacity={0.7}
          className="bg-slate-800 border border-slate-700 px-3.5 py-2 rounded-xl"
        >
          <Text className="text-slate-300 font-bold text-xs">Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName={`px-4 pt-4 ${cart.length > 0 ? 'pb-32' : 'pb-8'}`}
        keyboardShouldPersistTaps="handled"
      >
        {/* SECTION HEADER & CATEGORIES */}
        <View className="mb-4">
          <Text className="text-2xl font-black text-white mb-3">Featured Gear</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="pr-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  activeOpacity={0.8}
                  className={`mr-2 px-4 py-2 rounded-2xl border ${
                    isActive ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <Text className={`font-bold text-xs ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* PRODUCTS LIST */}
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={quantities[product.id] ?? 0}
            onAdd={addToCart}
          />
        ))}

        {/* CART SECTION */}
        <View className="mt-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-black text-white">Your Cart 🛒</Text>
            <View className="bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 rounded-full">
              <Text className="text-indigo-300 text-xs font-bold">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </Text>
            </View>
          </View>

          {cart.length === 0 ? (
            <View className="bg-slate-900 p-8 rounded-3xl border border-slate-800 items-center justify-center">
              <Text className="text-4xl mb-3">🛍️</Text>
              <Text className="text-white font-bold text-base mb-1">Your cart is empty</Text>
              <Text className="text-slate-400 text-xs text-center">
                Tap "Add to Cart" on any product above to start building your setup.
              </Text>
            </View>
          ) : (
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
          )}
        </View>

        {/* TOTALS & VOUCHER SECTION */}
        {cart.length > 0 && <OrderSummary />}
      </ScrollView>

      {/* FLOATING CHECKOUT BAR */}
      {cart.length > 0 && (
        <View className="absolute bottom-6 left-4 right-4">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleCheckout}
            className="bg-indigo-600 flex-row justify-between items-center p-4 rounded-3xl"
          >
            <View>
              <Text className="text-indigo-200 text-xs font-bold uppercase tracking-wider">
                Total ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})
              </Text>
              <Text className="text-white text-2xl font-black">{formatPrice(finalTotal)}</Text>
            </View>

            <View className="bg-white/20 px-5 py-3 rounded-2xl">
              <Text className="text-white font-black text-sm">Checkout →</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <Toast toast={toast} />
    </SafeAreaView>
  );
}
