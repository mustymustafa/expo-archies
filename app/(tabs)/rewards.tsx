// 05 · Rewards / Loyalty
import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Ribbon } from '@/components/Ribbon';
import { SectionHead } from '@/components/SectionHead';
import { RewardTracker } from '@/components/RewardTracker';
import { colors, shadow } from '@/theme/tokens';

export default function RewardsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark"/>

      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22, paddingBottom: 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Pressable onPress={() => router.back()} style={{
          width: 44, height: 44, borderRadius: 22, backgroundColor: colors.cream,
          borderWidth: 1.5, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
        }}><Icons.Back size={18}/></Pressable>
        <Mono size={10} color={colors.ink}>MEMBER · 9050 · 0150 · 9888</Mono>
        <View style={{ width: 44 }}/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}>

        {/* Title */}
        <View style={{ paddingHorizontal: 22, paddingTop: 4, paddingBottom: 18 }}>
          <Ribbon tone="pink" tilt={-2} style={{ marginBottom: 14 }}>★ ADDICTS PROGRAM ★</Ribbon>
          <Display size={66} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>REWARD</Display>
          <Italic size={66} color={colors.pink} shadow={{ color: colors.ink, x: 5, y: 5 }}>yourself.</Italic>
        </View>

        {/* Hero tracker */}
        <View style={{ paddingHorizontal: 18 }}>
          <RewardTracker points={42} target={50}/>
        </View>

        {/* Tier ladder */}
        <View style={{ marginTop: 28 }}>
          <SectionHead kicker="Your tier" title="LEVEL UP" action={null}/>
          <View style={{ paddingHorizontal: 18, flexDirection: 'row', gap: 10 }}>
            <TierCard tone="cream" tier="01" name="ROOKIE" threshold="0 PTS" done/>
            <TierCard tone="pink" tier="02" name="REGULAR" threshold="50 PTS" active/>
            <TierCard tone="locked" tier="03" name="ADDICT" threshold="200 PTS"/>
          </View>
        </View>

        {/* Available rewards */}
        <View style={{ marginTop: 30 }}>
          <SectionHead kicker="Ready to claim · 1" title="YOUR REWARDS"/>
          <View style={{ paddingHorizontal: 18, gap: 12 }}>
            <RewardCard status="ready" title="Free Milkshake" sub="£15 min spend" meta="EXPIRES 18 JUN · USE ONCE" cost="01"/>
            <RewardCard status="locked" title="Free Side" sub="Curly fries or onion rings" meta="UNLOCK AT 50 PTS · 8 TO GO" cost="50"/>
            <RewardCard status="locked" title="Birthday Burger" sub="Your favourite, on us" meta="UNLOCKS 14 AUG" cost="🎂"/>
          </View>
        </View>

        {/* How to earn */}
        <View style={{ marginTop: 30, paddingHorizontal: 18 }}>
          <View style={{
            backgroundColor: colors.ink, borderRadius: 28, padding: 22,
            borderWidth: 2, borderColor: colors.ink,
            ...shadow(colors.pinkDeep, 4, 4),
          }}>
            <Mono size={10} color="rgba(255,241,220,0.7)" style={{ marginBottom: 10 }}>HOW TO EARN</Mono>
            <Display size={32} color={colors.cream} shadow={{ color: colors.pink, x: 2, y: 2 }}>EVERY £1</Display>
            <Display size={32} color={colors.butter} shadow={{ color: colors.pink, x: 2, y: 2 }} style={{ marginBottom: 18 }}>= 1 POINT.</Display>
            <View style={{ gap: 14 }}>
              <EarnRow num="01" title="SCAN IN-STORE" desc="Show your QR at the counter"/>
              <EarnRow num="02" title="ORDER IN-APP" desc="Auto-credit · no scan needed"/>
              <EarnRow num="03" title="REFER A FRIEND" desc="+25 pts each · they get 25 too"/>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function TierCard({ tone, tier, name, threshold, active, done }: any) {
  const palettes: any = {
    cream:  { bg: colors.cream, co: colors.ink, ko: colors.mute },
    pink:   { bg: colors.pink,  co: colors.cream, ko: 'rgba(255,241,220,0.85)' },
    locked: { bg: 'transparent', co: colors.mute, ko: colors.mute2 },
  };
  const p = palettes[tone];
  return (
    <View style={{
      flex: 1, backgroundColor: p.bg, borderRadius: 18, padding: 14,
      borderWidth: 1.5, borderColor: colors.ink,
      borderStyle: tone === 'locked' ? 'dashed' : 'solid',
      ...(tone !== 'locked' ? shadow(colors.ink, 3, 3) : {}),
    }}>
      <Mono size={9} color={p.ko}>TIER · {tier}{done ? ' ✓' : ''}</Mono>
      <Display size={22} color={p.co} style={{ marginTop: 6 }}>{name}</Display>
      <Mono size={10} color={p.ko} style={{ marginTop: 2 }}>{threshold}</Mono>
      {active && (
        <View style={{
          position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderRadius: 8,
          backgroundColor: colors.butter, borderWidth: 1.5, borderColor: colors.ink,
        }}/>
      )}
    </View>
  );
}

function RewardCard({ status, title, sub, meta, cost }: any) {
  const isReady = status === 'ready';
  return (
    <View style={{
      backgroundColor: isReady ? colors.cream : 'transparent',
      borderRadius: 22, padding: 16,
      borderWidth: 1.5, borderColor: colors.ink,
      borderStyle: isReady ? 'solid' : 'dashed',
      flexDirection: 'row', alignItems: 'center', gap: 14,
      ...(isReady ? shadow(colors.ink, 4, 4) : {}),
    }}>
      <View style={{
        width: 64, height: 64, borderRadius: 16,
        backgroundColor: isReady ? colors.pink : colors.pinkMist,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, borderColor: colors.ink,
        ...(isReady ? shadow(colors.ink, 2, 2) : {}),
      }}>
        <Display size={22} color={isReady ? colors.cream : colors.pinkDeep}>{cost}</Display>
      </View>
      <View style={{ flex: 1, paddingLeft: 4 }}>
        <Mono size={10} color={isReady ? colors.pinkDeep : colors.mute2}>{isReady ? '★ READY TO CLAIM' : '· LOCKED ·'}</Mono>
        <Display size={22} color={colors.ink}>{title}</Display>
        <Italic size={14} color={colors.ink2}>{sub}</Italic>
        <Mono size={10} color={colors.mute} style={{ marginTop: 4 }}>{meta}</Mono>
      </View>
      {isReady && (
        <View style={{
          width: 40, height: 40, borderRadius: 20, backgroundColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
          borderWidth: 1.5, borderColor: colors.ink,
          ...shadow(colors.pinkDeep, 2, 2),
        }}>
          <Icons.Arrow color={colors.butter} size={16}/>
        </View>
      )}
    </View>
  );
}

function EarnRow({ num, title, desc }: any) {
  return (
    <View style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-start' }}>
      <Display size={22} color={colors.butter} style={{ width: 26 }}>{num}</Display>
      <View style={{ flex: 1 }}>
        <Mono size={11} color={colors.cream}>{title}</Mono>
        <Body weight="500" size={12} color="rgba(255,241,220,0.65)" style={{ marginTop: 2 }}>{desc}</Body>
      </View>
    </View>
  );
}
