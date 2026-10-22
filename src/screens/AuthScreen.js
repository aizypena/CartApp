import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen({ onBack, onLoginSuccess, usersDB, setUsersDB }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Missing Fields', 'Please enter both your email and password.');
      return;
    }

    if (isLoginView) {
      const user = usersDB.find(
        (u) => u.email.toLowerCase() === trimmedEmail.toLowerCase() && u.password === trimmedPassword
      );
      if (user) {
        onLoginSuccess(user.email);
      } else {
        Alert.alert('Authentication Failed', 'Invalid email or password. Please try again.');
      }
    } else {
      const userExists = usersDB.find((u) => u.email.toLowerCase() === trimmedEmail.toLowerCase());
      if (userExists) {
        Alert.alert('Account Exists', 'An account with this email already exists.');
        return;
      }
      setUsersDB([...usersDB, { email: trimmedEmail, password: trimmedPassword }]);
      Alert.alert('Success 🎉', 'Account created successfully! You can now log in.');
      setIsLoginView(true);
      setPassword('');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('test@test.com');
    setPassword('password123');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Decorative background glows */}
      <View className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-600/20 rounded-full -z-10" />
      <View className="absolute -bottom-10 -right-10 w-72 h-72 bg-violet-600/15 rounded-full -z-10" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="px-6 py-6 justify-between flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER / BACK BUTTON */}
          <View className="flex-row items-center justify-between mt-2 mb-6">
            <TouchableOpacity
              onPress={onBack}
              activeOpacity={0.7}
              className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex-row items-center active:bg-slate-800"
            >
              <Text className="text-white font-bold text-base mr-2">←</Text>
              <Text className="text-slate-200 font-semibold text-sm">Back</Text>
            </TouchableOpacity>

            <View className="bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
              <Text className="text-indigo-400 font-bold text-xs uppercase tracking-wider">
                TechStore Account
              </Text>
            </View>
          </View>

          {/* MAIN AUTH CARD */}
          <View className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl my-auto">

            {/* SEGMENTED TAB SWITCHER */}
            <View className="flex-row bg-slate-950 p-1.5 rounded-2xl border border-slate-800/80 mb-6">
              <TouchableOpacity
                onPress={() => setIsLoginView(true)}
                activeOpacity={0.7}
                className={`flex-1 py-3 rounded-xl items-center justify-center ${
                  isLoginView ? 'bg-indigo-600' : 'bg-transparent'
                }`}
              >
                <Text className={`font-bold text-sm ${isLoginView ? 'text-white' : 'text-slate-400'}`}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsLoginView(false)}
                activeOpacity={0.7}
                className={`flex-1 py-3 rounded-xl items-center justify-center ${
                  !isLoginView ? 'bg-indigo-600' : 'bg-transparent'
                }`}
              >
                <Text className={`font-bold text-sm ${!isLoginView ? 'text-white' : 'text-slate-400'}`}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-black text-white text-center mb-1">
              {isLoginView ? 'Welcome Back 👋' : 'Join TechStore 🚀'}
            </Text>
            <Text className="text-slate-300 text-sm text-center mb-6 leading-relaxed">
              {isLoginView
                ? 'Enter your credentials to access your saved cart and orders.'
                : 'Create a new account to unlock member discounts & fast checkout.'}
            </Text>

            {/* DEMO CREDS BADGE / QUICK BUTTON */}
            {isLoginView && (
              <TouchableOpacity
                onPress={fillDemoCredentials}
                activeOpacity={0.7}
                className="bg-indigo-950/60 border border-indigo-500/30 p-3 rounded-2xl mb-5 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1 mr-2">
                  <Text className="text-base mr-2">💡</Text>
                  <Text className="text-indigo-200 text-xs font-medium">
                    Quick Demo: <Text className="font-bold text-indigo-300">test@test.com</Text> /{' '}
                    <Text className="font-bold text-indigo-300">password123</Text>
                  </Text>
                </View>
                <Text className="text-indigo-400 text-xs font-bold">Auto-fill</Text>
              </TouchableOpacity>
            )}

            {/* EMAIL INPUT */}
            <View className="mb-4">
              <Text className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-2">
                Email Address
              </Text>
              <TextInput
                className="bg-slate-950 text-white p-4 rounded-2xl border border-slate-800 text-base"
                placeholder="name@example.com"
                placeholderTextColor="#64748b"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View className="mb-6">
              <Text className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-2">
                Password
              </Text>
              <View className="flex-row items-center bg-slate-950 border border-slate-800 rounded-2xl px-4">
                <TextInput
                  className="flex-1 text-white py-4 text-base"
                  placeholder="••••••••"
                  placeholderTextColor="#64748b"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  className="p-2"
                >
                  <Text className="text-slate-400 text-sm">{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              onPress={handleAuth}
              activeOpacity={0.8}
              className="bg-indigo-600 py-4 rounded-2xl items-center shadow-lg active:bg-indigo-500"
            >
              <Text className="text-white font-bold text-base">
                {isLoginView ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            {/* FOOTER SWITCH LINK */}
            <View className="flex-row justify-center items-center mt-6">
              <Text className="text-slate-400 text-sm">
                {isLoginView ? "Don't have an account? " : 'Already registered? '}
              </Text>
              <TouchableOpacity onPress={() => setIsLoginView(!isLoginView)} activeOpacity={0.7}>
                <Text className="text-indigo-400 font-bold text-sm">
                  {isLoginView ? 'Sign Up' : 'Log In'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

          {/* BOTTOM TRUST BADGE */}
          <View className="items-center mt-6 pb-2">
            <Text className="text-slate-500 text-xs">
              🔒 Demo only — accounts are stored in memory
            </Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
