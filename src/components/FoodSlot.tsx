// FoodSlot — art-directed food photography slot. When an `image` source is
// passed in, it renders as the background and the tinted gradient/stripe
// pattern sit on top at low opacity to keep the retro feel. When no image
// is given it falls back to the gradient-only placeholder.
import React, { ReactNode } from "react";
import {
  View,
  ViewStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
} from "react-native";
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
  image?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export function FoodSlot({
  tone = "pink",
  radius = 22,
  label,
  image,
  style,
  children,
}: Props) {
  const t = tones[tone];
  const stripeColor = t.dark ? "rgba(255,255,255,0.07)" : "rgba(31,16,20,0.05)";
  const hasImage = !!image;

  return (
    <View style={[{ borderRadius: radius, overflow: "hidden" }, style]}>
      {hasImage ? (
        <Image
          source={image!}
          resizeMode="cover"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <LinearGradient
          colors={t.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1, minHeight: "100%" }}
        />
      )}

      {/* tone tint above image — keeps the riso/branded feel */}
      {hasImage && (
        <LinearGradient
          colors={[
            withAlpha(t.colors[0], t.dark ? 0.45 : 0.22),
            withAlpha(t.colors[1], t.dark ? 0.55 : 0.28),
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}

      {/* diagonal stripe pattern */}
      <View
        style={
          { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as any
        }
        pointerEvents="none"
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
        <View
          style={{ position: "absolute", bottom: 10, left: 12 }}
          pointerEvents="none"
        >
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

function withAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
