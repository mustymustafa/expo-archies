// Sunburst — radial-ray backdrop. Used behind hero numbers (the points
// tracker, late-night card). N triangular wedges fanning out from center,
// with a circular alpha mask so the rays fade toward the edges.
import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import Svg, { Defs, Mask, Polygon, RadialGradient, Rect, Stop, G } from 'react-native-svg';

type Props = {
  rays?: number;
  color?: string;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
};

export function Sunburst({ rays = 24, color = '#FFC848', opacity = 0.2, style }: Props) {
  const maskId = 'sunburst-mask-' + rays;
  // Build N alternating wedge polygons radiating from (50,50) to a large radius.
  const R = 200;
  const polys = Array.from({ length: rays }).map((_, i) => {
    const a1 = ((Math.PI * 2) / rays) * i - Math.PI / 2;
    const a2 = ((Math.PI * 2) / rays) * (i + 0.5) - Math.PI / 2;
    const p1 = `${50 + Math.cos(a1) * R},${50 + Math.sin(a1) * R}`;
    const p2 = `${50 + Math.cos(a2) * R},${50 + Math.sin(a2) * R}`;
    return `50,50 ${p1} ${p2}`;
  });

  return (
    <View pointerEvents="none" style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as any, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <RadialGradient id={maskId} cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#fff" stopOpacity={1}/>
            <Stop offset="60%" stopColor="#fff" stopOpacity={0.6}/>
            <Stop offset="100%" stopColor="#fff" stopOpacity={0}/>
          </RadialGradient>
          <Mask id="m">
            <Rect width="100" height="100" fill={`url(#${maskId})`}/>
          </Mask>
        </Defs>
        <G mask="url(#m)" opacity={opacity}>
          {polys.map((p, i) => <Polygon key={i} points={p} fill={color}/>)}
        </G>
      </Svg>
    </View>
  );
}
