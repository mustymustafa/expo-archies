// FoodSlot — placeholder for art-directed food photography. Replace with
// <Image source={require(...)} /> when you have real shots. Each tone
// gives a different gradient + diagonal stripe overlay.
import React, { ReactNode } from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, Line, Pattern, Rect } from "react-native-svg";
import { Mono } from "./Type";

type Tone = "pink" | "blush" | "cream" | "night" | "deep";

const tones: Record<
  Tone,
  { colors: readonly [string, string, ...string[]]; dark: boolean }
> = {
  pink: { colors: ["#FF4691", "#C8146B"] as const, dark: true },
  blush: { colors: ["#FFE0E9", "#FFD8E7"] as const, dark: false },
  cream: { colors: ["#F7E2C2", "#EFD0A3"] as const, dark: false },
  night: { colors: ["#2A1820", "#7A0838"] as const, dark: true },
  deep: { colors: ["#C8146B", "#7A0838"] as const, dark: true },
};

type Props = {
  tone?: Tone;
  radius?: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function FoodSlot({
  tone = "pink",
  radius = 22,
  label,
  style,
  children,
}: Props) {
  const t = tones[tone];
  const stripeColor = t.dark ? "rgba(255,255,255,0.07)" : "rgba(31,16,20,0.05)";
  return (
    <View style={[{ borderRadius: radius, overflow: "hidden" }, style]}>
      <LinearGradient
        colors={t.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, minHeight: "100%" }}
      />
      {/* diagonal stripe pattern */}
      <View
        style={
          { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as any
        }
      >
        <Svg width="100%" height="100%">
          <Defs>
            <Pattern
              id="fs-stripe"
              patternUnits="userSpaceOnUse"
              width="18"
              height="18"
              patternTransform="rotate(135)"
            >
              <Line
                x1="0"
                y1="0"
                x2="0"
                y2="18"
                stroke={stripeColor}
                strokeWidth="1.2"
              />
            </Pattern>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#fs-stripe)" />
        </Svg>
      </View>
      {label && (
        <View style={{ position: "absolute", bottom: 10, left: 12 }}>
          <Mono
            size={9}
            color={t.dark ? "rgba(255,255,255,0.5)" : "rgba(31,16,20,0.5)"}
          >
            {label}
          </Mono>
        </View>
      )}
      {children}
    </View>
  );
}
