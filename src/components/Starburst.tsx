// Starburst — the retro stamp/seal motif. N-pointed star drawn as an
// SVG polygon with alternating inner/outer radii. Drop in a corner of
// a hero card with text inside ("HOT & FRESH", "NEXT REWARD", etc).
import React, { ReactNode } from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { colors } from "@/theme/tokens";

type Props = {
  size?: number;
  points?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  rotate?: number;
  shadowOffset?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Starburst({
  size = 80,
  points = 16,
  fill = colors.butter,
  stroke = colors.ink,
  strokeWidth = 0,
  rotate = -8,
  shadowOffset = 2,
  children,
  style,
}: Props) {
  const r1 = 50,
    r2 = 38;
  const path = Array.from({ length: points * 2 })
    .map((_, i) => {
      const a = (Math.PI / points) * i - Math.PI / 2;
      const r = i % 2 === 0 ? r1 : r2;
      return `${50 + Math.cos(a) * r},${50 + Math.sin(a) * r}`;
    })
    .join(" ");

  return (
    <View
      style={[
        { width: size, height: size, transform: [{ rotate: `${rotate}deg` }] },
        style,
      ]}
    >
      {/* shadow polygon (offset) */}
      <View
        style={{
          position: "absolute",
          top: shadowOffset,
          left: shadowOffset,
          width: size,
          height: size,
        }}
      >
        <Svg viewBox="0 0 100 100" width="100%" height="100%">
          <Polygon points={path} fill={colors.ink} />
        </Svg>
      </View>
      {/* main polygon */}
      <View
        style={
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: size,
            height: size,
          } as any
        }
      >
        <Svg viewBox="0 0 100 100" width="100%" height="100%">
          <Polygon
            points={path}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
          padding: 6,
        }}
      >
        {children}
      </View>
    </View>
  );
}
