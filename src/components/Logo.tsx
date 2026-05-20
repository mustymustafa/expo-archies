// Logo — placeholder "A" mark. Drop in your real logo as an Image when ready.
import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { Display } from './Type';
import { colors } from '@/theme/tokens';

export function Logo({
  size = 36, style, onCream = false,
}: { size?: number; style?: StyleProp<ViewStyle>; onCream?: boolean }) {
  return (
    <View
      style={[
        {
          width: size, height: size, borderRadius: size / 2,
          backgroundColor: onCream ? colors.pink : colors.cream,
          borderWidth: 2, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
        },
        style,
      ]}>
      <Display size={size * 0.62} color={onCream ? colors.cream : colors.pink} style={{ marginTop: size * 0.04 }}>
        A
      </Display>
    </View>
  );
}
