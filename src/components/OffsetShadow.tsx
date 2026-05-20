// OffsetShadow — wraps a child View with a flat 4px-offset shadow plate
// underneath, recreating the retro "sticker stuck to paper" look from
// the web design. RN's native shadow doesn't do sharp colored offsets.
import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { colors } from '@/theme/tokens';

type Props = {
  children: ReactNode;
  color?: string;
  x?: number;
  y?: number;
  radius?: number;            // matches child radius
  style?: StyleProp<ViewStyle>;
};

export function OffsetShadow({ children, color = colors.ink, x = 4, y = 4, radius = 0, style }: Props) {
  return (
    <View style={[{ position: 'relative' }, style]}>
      <View style={{
        position: 'absolute',
        left: x, top: y, right: -x, bottom: -y,
        backgroundColor: color, borderRadius: radius,
      }}/>
      {children}
    </View>
  );
}
