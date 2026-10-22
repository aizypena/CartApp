import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

import { CartProvider } from './src/context/CartContext';
import LandingScreen from './src/screens/LandingScreen';
import AuthScreen from './src/screens/AuthScreen';
import ShopScreen from './src/screens/ShopScreen';

export default function App() {
  // Navigation State: 'landing' | 'auth' | 'shop'
  const [currentScreen, setCurrentScreen] = useState('landing');

  // Mock Users DB & Auth State (in-memory only, resets on app restart)
  const [usersDB, setUsersDB] = useState([
    { email: 'test@test.com', password: 'password123' }, // Default test user
  ]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginSuccess = useCallback((email) => {
    setLoggedInUser(email);
    setCurrentScreen('shop');
  }, []);

  const handleLogout = useCallback(() => {
    setLoggedInUser(null);
    setCurrentScreen('landing');
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <CartProvider>
        {currentScreen === 'landing' && <LandingScreen onStart={() => setCurrentScreen('auth')} />}

        {currentScreen === 'auth' && (
          <AuthScreen
            onBack={() => setCurrentScreen('landing')}
            onLoginSuccess={handleLoginSuccess}
            usersDB={usersDB}
            setUsersDB={setUsersDB}
          />
        )}

        {currentScreen === 'shop' && <ShopScreen loggedInUser={loggedInUser} onLogout={handleLogout} />}
      </CartProvider>
    </SafeAreaProvider>
  );
}
