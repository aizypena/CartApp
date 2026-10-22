import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { VOUCHERS } from '../data/vouchers';
import { useToast } from '../hooks/useToast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // useState: cart items, voucher input text, the voucher currently applied, and voucher feedback
  const [cart, setCart] = useState([]);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');

  // Custom hook: transient "added to cart" style notifications
  const { toast, showToast } = useToast();

  // useCallback keeps action references stable so memoized children don't re-render needlessly
  const addToCart = useCallback(
    (product) => {
      if (!product?.id) return;
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.id === product.id);
        if (existing) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      showToast(`${product.productName} added to cart`);
    },
    [showToast]
  );

  // Decrease quantity by one; drops the line when it reaches zero
  const decreaseQuantity = useCallback((productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Remove an individual product (the whole line) from the cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const applyVoucher = useCallback(() => {
    const voucher = VOUCHERS[voucherCode.trim().toLowerCase()];
    if (voucher) {
      setAppliedVoucher(voucher);
      setVoucherError('');
    } else {
      setAppliedVoucher(null);
      setVoucherError('Invalid voucher code. Try "discount10".');
    }
  }, [voucherCode]);

  const removeVoucher = useCallback(() => {
    setAppliedVoucher(null);
    setVoucherCode('');
    setVoucherError('');
  }, []);

  // Clear the error as soon as the user edits the code again
  const updateVoucherCode = useCallback((text) => {
    setVoucherCode(text);
    setVoucherError('');
  }, []);

  // useMemo: derived, real-time cart figures recomputed only when their inputs change
  const totalItemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(
    () => (appliedVoucher ? subtotal * appliedVoucher.rate : 0),
    [subtotal, appliedVoucher]
  );

  const finalTotal = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

  // useEffect: reset the voucher once the cart is emptied, so a stale discount never lingers
  useEffect(() => {
    if (cart.length === 0) {
      setAppliedVoucher(null);
      setVoucherCode('');
      setVoucherError('');
    }
  }, [cart.length]);

  // useMemo on the context value prevents re-rendering every consumer on unrelated renders
  const value = useMemo(
    () => ({
      products: PRODUCTS,
      cart,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalItemCount,
      subtotal,
      discountAmount,
      finalTotal,
      voucherCode,
      setVoucherCode: updateVoucherCode,
      appliedVoucher,
      voucherError,
      applyVoucher,
      removeVoucher,
      toast,
    }),
    [
      cart,
      addToCart,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalItemCount,
      subtotal,
      discountAmount,
      finalTotal,
      voucherCode,
      updateVoucherCode,
      appliedVoucher,
      voucherError,
      applyVoucher,
      removeVoucher,
      toast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook: useContext wrapper that guarantees a provider is present
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
