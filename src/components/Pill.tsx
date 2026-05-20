// Pill — the retro CTA button. Flat offset shadow + 1.5px border.
import React, { ReactNode } from 'react';
import { Pressable, View, ViewStyle, StyleProp, GestureResponderEvent } from 'react-native';
import { Mono } from './Type';
import { colors } from '@/theme/tokens';

type Kind = 'pink' | 'ink' | 'cream' | 'butter' | 'ghost' | 'glass';
type Size = 'sm' | 'md' | 'lg';

const palettes: Record<Kind, { bg: string; co: string; sh: string | null; border: string }> = {
  pink:   { bg: colors.pink,   co: colors.cream,  sh: colors.maroon,   border: colors.ink },
  ink:    { bg: colors.ink,    co: colors.butter, sh: colors.pinkDeep, border: colors.ink },
  cream:  { bg: colors.cream,  co: colors.ink,    sh: colors.ink,      border: colors.ink },
  butter: { bg: colors.butter, co: colors.ink,    sh: colors.ink,      border: colors.ink },
  ghost:  { bg: 'transparent', co: colors.ink,    sh: null,            border: colors.ink },
  glass:  { bg: 'rgba(255,241,220,0.15)', co: colors.cream, sh: null,  border: 'rgba(255,241,220,0.4)' },
};

const sizes: Record<Size, { py: number; px: number; fs: number }> = {
  sm: { py: 10, px: 18, fs: 11 },
  md: { py: 14, px: 22, fs: 12 },
  lg: { py: 18, px: 26, fs: 13 },
};

type Props = {
  children: ReactNode;
  kind?: Kind;
  size?: Size;
  full?: boolean;
  icon?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export function Pill({ children, kind = 'pink', size = 'md', full, icon, onPress, style }: Props) {
  const p = palettes[kind];
  const s = sizes[size];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          alignSelf: full ? 'stretch' : 'flex-start',
          opacity: pressed ? 0.92 : 1,
          position: 'relative',
        },
        style,
      ]}>
      {/* offset shadow plate */}
      {p.sh && (
        <View style={{
          position: 'absolute', left: 4, top: 4, right: -4, bottom: -4,
          backgroundColor: p.sh, borderRadius: 999,
        }}/>
      )}
      <View style={{
        backgroundColor: p.bg,
        borderRadius: 999,
        paddingVertical: s.py, paddingHorizontal: s.px,
        borderWidth: 1.5, borderColor: p.border,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        <Mono size={s.fs} color={p.co}>{children as any}</Mono>
        {icon}
      </View>
    </Pressable>
  );
}
