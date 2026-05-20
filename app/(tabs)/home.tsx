// 04 · Home — the cinematic, personalized feed.
import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Display, Italic, Mono, Body } from "@/components/Type";
import { Pill } from "@/components/Pill";
import { Logo } from "@/components/Logo";
import { Icons } from "@/components/Icon";
import { Starburst } from "@/components/Starburst";
import { Sunburst } from "@/components/Sunburst";
import { Halftone } from "@/components/Halftone";
import { Ribbon } from "@/components/Ribbon";
import { SectionHead } from "@/components/SectionHead";
import { RewardTracker } from "@/components/RewardTracker";
import { FoodSlot } from "@/components/FoodSlot";
import { MenuFab } from "@/components/MenuFab";
import { BagButton } from "@/components/BagButton";
import { foodImages } from "@/lib/foodImages";
import { colors, shadow } from "@/theme/tokens";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark" />

      {/* Top bar */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 22,
          paddingBottom: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CircleBtn onPress={() => router.push("/menu")}>
          <Icons.Menu size={20} />
        </CircleBtn>
        <Logo size={44} />
        <BagButton onPress={() => router.push("/bag")} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}
      >
        {/* Greeting */}
        <View
          style={{
            paddingHorizontal: 22,
            paddingTop: 8,
            paddingBottom: 18,
            position: "relative",
          }}
        >
          <Mono size={11} color={colors.pinkDeep}>
            · FRIDAY · EVENING · JAMES ·
          </Mono>
          <View style={{ marginTop: 6 }}>
            <Display
              size={64}
              color={colors.ink}
              shadow={{ color: colors.pink, x: 4, y: 4 }}
            >
              HUNGRY
            </Display>
            <Italic
              size={64}
              color={colors.pink}
              shadow={{ color: colors.ink, x: 4, y: 4 }}
              style={{ marginTop: -12, marginLeft: 8 }}
            >
              yet?
            </Italic>
          </View>
          <View style={{ position: "absolute", top: 4, right: 18 }}>
            <Starburst size={56} points={12} fill={colors.butter} rotate={14}>
              <Display size={11} color={colors.ink}>
                2X{"\n"}PTS
              </Display>
              <Mono size={6} color={colors.ink} style={{ marginTop: 1 }}>
                WEEKEND
              </Mono>
            </Starburst>
          </View>
        </View>

        {/* Tracker */}
        <View style={{ paddingHorizontal: 18 }}>
          <RewardTracker points={42} target={50} />
        </View>

        {/* Quick actions */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 18,
            paddingTop: 18,
          }}
        >
          <ActionTile
            flex={1.4}
            tone="ink"
            big
            onPress={() => router.push("/scan")}
            icon={<Icons.QR color={colors.butter} size={22} />}
            kicker="TAP TO SCAN"
            title="EARN POINTS"
          />
          <ActionTile
            flex={1}
            tone="butter"
            onPress={() => router.push("/menu")}
            icon={<Icons.Bookmark color={colors.ink} size={18} />}
            kicker="14 ITEMS"
            title="SAVED"
          />
          <ActionTile
            flex={1}
            tone="pink"
            onPress={() => router.push("/order")}
            icon={<Icons.Refresh color={colors.cream} size={18} />}
            kicker="ONE TAP"
            title="REORDER"
          />
        </View>

        {/* YOUR USUAL */}
        <View style={{ marginTop: 32 }}>
          <SectionHead
            kicker="Personalized"
            title="YOUR USUAL"
            onActionPress={() => router.push("/order")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, gap: 14 }}
          >
            <BigFoodCard
              tone="pink"
              tag="ORDERED 14×"
              title="Triple Smash Combo"
              meta="£11.20 · 12 min"
              badge="Your #1"
              image={foodImages.smash}
              onPress={() => router.push("/item/triple-smash-combo")}
            />
            <BigFoodCard
              tone="cream"
              tag="LAST TUESDAY"
              title="Salted Caramel Shake"
              meta="£4.95 · add-on"
              image={foodImages.shake}
              onPress={() => router.push("/item/salted-caramel-shake")}
            />
            <BigFoodCard
              tone="blush"
              tag="REORDER READY"
              title="Curly Fries · Large"
              meta="£3.20 · 6 min"
              image={foodImages.fries}
              onPress={() => router.push("/item/curly-fries")}
            />
          </ScrollView>
        </View>

        {/* TRENDING NEAR YOU */}
        <View style={{ marginTop: 28 }}>
          <SectionHead
            kicker="Manchester · Piccadilly"
            title="TRENDING NEAR YOU"
            onActionPress={() => router.push("/order")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, gap: 14 }}
          >
            <MidFoodCard
              tone="pink"
              title="Hot Honey Crispy"
              meta="3.1 mi · 8 min"
              rank={1}
              image={foodImages.honey}
              onPress={() => router.push("/item/hot-honey-crispy")}
            />
            <MidFoodCard
              tone="cream"
              title="Double Cheese Smash"
              meta="3.2 mi · 12 min"
              rank={2}
              image={foodImages.burgers}
              onPress={() => router.push("/item/double-cheese-smash")}
            />
            <MidFoodCard
              tone="blush"
              title="Pink Sauce Wings"
              meta="3.5 mi · 10 min"
              rank={3}
              image={foodImages.wings}
              onPress={() => router.push("/item/pink-sauce-wings")}
            />
            <MidFoodCard
              tone="deep"
              title="OG Milkshake Stack"
              meta="3.6 mi · 7 min"
              rank={4}
              image={foodImages.milkshake}
              onPress={() => router.push("/item/og-milkshake-stack")}
            />
          </ScrollView>
        </View>

        {/* LATE NIGHT PICKS */}
        <View style={{ marginTop: 28 }}>
          <SectionHead
            kicker="Until 03:00 · open now"
            title="LATE NIGHT PICKS"
            onActionPress={() => router.push("/order")}
          />
          <View style={{ paddingHorizontal: 18 }}>
            <View
              style={{
                borderRadius: 28,
                overflow: "hidden",
                borderWidth: 2,
                borderColor: colors.ink,
                ...shadow(colors.ink, 4, 4),
              }}
            >
              <LinearGradient
                colors={["#1F1014", "#3A1822", colors.pinkDarker]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ padding: 20, flexDirection: "row", minHeight: 220 }}
              >
                <Sunburst rays={24} color={colors.butter} opacity={0.1} />
                <Halftone color={colors.cream} opacity={0.3} />
                <View style={{ flex: 1, justifyContent: "space-between", minWidth: 0 }}>
                  <View>
                    <Ribbon tone="butter" tilt={-3}>
                      ★ WITCHING HOUR ★
                    </Ribbon>
                    <View style={{ marginTop: 14 }}>
                      <Display
                        size={30}
                        color={colors.butter}
                        shadow={{ color: colors.maroon, x: 3, y: 3 }}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        HITS
                      </Display>
                      <Display
                        size={30}
                        color={colors.butter}
                        shadow={{ color: colors.maroon, x: 3, y: 3 }}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                      >
                        HARDER
                      </Display>
                      <Italic
                        size={24}
                        color={colors.cream}
                        shadow={{ color: colors.maroon, x: 3, y: 3 }}
                        style={{ marginTop: -4, marginLeft: 4 }}
                      >
                        at midnight.
                      </Italic>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                    <Pill
                      kind="butter"
                      size="sm"
                      onPress={() => router.push("/order")}
                    >
                      Order late
                    </Pill>
                    <Pill
                      kind="glass"
                      size="sm"
                      onPress={() => router.push("/order")}
                    >
                      See menu
                    </Pill>
                  </View>
                </View>
                <View style={{ width: 100, marginLeft: 12 }}>
                  <FoodSlot
                    tone="night"
                    radius={18}
                    image={foodImages.late}
                    style={{ flex: 1 }}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* MOST ADDICTIVE */}
        <View style={{ marginTop: 28 }}>
          <SectionHead
            kicker="By the people"
            title="MOST ADDICTIVE"
            onActionPress={() => router.push("/order")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18, gap: 14 }}
          >
            <PortraitCard
              tone="pink"
              rank={1}
              title="The OG Smash"
              addicts="12.4K addicts"
              tag="🔥 No.1 this week"
              image={foodImages.og}
              onPress={() => router.push("/item/og-smash")}
            />
            <PortraitCard
              tone="blush"
              rank={2}
              title="Pink Sauce Crispy"
              addicts="9.8K addicts"
              tag="↑ trending"
              image={foodImages.pink}
              onPress={() => router.push("/item/pink-sauce-crispy")}
            />
            <PortraitCard
              tone="cream"
              rank={3}
              title="Loaded Curly"
              addicts="7.1K addicts"
              tag="New"
              image={foodImages.curly}
              onPress={() => router.push("/item/loaded-curly")}
            />
          </ScrollView>
        </View>

        {/* WANT IT NOW banner */}
        <View style={{ paddingHorizontal: 18, marginTop: 28 }}>
          <View
            style={{
              borderRadius: 28,
              overflow: "hidden",
              minHeight: 240,
              borderWidth: 2,
              borderColor: colors.ink,
              backgroundColor: colors.pink,
              ...shadow(colors.ink, 4, 4),
            }}
          >
            <Sunburst rays={28} color={colors.butter} opacity={0.22} />
            <Halftone color={colors.cream} opacity={0.35} />
            <View style={{ padding: 24, flex: 1, justifyContent: "flex-end" }}>
              <Ribbon tone="butter" tilt={-4}>
                ★ 25 MIN OR LESS ★
              </Ribbon>
              <Display
                size={64}
                color={colors.cream}
                shadow={{ color: colors.ink, x: 4, y: 4 }}
                style={{ marginTop: 14 }}
              >
                WANT IT
              </Display>
              <Italic
                size={56}
                color={colors.butter}
                shadow={{ color: colors.ink, x: 4, y: 4 }}
                style={{ marginTop: -12, marginLeft: 6 }}
              >
                now?
              </Italic>
              <Mono
                size={11}
                color={colors.cream}
                style={{ marginTop: 12, maxWidth: 240, lineHeight: 16 }}
              >
                DOORSTEP DROP — 25 MIN FROM YOUR NEAREST ARCHIE'S.
              </Mono>
              <View style={{ marginTop: 16 }}>
                <Pill
                  kind="ink"
                  size="md"
                  icon={<Icons.Arrow color={colors.butter} size={14} />}
                  onPress={() => router.push("/order")}
                >
                  Start order
                </Pill>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating menu shortcut */}
      <MenuFab onPress={() => router.push("/browse-menu")} />
    </View>
  );
}

function CircleBtn({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#fff",
        borderWidth: 1.5,
        borderColor: colors.ink,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Pressable>
  );
}

function ActionTile({ tone, big, icon, kicker, title, flex, onPress }: any) {
  const palette = TILE_TONES[tone as keyof typeof TILE_TONES] ?? TILE_TONES.ink;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex,
        minHeight: 90,
        padding: big ? 16 : 14,
        justifyContent: "space-between",
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: colors.ink,
        backgroundColor: palette.bg,
        opacity: pressed ? 0.92 : 1,
        ...shadow(colors.ink, 3, 3),
      })}
    >
      <View
        style={{
          width: big ? 38 : 30,
          height: big ? 38 : 30,
          borderRadius: 10,
          backgroundColor: palette.iconBg,
          borderWidth: palette.iconBorder ? 1.5 : 0,
          borderColor: palette.iconBorder ?? "transparent",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
      <View>
        {kicker && (
          <Mono size={8} color={palette.kicker}>
            {kicker}
          </Mono>
        )}
        <Display size={big ? 18 : 14} color={palette.title}>
          {title}
        </Display>
      </View>
    </Pressable>
  );
}

const TILE_TONES = {
  ink: {
    bg: colors.ink,
    iconBg: "rgba(255,255,255,0.10)",
    iconBorder: undefined as string | undefined,
    kicker: "rgba(255,241,220,0.7)",
    title: colors.cream,
  },
  butter: {
    bg: colors.butter,
    iconBg: colors.cream,
    iconBorder: colors.ink,
    kicker: colors.ink2,
    title: colors.ink,
  },
  pink: {
    bg: colors.pink,
    iconBg: "rgba(255,241,220,0.18)",
    iconBorder: colors.cream,
    kicker: "rgba(255,241,220,0.85)",
    title: colors.cream,
  },
  cream: {
    bg: "#fff",
    iconBg: colors.pinkMist,
    iconBorder: undefined as string | undefined,
    kicker: colors.mute,
    title: colors.ink,
  },
};

function BigFoodCard({ tone, title, meta, tag, badge, image, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 220,
        height: 300,
        borderRadius: 26,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colors.ink,
        opacity: pressed ? 0.94 : 1,
      })}
    >
      <FoodSlot
        tone={tone}
        radius={0}
        image={image}
        style={{ flex: 1 }}
      />
      <LinearGradient
        colors={["rgba(31,16,20,0.0)", "rgba(31,16,20,0.85)"]}
        locations={[0.4, 1]}
        style={
          { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as any
        }
        pointerEvents="none"
      />
      {badge && (
        <View
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: colors.butter,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 999,
            borderWidth: 1.5,
            borderColor: colors.ink,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Icons.Star color={colors.pink} size={11} />
          <Mono size={9} color={colors.ink}>
            {badge}
          </Mono>
        </View>
      )}
      <View
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          width: 34,
          height: 34,
          borderRadius: 17,
          backgroundColor: "rgba(31,16,20,0.5)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icons.Heart color={colors.cream} size={16} filled />
      </View>
      <View style={{ position: "absolute", left: 16, right: 16, bottom: 14 }}>
        {tag && (
          <Mono size={9} color="rgba(255,241,220,0.9)">
            {tag}
          </Mono>
        )}
        <Display
          size={20}
          color={colors.cream}
          style={{ marginTop: 6 }}
          numberOfLines={2}
        >
          {title}
        </Display>
        <Body
          weight="500"
          size={11}
          color={colors.cream}
          style={{ opacity: 0.9, marginTop: 4 }}
        >
          {meta}
        </Body>
      </View>
    </Pressable>
  );
}

function MidFoodCard({ tone, title, meta, rank, image, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({ width: 160, gap: 8, opacity: pressed ? 0.94 : 1 })}
    >
      <View
        style={{
          height: 180,
          borderRadius: 20,
          overflow: "hidden",
          borderWidth: 1.5,
          borderColor: colors.ink,
        }}
      >
        <FoodSlot
          tone={tone}
          radius={0}
          image={image}
          style={{ flex: 1 }}
        />
        <LinearGradient
          colors={["rgba(31,16,20,0.55)", "rgba(31,16,20,0.0)"]}
          locations={[0, 0.5]}
          style={
            { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as any
          }
          pointerEvents="none"
        />
        <Display
          size={40}
          color="rgba(255,241,220,0.95)"
          shadow={{ color: "rgba(31,16,20,0.45)", x: 2, y: 2 }}
          style={{ position: "absolute", top: 6, left: 12 }}
        >
          #{rank}
        </Display>
      </View>
      <View style={{ paddingHorizontal: 2 }}>
        <Display size={15} color={colors.ink} numberOfLines={2}>
          {title}
        </Display>
        <Mono size={9} color={colors.mute} style={{ marginTop: 4 }}>
          {meta}
        </Mono>
      </View>
    </Pressable>
  );
}

function PortraitCard({ tone, title, addicts, tag, rank, image, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 220,
        height: 320,
        borderRadius: 26,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: colors.ink,
        opacity: pressed ? 0.94 : 1,
      })}
    >
      <FoodSlot
        tone={tone}
        radius={0}
        image={image}
        style={{ flex: 1 }}
      />
      <LinearGradient
        colors={["rgba(31,16,20,0.0)", "rgba(31,16,20,0.85)"]}
        locations={[0.4, 1]}
        style={
          { position: "absolute", top: 0, left: 0, right: 0, bottom: 0 } as any
        }
        pointerEvents="none"
      />
      <Display
        size={150}
        color="rgba(255,241,220,0.22)"
        style={{ position: "absolute", top: -22, right: -4 }}
      >
        {rank}
      </Display>
      <View style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}>
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "rgba(255,241,220,0.18)",
            borderWidth: 1,
            borderColor: "rgba(255,241,220,0.4)",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 999,
          }}
        >
          <Mono size={9} color={colors.cream}>
            {tag}
          </Mono>
        </View>
        <Display
          size={22}
          color={colors.cream}
          style={{ marginTop: 10 }}
          numberOfLines={2}
        >
          {title}
        </Display>
        <Body
          weight="500"
          size={11}
          color={colors.cream}
          style={{ opacity: 0.9, marginTop: 4 }}
        >
          {addicts}
        </Body>
      </View>
    </Pressable>
  );
}
