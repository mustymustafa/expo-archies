// ArcText — curved text along a circular path. Used for the
// "ARCHIE'S · BURGERS · SHAKES ·" seal on the welcome hero.
import React from 'react';
import Svg, { Defs, Path, Text as SvgText, TextPath } from 'react-native-svg';
import { colors } from '@/theme/tokens';

type Props = {
  text?: string;
  size?: number;
  fontSize?: number;
  color?: string;
};

export function ArcText({
  text = "ARCHIE'S · BURGERS · SHAKES · SIDES · ",
  size = 130,
  fontSize = 13,
  color = colors.ink,
}: Props) {
  // top half-circle arc
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <Path id="arc" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"/>
      </Defs>
      <SvgText
        fill={color}
        fontFamily="SpaceMono_700Bold"
        fontSize={fontSize}
        letterSpacing={2}>
        <TextPath href="#arc">{text.repeat(3)}</TextPath>
      </SvgText>
    </Svg>
  );
}
