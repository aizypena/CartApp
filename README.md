# CartApp — React Native Add to Cart

A simple **Add to Cart** app built with **Expo / React Native**, styled with **NativeWind** (Tailwind CSS for React Native), using static product data and React hooks for state management.

## Features

| Requirement | Where it lives |
| --- | --- |
| **Static products** (5 items with `productName`, `description`, `price`) | [`src/data/products.js`](src/data/products.js) |
| **Add to cart** / **remove individual products** (plus +/- quantity) | [`src/context/CartContext.js`](src/context/CartContext.js), [`src/components/CartItem.js`](src/components/CartItem.js) |
| **Real-time item count** (header badge, cart header, checkout bar) | [`src/screens/ShopScreen.js`](src/screens/ShopScreen.js) |
| **Cart list** with product name & price | [`src/components/CartItem.js`](src/components/CartItem.js) |
| **Real-time total** | [`src/components/OrderSummary.js`](src/components/OrderSummary.js) |
| **Bonus: voucher** — enter `discount10` for 10% off, shows original, discount and discounted total | [`src/data/vouchers.js`](src/data/vouchers.js), [`src/components/OrderSummary.js`](src/components/OrderSummary.js) |
| **Tailwind CSS styling** via NativeWind `className` | all components |

## React hooks used

| Hook | Usage |
| --- | --- |
| `useState` | cart items, voucher input/applied voucher/error, category filter, auth form, screen navigation |
| `useEffect` | auto-dismiss toast timer with cleanup ([`useToast`](src/hooks/useToast.js)); resets the voucher when the cart is emptied |
| `useMemo` | item count, subtotal, discount and final total; filtered products; derived categories; memoized context value |
| `useCallback` | stable cart actions (`addToCart`, `removeFromCart`, `applyVoucher`, …) |
| `useContext` | global cart state shared via `CartContext` |
| Custom hooks | `useCart()` (context consumer with a provider guard) and `useToast()` |
| `React.memo` | `ProductCard` only re-renders when its own data changes |

## Project structure

```
App.js                     # Providers + simple screen navigation
src/
  context/CartContext.js   # Cart state, actions, totals, voucher logic
  hooks/useToast.js        # Custom hook for transient notifications
  data/products.js         # Static product list
  data/vouchers.js         # Voucher codes
  components/              # ProductCard, ProductThumb, CartItem, CartList, CartModal, OrderSummary, Toast
  screens/                 # Landing, Auth (mock), Shop
  utils/format.js          # Price formatting (Philippine Peso)
assets/images/products/    # Product photos (.jpg)
```

## Getting started

```bash
npm install
npm start          # then press "a" for Android, or scan the QR code with Expo Go
```

Demo login: `test@test.com` / `password123` (the login is a mock, and accounts live only in memory).

The APK is located at:

```
android/app/build/outputs/apk/release/app-release.apk
```
