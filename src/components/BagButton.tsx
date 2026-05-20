// Bag pill — shopping bag icon with a live count badge that pulses when
// the count changes. Used in the Home + Order top bars.
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View, Easing } from 'react-native';
import { Icons } from './Icon';
import { Mono } from './Type';
import { useCart } from '@/store/cart';
import { colors } from '@/theme/tokens';

type Props = {
  onPress?: () => void;
  tone?: 'light' | 'dark';
};

export function BagButton({ onPress, tone = 'light' }: Props) {
  const { count } = useCart();
  const scale = useRef(new Animated.Value(1)).current;
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      scale.setValue(0.6);
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.25,
          useNativeDriver: true,
          friction: 4,
          tension: 180,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 140,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
    prev.current = count;
  }, [count, scale]);

  const bg = tone === 'dark' ? 'rgba(255,255,255,0.10)' : '#fff';
  const iconColor = tone === 'dark' ? colors.cream : colors.ink;
  const borderColor = tone === 'dark' ? 'transparent' : colors.ink;
  const borderWidth = tone === 'dark' ? 0 : 1.5;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: bg,
        borderWidth,
        borderColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icons.Bag size={20} color={iconColor} />
      {count > 0 && (
        <Animated.View
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            minWidth: 20,
            height: 20,
            paddingHorizontal: 5,
            borderRadius: 10,
            backgroundColor: colors.pink,
            borderWidth: 1.5,
            borderColor: tone === 'dark' ? colors.ink : colors.cream,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale }],
          }}
        >
          <Mono size={9} color={colors.cream}>
            {count > 99 ? '99+' : String(count)}
          </Mono>
        </Animated.View>
      )}
    </Pressable>
  );
}

// Inline badge — same animated badge but rendered next to arbitrary children,
// e.g. the bottom-nav bag tab. Optional, drop-in.
export function CartBadge({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { count } = useCart();
  if (count <= 0) return null;
  return (
    <View
      style={{
        minWidth: 18,
        height: 18,
        paddingHorizontal: 4,
        borderRadius: 9,
        backgroundColor: colors.pink,
        borderWidth: 1.5,
        borderColor: tone === 'dark' ? colors.ink : colors.cream,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Mono size={9} color={colors.cream}>
        {count > 99 ? '99+' : String(count)}
      </Mono>
    </View>
  );
}
