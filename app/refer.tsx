// 08 · Refer a friend
import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Sunburst } from '@/components/Sunburst';
import { Halftone } from '@/components/Halftone';
import { Ribbon } from '@/components/Ribbon';
import { SectionHead } from '@/components/SectionHead';
import { colors, shadow } from '@/theme/tokens';

export default function ReferScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark"/>
      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22,
        flexDirection: 'row', justifyContent: 'space-between',
      }}>
        <Pressable onPress={() => router.back()} style={{
          width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
          borderWidth: 1.5, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
        }}><Icons.Back size={18}/></Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>

        {/* Hero card */}
        <View style={{ paddingHorizontal: 18, paddingTop: 12, paddingBottom: 24 }}>
          <View style={{
            borderRadius: 32, overflow: 'hidden',
            borderWidth: 2, borderColor: colors.ink,
            ...shadow(colors.ink, 5, 5),
          }}>
            <LinearGradient
              colors={[colors.pink2, colors.pink, colors.pinkDeep]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ padding: 24, minHeight: 420 }}>
              <Sunburst rays={28} color={colors.butter} opacity={0.18}/>
              <Halftone color={colors.cream} opacity={0.35}/>
              <View>
                <Ribbon tone="butter" tilt={-3}>★ REFER · EARN · REPEAT ★</Ribbon>
                <Display size={66} color={colors.cream} shadow={{ color: colors.ink, x: 5, y: 5 }} style={{ marginTop: 14 }}>BRING</Display>
                <Display size={66} color={colors.cream} shadow={{ color: colors.ink, x: 5, y: 5 }}>A FRIEND.</Display>
                <Italic size={56} color={colors.butter} shadow={{ color: colors.ink, x: 5, y: 5 }} style={{ marginTop: -10, marginLeft: 6 }}>eat free.</Italic>

                <View style={{ flexDirection: 'row', gap: 10, marginTop: 22 }}>
                  <RewardChip kind="cream" kicker="FOR YOU" sum="£5" desc="off your next"/>
                  <RewardChip kind="butter" kicker="FOR THEM" sum="£5" desc="welcome credit"/>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Code card */}
        <View style={{ paddingHorizontal: 18, paddingBottom: 20 }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 22, padding: 18,
            flexDirection: 'row', alignItems: 'center', gap: 12,
            borderWidth: 1.5, borderColor: colors.ink,
            ...shadow(colors.ink, 3, 3),
          }}>
            <View style={{
              width: 48, height: 48, borderRadius: 14, backgroundColor: colors.ink,
              borderWidth: 1.5, borderColor: colors.ink,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.Copy color={colors.butter} size={18}/>
            </View>
            <View style={{ flex: 1 }}>
              <Mono size={10} color={colors.mute}>YOUR INVITE CODE</Mono>
              <Display size={24} color={colors.ink} style={{ marginTop: 4 }}>JAMES-9888</Display>
            </View>
            <Mono size={11} color={colors.pinkDeep}>COPY</Mono>
          </View>
        </View>

        {/* Share */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 6 }}>
          <Mono size={10} color={colors.mute} style={{ marginBottom: 12 }}>SHARE VIA</Mono>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <ShareTile label="Message"><Icons.Message size={22}/></ShareTile>
            <ShareTile label="Email"><Icons.Mail size={22}/></ShareTile>
            <ShareTile label="Socials"><Icons.Share size={22}/></ShareTile>
            <ShareTile label="Copy link"><Icons.Copy size={20}/></ShareTile>
          </View>
        </View>

        {/* Friends progress */}
        <View style={{ marginTop: 28 }}>
          <SectionHead kicker="Your referrals" title="3 ON THE HOOK"/>
          <View style={{ paddingHorizontal: 18, gap: 8 }}>
            <ReferRow name="Maya · @mayaeats" status="ORDERED" credit="+£5"/>
            <ReferRow name="Tom · @tom.smashes" status="SIGNED UP" credit="PENDING"/>
            <ReferRow name="Imani · @imaniscran" status="INVITED" credit=""/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function RewardChip({ kind, kicker, sum, desc }: any) {
  const isCream = kind === 'cream';
  return (
    <View style={{
      flex: 1, backgroundColor: isCream ? colors.cream : colors.butter,
      borderRadius: 18, padding: 14,
      borderWidth: 1.5, borderColor: colors.ink,
      ...shadow(colors.ink, 3, 3),
    }}>
      <Mono size={9} color={isCream ? colors.pinkDeep : colors.ink}>{kicker}</Mono>
      <Display size={36} color={colors.ink} style={{ marginTop: 2 }}>{sum}</Display>
      <Italic size={13} color={colors.ink2} upper={false} style={{ marginTop: 2 }}>{desc}</Italic>
    </View>
  );
}

function ShareTile({ icon, label, children }: any) {
  return (
    <View style={{
      flex: 1, backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 8, paddingVertical: 14,
      alignItems: 'center', gap: 8,
      borderWidth: 1.5, borderColor: colors.ink,
      ...shadow(colors.ink, 2, 2),
    }}>
      <View style={{
        width: 44, height: 44, borderRadius: 14, backgroundColor: colors.pinkMist,
        borderWidth: 1.5, borderColor: colors.pinkDeep,
        alignItems: 'center', justifyContent: 'center',
      }}>{children}</View>
      <Body weight="700" size={11} color={colors.ink2}>{label}</Body>
    </View>
  );
}

function ReferRow({ name, status, credit }: any) {
  const isOrdered = credit && credit.startsWith('+');
  return (
    <View style={{
      backgroundColor: '#fff', borderRadius: 16, padding: 14,
      flexDirection: 'row', alignItems: 'center', gap: 12,
      borderWidth: 1, borderColor: colors.line2,
    }}>
      <View style={{
        width: 36, height: 36, borderRadius: 18, backgroundColor: colors.pinkMist,
        borderWidth: 1.5, borderColor: colors.ink,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Display size={16} color={colors.pinkDeep}>{name[0]}</Display>
      </View>
      <View style={{ flex: 1 }}>
        <Body weight="700" size={13} color={colors.ink}>{name}</Body>
        <Mono size={9} color={isOrdered ? colors.pinkDeep : colors.mute} style={{ marginTop: 2 }}>{status}</Mono>
      </View>
      {credit && <Mono size={11} color={isOrdered ? colors.pink : colors.mute2}>{credit}</Mono>}
    </View>
  );
}
