// Halftone — tiled dot pattern overlay. SVG <Pattern> with a circle.
// Used on pink hero cards for that vintage offset-print feel.
import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Svg, { Circle, Defs, Pattern, Rect } from 'react-native-svg';

type Props = {
  size?: number;        // tile size
  dot?: number;         // dot radius
  color?: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
};

export function Halftone({ size = 7, dot = 1.1, color = '#FFF1DC', opacity = 0.35, style }: Props) {
  return (
    <View pointerEvents="none" style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any, style]}>
      <Svg width="100%" height="100%" opacity={opacity}>
        <Defs>
          <Pattern id="ht" x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse">
            <Circle cx={size / 2} cy={size / 2} r={dot} fill={color}/>
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#ht)"/>
      </Svg>
    </View>
  );
}
