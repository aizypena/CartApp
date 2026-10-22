import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LandingScreen({ onStart }) {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      {/* Decorative ambient glowing accents */}
      <View className="absolute -top-12 -right-12 w-80 h-80 bg-indigo-600/20 rounded-full -z-10" />
      <View className="absolute bottom-10 -left-16 w-80 h-80 bg-violet-600/15 rounded-full -z-10" />

      <ScrollView contentContainerClassName="px-6 py-8 justify-between flex-grow">

        {/* TOP BRAND BADGE */}
        <View className="items-center mt-6">
          <View className="bg-indigo-500/10 border border-indigo-500/30 px-4 py-1.5 rounded-full flex-row items-center">
            <Text className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
              ⚡ NEXT-GEN WORKSPACE GEAR
            </Text>
          </View>
        </View>

        {/* HERO SECTION */}
        <View className="items-center my-auto py-8">
          {/* Main Logo / Title */}
          <View className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 mb-8 shadow-2xl items-center justify-center">
            <Text className="text-5xl">⚡</Text>
          </View>

          <Text className="text-5xl font-black text-white text-center tracking-tight mb-4 leading-tight">
            Elevate Your <Text className="text-indigo-400">Setup</Text>
          </Text>

          <Text className="text-base text-slate-300 text-center mb-10 leading-relaxed px-2 font-normal">
            Discover premium mechanical keyboards, ergonomic audio, and minimalist office essentials built for peak performance.
          </Text>

          {/* FEATURE HIGHLIGHT PILLS */}
          <View className="flex-row flex-wrap justify-center mb-10">
            <View className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl flex-row items-center m-1">
              <Text className="text-slate-200 text-xs font-semibold">⚡ Fast Shipping</Text>
            </View>
            <View className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl flex-row items-center m-1">
              <Text className="text-slate-200 text-xs font-semibold">🛡️ 2-Yr Warranty</Text>
            </View>
            <View className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl flex-row items-center m-1">
              <Text className="text-slate-200 text-xs font-semibold">⭐ 4.9/5 Rating</Text>
            </View>
          </View>

          {/* PRIMARY CTA BUTTON */}
          <TouchableOpacity
            onPress={onStart}
            activeOpacity={0.8}
            className="bg-indigo-600 px-8 py-4 rounded-2xl shadow-xl w-full items-center flex-row justify-center active:bg-indigo-500"
          >
            <Text className="text-white text-lg font-bold mr-2">Explore Collection</Text>
            <Text className="text-white text-xl font-bold">→</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View className="items-center pb-4">
          <Text className="text-slate-500 text-xs font-medium">
            Join 10,000+ tech enthusiasts worldwide
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
