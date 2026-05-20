// Ribbon — tilted strip of mono caps text. Used for kicker/eyebrow
// banners ("★ ADDICTS · TIER 02 ★", "WITCHING HOUR", etc).
import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { Mono } from './Type';
import { colors } from '@/theme/tokens';

type Tone = 'pink' | 'butter' | 'ink' | 'cream';

const palettes: Record<Tone, { bg: string; co: string; sh: string }> = {
  pink:   { bg: colors.pink,   co: colors.cream,  sh: colors.maroon },
  butter: { bg: colors.butter, co: colors.ink,    sh: colors.ink },
  ink:    { bg: colors.ink,    co: colors.butter, sh: colors.pinkDeep },
  cream:  { bg: colors.cream,  co: colors.ink,    sh: colors.pinkDeep },
};

export function Ribbon({
  children, tone = 'pink', tilt = -3, style,
}: { children: ReactNode; tone?: Tone; tilt?: number; style?: StyleProp<ViewStyle> }) {
  const p = palettes[tone];
  return (
    <View style={[{ alignSelf: 'flex-start', transform: [{ rotate: `${tilt}deg` }] }, style]}>
      {/* offset shadow block behind */}
      <View style={{ position: 'absolute', left: 3, top: 3, right: -3, bottom: -3, backgroundColor: p.sh, borderWidth: 1.5, borderColor: colors.ink }}/>
      <View style={{ backgroundColor: p.bg, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1.5, borderColor: colors.ink }}>
        <Mono size={11} color={p.co}>{children as any}</Mono>
      </View>
    </View>
  );
}
