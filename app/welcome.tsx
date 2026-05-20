// 01 · Welcome — hero entry screen. Title sits ABOVE the photo card so it's
// always visible in the first viewport (no scroll required on iPhone SE).
import React from "react";
import { View, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Display, Italic, Mono } from "@/components/Type";
import { Pill } from "@/components/Pill";
import { Logo } from "@/components/Logo";
import { Starburst } from "@/components/Starburst";
import { Sunburst } from "@/components/Sunburst";
import { Halftone } from "@/components/Halftone";
import { ArcText } from "@/components/ArcText";
import { colors } from "@/theme/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.pink }}>
      <StatusBar style="light" />

      <Sunburst
        rays={32}
        color={colors.butter}
        opacity={0.16}
        style={{ top: "15%", height: "85%", left: "-20%", right: "-20%" }}
      />

      {/* top wordmark bar */}
      <View
        style={{
          paddingHorizontal: 28,
          paddingTop: insets.top + 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Logo size={44} />
        <Mono size={11} color={colors.cream}>
          EST · 1957
        </Mono>
      </View>

      {/* Hero photo card — sits below title, takes remaining space */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 22,
          paddingTop: 14,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 27,
            top: 19,
            right: 17,
            bottom: -4,
            backgroundColor: colors.ink,
            borderRadius: 32,
          }}
        />
        <View
          style={{
            flex: 1,
            borderRadius: 32,
            overflow: "hidden",
            borderWidth: 2,
            borderColor: colors.ink,
          }}
        >
          <ImageBackground
            source={require("../assets/shaker-fries.jpg")}
            style={{ flex: 1 }}
            imageStyle={{ resizeMode: "cover" }}
          >
            <Halftone color={colors.ink} opacity={0.18} dot={1.4} size={6} />
          </ImageBackground>
        </View>

        {/* HOT & FRESH starburst top-right */}
        <View style={{ position: "absolute", top: -2, right: 4 }}>
          <Starburst size={84} points={18} fill={colors.butter} rotate={-12}>
            <Display
              size={12}
              color={colors.ink}
              style={{ textAlign: "center" }}
            >
              HOT &{"\n"}FRESH
            </Display>
            <Mono
              size={7}
              color={colors.ink}
              style={{ marginTop: 2, textAlign: "center" }}
            >
              ★ DAILY ★
            </Mono>
          </Starburst>
        </View>

        {/* NO.1 curved seal bottom-left */}
        <View
          style={{
            position: "absolute",
            bottom: 2,
            left: 14,
            width: 78,
            height: 78,
          }}
        >
          <View
            style={
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: 78,
                height: 78,
                borderRadius: 39,
                backgroundColor: colors.pink,
                borderWidth: 2,
                borderColor: colors.cream,
              } as any
            }
          />
          <View style={{ position: "absolute", top: -4, left: -4 }}>
            <ArcText
              text="ARCHIE'S · BURGERS · SHAKES · "
              size={86}
              fontSize={8}
              color={colors.cream}
            />
          </View>
          <View
            style={
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: "center",
                justifyContent: "center",
              } as any
            }
          >
            <Display size={20} color={colors.cream}>
              NO.1
            </Display>
          </View>
        </View>
      </View>
      {/* Title block — above the fold */}
      <View style={{ paddingHorizontal: 28, marginTop: 18 }}>
        <Display
          size={58}
          color={colors.cream}
          shadow={{ color: colors.ink, x: 4, y: 4 }}
        >
          FAST
        </Display>
        <Display
          size={58}
          color={colors.cream}
          shadow={{ color: colors.ink, x: 4, y: 4 }}
          style={{ marginTop: -6 }}
        >
          FOOD.
        </Display>
        <Display
          size={58}
          color={colors.butter}
          shadow={{ color: colors.ink, x: 4, y: 4 }}
          style={{ marginTop: 2 }}
        >
          SLOW
        </Display>
        <Display
          size={58}
          color={colors.butter}
          shadow={{ color: colors.ink, x: 4, y: 4 }}
          style={{ marginTop: -6 }}
        >
          TASTE.
        </Display>
        <Italic
          size={18}
          color={colors.cream}
          upper={false}
          style={{ marginTop: 6 }}
        >
          — since '57, slung with love.
        </Italic>
      </View>
      {/* CTA stack */}
      <View
        style={{
          paddingHorizontal: 22,
          paddingBottom: insets.bottom + 16,
          paddingTop: 14,
          gap: 10,
          backgroundColor: colors.pink,
        }}
      >
        <Pill
          kind="cream"
          size="lg"
          full
          onPress={() => router.push("/signup")}
        >
          Create an account
        </Pill>
        <Pill kind="glass" size="lg" full onPress={() => router.push("/login")}>
          I already have one
        </Pill>
        <Mono
          size={10}
          color="rgba(255,241,220,0.7)"
          style={{ textAlign: "center", marginTop: 2 }}
        >
          ★ By continuing · Terms & Privacy ★
        </Mono>
      </View>
    </View>
  );
}
