import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Image, Pressable, Animated, Easing, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCTS } from '../data/products';
import { getTone, initials } from '../components/ProductThumb';
import { formatPrice } from '../utils/format';

// Products shown in the hero, in slot order (wide keyboard first, tall chair second)
const FEATURED_IDS = ['1', '5', '4', '2'];

// Shorter names used on the landing tiles only (the shop keeps the full product names)
const LANDING_LABELS = {
  '2': 'Mouse',
  '4': 'Speaker',
  '5': 'Chair',
};

// Collage slots for the hero: position, size and resting tilt of each product tile
const SLOTS = [
  { top: 0, left: 0, width: '56%', height: '54%', rotate: '-5deg' },
  { top: 36, right: 0, width: '44%', height: '44%', rotate: '6deg' },
  { bottom: 0, left: '8%', width: '46%', height: '41%', rotate: '4deg' },
  { bottom: 22, right: '2%', width: '42%', height: '37%', rotate: '-7deg' },
];

function HeroTile({ product, slot, index }) {
  const tone = getTone(product.category);
  // useRef: animated values must survive re-renders without being recreated
  const enter = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;

  // useEffect: staggered pop-in, then an endless gentle float (stopped on unmount)
  useEffect(() => {
    const intro = Animated.spring(enter, {
      toValue: 1,
      delay: 120 + index * 110,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
    });
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 2400 + index * 300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2400 + index * 300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    intro.start();
    loop.start();
    return () => {
      intro.stop();
      loop.stop();
    };
  }, [enter, float, index]);

  const { rotate, ...position } = slot;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        ...position,
        opacity: enter,
        transform: [
          { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, index % 2 ? 8 : -8] }) },
          { scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) },
          { rotate },
        ],
      }}
    >
      <View
        className="flex-1 rounded-3xl p-3 bg-surface border border-line"
        style={{ elevation: 4, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } }}
      >
        {/* PRODUCT PHOTO (falls back to the initials tile if a product has no image) */}
        <View className="flex-1 items-center justify-center">
          {product.image ? (
            <Image source={product.image} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
          ) : (
            <View className="w-full h-full rounded-2xl items-center justify-center" style={{ backgroundColor: tone.bg }}>
              <Text className="text-4xl font-semibold tracking-tight" style={{ color: tone.fg }}>
                {initials(product.productName)}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row justify-between items-center mt-2 px-1">
          <Text className="flex-1 text-xs font-medium text-ink mr-2" numberOfLines={1}>
            {LANDING_LABELS[product.id] ?? product.productName}
          </Text>
          <View className="bg-subtle px-2 py-0.5 rounded-full">
            <Text className="text-[11px] font-semibold text-ink">{formatPrice(product.price)}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// Fades and lifts its children into place after `delay` ms
function FadeUp({ delay, children }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: 1,
      delay,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [progress, delay]);

  return (
    <Animated.View
      style={{
        opacity: progress,
        transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
      }}
    >
      {children}
    </Animated.View>
  );
}

export default function LandingScreen({ onStart }) {
  // useMemo: resolve the featured products (with photos) from the static catalog
  const featured = useMemo(
    () => FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean),
    []
  );
  const pressScale = useRef(new Animated.Value(1)).current;
  const { height } = useWindowDimensions();
  // Collage scales with the screen so headline + CTA always fit on smaller phones
  const heroHeight = Math.max(320, Math.min(400, height * 0.48));

  const animatePress = (toValue) =>
    Animated.spring(pressScale, { toValue, friction: 6, useNativeDriver: true }).start();

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 px-6 pt-4 pb-6">
        {/* WORDMARK */}
        <FadeUp delay={0}>
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold text-ink tracking-tight">TechStore</Text>
            <Text className="text-xs text-muted">{PRODUCTS.length} products</Text>
          </View>
        </FadeUp>

        {/* HERO COLLAGE */}
        <View className="flex-1 justify-center">
          <View style={{ height: heroHeight }}>
            {featured.map((product, index) => (
              <HeroTile key={product.id} product={product} slot={SLOTS[index]} index={index} />
            ))}
          </View>
        </View>

        {/* HEADLINE */}
        <FadeUp delay={600}>
          <Text className="text-4xl font-semibold text-ink tracking-tight leading-tight">
            Gear up your desk.
          </Text>
          <Text className="text-base text-muted mt-2">Pick, add, check out. That's it.</Text>
        </FadeUp>

        {/* PRIMARY CTA */}
        <FadeUp delay={760}>
          <Animated.View style={{ transform: [{ scale: pressScale }], marginTop: 28 }}>
            <Pressable
              onPress={onStart}
              onPressIn={() => animatePress(0.97)}
              onPressOut={() => animatePress(1)}
              accessibilityRole="button"
              className="bg-ink py-4 px-5 rounded-2xl flex-row items-center justify-between"
            >
              <Text className="text-white text-base font-semibold">Start shopping</Text>
              <Text className="text-white text-lg">→</Text>
            </Pressable>
          </Animated.View>
        </FadeUp>
      </View>
    </SafeAreaView>
  );
}
