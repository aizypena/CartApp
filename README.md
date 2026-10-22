# CartApp — React Native Add to Cart

A simple **Add to Cart** app built with **Expo / React Native**, styled with **NativeWind** (Tailwind CSS for React Native), using static product data and React hooks for state management.

## Download the APK

The Android build is attached to this repository's **[Releases page](https://github.com/aizypena/CartApp/releases/latest)**:

1. Open **[Releases → Latest](https://github.com/aizypena/CartApp/releases/latest)**.
2. Under **Assets**, download **`CartApp.apk`**.
3. Open it on an Android phone and allow **"Install unknown apps"** if prompted.

> The APK isn't committed to the source tree (build outputs are git-ignored); it's published as a release asset instead.

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

## Building the Android APK

**Option A: EAS Build (cloud, easiest)**

```bash
npm install -g eas-cli
eas login
npm run build:apk          # eas build -p android --profile preview
```

When the build finishes, EAS gives you a download link for the `.apk`.

**Option B: Local build** (requires Android Studio and its Android SDK)

On Windows (PowerShell), point the build at Android Studio's bundled JDK first. Newer system JDKs (e.g. Java 27) aren't supported by Gradle yet:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
npm run build:apk:local
```

When it prints `BUILD SUCCESSFUL`, the APK is located at:

```
android/app/build/outputs/apk/release/app-release.apk
```

> **Windows tip:** if the build fails with `ninja: error: mkdir(...)`, the Android SDK's bundled Ninja (1.10) can't handle long paths. Replace `Sdk\cmake\3.22.1\bin\ninja.exe` with [Ninja 1.12+](https://github.com/ninja-build/ninja/releases) and make sure Windows long paths are enabled.

## Tech stack

Expo SDK 58 · React Native 0.88 · React 19 · NativeWind 4 · Tailwind CSS 3.4
