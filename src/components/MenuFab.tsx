// MenuFab — floating action button that hovers above the bottom nav. Tapping
// it opens the full browseable menu. Pinks/butter brand colors with the
// offset-shadow look used throughout the app.
import React from 'react';
import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from './Icon';
import { Mono } from './Type';
import { colors, shadow } from '@/theme/tokens';

type Props = {
  onPress?: () => void;
  label?: string;
  bottomOffset?: number;
};

export function MenuFab({ onPress, label = 'MENU', bottomOffset }: Props) {
  const insets = useSafeAreaInsets();
  // bottom nav sits at insets.bottom + 10 and is ~76px tall (pill 56 + padding).
  // Park the FAB just above it, right-aligned.
  const bottom = (bottomOffset ?? insets.bottom + 10) + 86;

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        right: 20,
        bottom,
      }}
    >
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingLeft: 14,
          paddingRight: 18,
          height: 52,
          borderRadius: 28,
          backgroundColor: colors.pink,
          borderWidth: 2,
          borderColor: colors.ink,
          opacity: pressed ? 0.94 : 1,
          ...shadow(colors.ink, 3, 4),
        })}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: colors.butter,
            borderWidth: 1.5,
            borderColor: colors.ink,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icons.Burger color={colors.ink} size={18} />
        </View>
        <Mono size={11} color={colors.cream}>
          {label}
        </Mono>
      </Pressable>
    </View>
  );
}
