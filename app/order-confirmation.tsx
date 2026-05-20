// 14 · Order confirmation — celebratory screen with starburst animation,
// order number, ETA and CTAs to track or head home.
import React, { useEffect, useRef } from 'react';
import { View, Pressable, Animated, Easing, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Starburst } from '@/components/Starburst';
import { Sunburst } from '@/components/Sunburst';
import { Halftone } from '@/components/Halftone';
import { Ribbon } from '@/components/Ribbon';
import { comingSoon } from '@/lib/comingSoon';
import { colors, shadow } from '@/theme/tokens';

export default function OrderConfirmation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { order, eta, total, items, addr } = useLocalSearchParams<{
    order?: string;
    eta?: string;
    total?: string;
    items?: string;
    addr?: string;
  }>();

  const burst = useRef(new Animated.Value(0)).current;
  const check = useRef(new Animated.Value(0)).current;
  const card = useRef(new Animated.Value(0)).current;
  const ringRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(burst, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 110,
      }),
      Animated.spring(check, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
        tension: 160,
      }),
      Animated.spring(card, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
        tension: 80,
      }),
    ]).start();

    Animated.loop(
      Animated.timing(ringRotate, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [burst, check, card, ringRotate]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >

      {/* Hero block */}
      <LinearGradient
        colors={[colors.pinkMist, colors.cream]}
        style={{
          paddingTop: insets.top + 18,
          paddingBottom: 30,
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Sunburst rays={28} color={colors.butter} opacity={0.25} />
        <Halftone color={colors.pink} opacity={0.18} />

        <Ribbon tone="butter" tilt={-3}>
          ★ ORDER PLACED ★
        </Ribbon>

        <View
          style={{
            marginTop: 28,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
          }}
        >
          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                {
                  rotate: ringRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          >
            <Starburst size={200} points={16} fill={colors.butter} rotate={0} />
          </Animated.View>
          <Animated.View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.pink,
              borderWidth: 3,
              borderColor: colors.ink,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [
                {
                  scale: burst.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.4, 1],
                  }),
                },
              ],
              opacity: burst,
              ...shadow(colors.maroon, 4, 4),
            }}
          >
            <Animated.View
              style={{
                transform: [{ scale: check }],
                opacity: check,
              }}
            >
              <Icons.Check color={colors.cream} size={56} />
            </Animated.View>
          </Animated.View>
        </View>

        <View style={{ marginTop: 16, alignItems: 'center', paddingHorizontal: 24 }}>
          <Display
            size={48}
            color={colors.ink}
            shadow={{ color: colors.pink, x: 4, y: 4 }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            YOU'RE
          </Display>
          <Italic
            size={44}
            color={colors.pink}
            shadow={{ color: colors.ink, x: 3, y: 3 }}
            style={{ marginTop: -8 }}
          >
            sorted.
          </Italic>
          <Mono size={10} color={colors.mute} style={{ marginTop: 14, textAlign: 'center', lineHeight: 16 }}>
            WE'LL TEXT YOU WHEN YOUR RIDER PICKS IT UP.
          </Mono>
        </View>
      </LinearGradient>

      {/* Detail card */}
      <Animated.View
        style={{
          marginTop: -18,
          marginHorizontal: 18,
          opacity: card,
          transform: [
            {
              translateY: card.interpolate({
                inputRange: [0, 1],
                outputRange: [24, 0],
              }),
            },
          ],
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 24,
            borderWidth: 2,
            borderColor: colors.ink,
            padding: 20,
            ...shadow(colors.ink, 4, 4),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ flex: 1, minWidth: 0 }}>
              <Mono size={10} color={colors.mute}>ORDER</Mono>
              <Display size={22} color={colors.ink} style={{ marginTop: 4 }} numberOfLines={1}>
                #{order ?? 'AR-000000'}
              </Display>
            </View>
            <View
              style={{
                backgroundColor: colors.ink,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 999,
                alignItems: 'center',
              }}
            >
              <Mono size={9} color="rgba(255,200,72,0.7)">ETA</Mono>
              <Mono size={12} color={colors.butter}>{eta ?? '—'}</Mono>
            </View>
          </View>

          <View
            style={{
              marginTop: 16,
              paddingTop: 14,
              borderTopWidth: 1.5,
              borderTopColor: colors.line2,
              gap: 10,
            }}
          >
            <DetailLine
              icon={<Icons.Pin color={colors.pinkDeep} size={16} />}
              label="DELIVERING TO"
              value={addr ?? '—'}
            />
            <DetailLine
              icon={<Icons.Bag color={colors.pinkDeep} size={16} />}
              label="ITEMS"
              value={`${items ?? '0'} item${items === '1' ? '' : 's'}`}
            />
            <DetailLine
              icon={<Icons.Star color={colors.pinkDeep} size={16} />}
              label="TOTAL CHARGED"
              value={`£${total ?? '0.00'}`}
            />
          </View>
        </View>
      </Animated.View>

      {/* CTAs */}
      <Animated.View
        style={{
          paddingHorizontal: 18,
          paddingTop: 24,
          opacity: card,
          gap: 12,
        }}
      >
        <Pressable
          onPress={() => comingSoon('Track order')}
          style={({ pressed }) => ({
            backgroundColor: colors.ink,
            borderRadius: 999,
            paddingVertical: 18,
            paddingHorizontal: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            borderWidth: 2,
            borderColor: colors.ink,
            opacity: pressed ? 0.94 : 1,
            ...shadow(colors.maroon, 3, 3),
          })}
        >
          <Icons.Pin color={colors.butter} size={16} />
          <Mono size={12} color={colors.butter}>TRACK ORDER</Mono>
        </Pressable>
        <Pressable
          onPress={() => leaveConfirmation(router, '/home')}
          style={({ pressed }) => ({
            backgroundColor: '#fff',
            borderRadius: 999,
            paddingVertical: 16,
            paddingHorizontal: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: colors.ink,
            opacity: pressed ? 0.94 : 1,
          })}
        >
          <Mono size={11} color={colors.ink}>BACK HOME</Mono>
        </Pressable>
      </Animated.View>

      <Mono
        size={9}
        color={colors.mute}
        style={{
          textAlign: 'center',
          marginTop: 22,
          paddingBottom: insets.bottom + 20,
          letterSpacing: 2,
        }}
      >
        — A RECEIPT IS ON ITS WAY TO YOUR INBOX —
      </Mono>
      </ScrollView>
    </View>
  );
}

function leaveConfirmation(
  router: ReturnType<typeof useRouter>,
  target: '/home' | '/order',
) {
  // Belt-and-braces: if any modal layers somehow survived (deep-link, hot
  // reload), clear them before switching tabs so we don't reveal stale UI.
  router.dismissAll?.();
  router.replace(target);
}

function DetailLine({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <View
        style={{
          width: 30,
          height: 30,
          borderRadius: 10,
          backgroundColor: colors.pinkMist,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Mono size={9} color={colors.mute}>{label}</Mono>
        <Body weight="700" size={13} color={colors.ink} style={{ marginTop: 2 }} numberOfLines={2}>
          {value}
        </Body>
      </View>
    </View>
  );
}
