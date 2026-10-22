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

function Field({ label, children }) {
  return (
    <View className="mb-4">
      <Text className="text-xs font-medium text-body mb-2">{label}</Text>
      {children}
    </View>
  );
}

export default function AuthScreen({ onBack, onLoginSuccess, usersDB, setUsersDB }) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Missing fields', 'Please enter both your email and password.');
      return;
    }

    if (isLoginView) {
      const user = usersDB.find(
        (u) => u.email.toLowerCase() === trimmedEmail.toLowerCase() && u.password === trimmedPassword
      );
      if (user) {
        onLoginSuccess(user.email);
      } else {
        Alert.alert('Sign in failed', 'Invalid email or password. Please try again.');
      }
    } else {
      const userExists = usersDB.find((u) => u.email.toLowerCase() === trimmedEmail.toLowerCase());
      if (userExists) {
        Alert.alert('Account exists', 'An account with this email already exists.');
        return;
      }
      setUsersDB([...usersDB, { email: trimmedEmail, password: trimmedPassword }]);
      Alert.alert('Account created', 'You can now sign in with your new account.');
      setIsLoginView(true);
      setPassword('');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('test@test.com');
    setPassword('password123');
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView
          contentContainerClassName="px-6 pt-2 pb-6 flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View className="flex-row items-center justify-between mb-10">
            <TouchableOpacity onPress={onBack} activeOpacity={0.6} className="py-2 pr-3">
              <Text className="text-sm text-body">← Back</Text>
            </TouchableOpacity>
            <Text className="text-base font-semibold text-ink tracking-tight">TechStore</Text>
          </View>

          <Text className="text-3xl font-semibold text-ink tracking-tight">
            {isLoginView ? 'Sign in' : 'Create account'}
          </Text>
          <Text className="text-sm text-muted mt-2 mb-8">
            {isLoginView
              ? 'Welcome back. Enter your details to continue.'
              : 'Create an account to start shopping.'}
          </Text>

          {/* SEGMENTED SWITCHER */}
          <View className="flex-row bg-subtle p-1 rounded-xl mb-6">
            {[
              { label: 'Sign in', active: isLoginView, value: true },
              { label: 'Create account', active: !isLoginView, value: false },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.label}
                onPress={() => setIsLoginView(tab.value)}
                activeOpacity={0.8}
                className={`flex-1 py-2.5 rounded-lg items-center ${tab.active ? 'bg-surface' : ''}`}
              >
                <Text className={`text-sm ${tab.active ? 'text-ink font-semibold' : 'text-muted'}`}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Field label="Email">
            <TextInput
              className="bg-surface text-ink px-4 py-3.5 rounded-xl border border-line text-base"
              placeholder="name@example.com"
              placeholderTextColor="#A3A5AA"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </Field>

          <Field label="Password">
            <View className="flex-row items-center bg-surface border border-line rounded-xl pl-4 pr-2">
              <TextInput
                className="flex-1 text-ink py-3.5 text-base"
                placeholder="Enter your password"
                placeholderTextColor="#A3A5AA"
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={handleAuth}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.6}
                className="px-2 py-2"
              >
                <Text className="text-xs font-medium text-body">{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </Field>

          {/* SUBMIT */}
          <TouchableOpacity
            onPress={handleAuth}
            activeOpacity={0.85}
            className="bg-ink py-4 rounded-2xl items-center mt-2"
          >
            <Text className="text-white font-semibold text-base">
              {isLoginView ? 'Sign in' : 'Create account'}
            </Text>
          </TouchableOpacity>

          {/* DEMO CREDENTIALS */}
          {isLoginView && (
            <View className="mt-6 p-4 rounded-xl border border-dashed border-line flex-row items-center justify-between">
              <View className="flex-1 mr-3">
                <Text className="text-xs font-medium text-body">Demo account</Text>
                <Text className="text-xs text-muted mt-0.5">test@test.com · password123</Text>
              </View>
              <TouchableOpacity onPress={fillDemoCredentials} activeOpacity={0.6} className="py-1">
                <Text className="text-xs font-semibold text-ink underline">Use demo</Text>
              </TouchableOpacity>
            </View>
          )}

          <View className="flex-1" />
          <Text className="text-xs text-muted text-center mt-8">
            Demo app. Accounts are stored in memory only.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
