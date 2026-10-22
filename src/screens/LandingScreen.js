import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, Pressable, Animated, Easing, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PRODUCTS } from '../data/products';
import { getTone, initials } from '../components/ProductThumb';
import { formatPrice } from '../utils/format';

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
        className="flex-1 rounded-3xl p-4 justify-between border border-black/5"
        style={{ backgroundColor: tone.bg }}
      >
        <Text className="text-xs font-medium" style={{ color: tone.fg, opacity: 0.7 }}>
          {product.category}
        </Text>
        <Text className="text-4xl font-semibold tracking-tight" style={{ color: tone.fg }}>
          {initials(product.productName)}
        </Text>
        <View className="flex-row justify-between items-end">
          <Text className="flex-1 text-xs font-medium mr-2" style={{ color: tone.fg }} numberOfLines={1}>
            {product.productName}
          </Text>
          <View className="bg-surface/80 px-2 py-0.5 rounded-full">
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
  // useMemo: the hero shows the first four products from the static catalog
  const featured = useMemo(() => PRODUCTS.slice(0, SLOTS.length), []);
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
