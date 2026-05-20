// 01 · Welcome — the hero entry screen.
import React from 'react';
import { View, ScrollView, ImageBackground, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Display, Italic, Mono } from '@/components/Type';
import { Pill } from '@/components/Pill';
import { Logo } from '@/components/Logo';
import { Starburst } from '@/components/Starburst';
import { Sunburst } from '@/components/Sunburst';
import { Halftone } from '@/components/Halftone';
import { ArcText } from '@/components/ArcText';
import { colors } from '@/theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.pink }}>
      <StatusBar style="light"/>

      <Sunburst rays={32} color={colors.butter} opacity={0.16}
        style={{ top: '15%', height: '85%', left: '-20%', right: '-20%' }}/>

      {/* top wordmark bar */}
      <View style={{
        paddingHorizontal: 28,
        paddingTop: insets.top + 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Logo size={44}/>
        <Mono size={11} color={colors.cream}>EST · 1957</Mono>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        {/* Hero photo card */}
        <View style={{ paddingHorizontal: 22, marginTop: 18, position: 'relative' }}>
          {/* shadow plate (rendered FIRST so it stays behind the photo) */}
          <View style={{
            position: 'absolute', left: 27, top: 5, right: 17, height: 460,
            backgroundColor: colors.ink, borderRadius: 32,
          }}/>
          <View style={{
            height: 460, borderRadius: 32, overflow: 'hidden',
            borderWidth: 2, borderColor: colors.ink,
          }}>
            <ImageBackground
              source={require('../assets/shaker-fries.jpg')}
              style={{ flex: 1 }}
              imageStyle={{ resizeMode: 'cover' }}>
              <Halftone color={colors.ink} opacity={0.18} dot={1.4} size={6}/>
            </ImageBackground>
          </View>

          {/* HOT & FRESH starburst stamp top-right */}
          <View style={{ position: 'absolute', top: -16, right: 0 }}>
            <Starburst size={96} points={18} fill={colors.butter} rotate={-12}>
              <Display size={14} color={colors.ink}>HOT &{'\n'}FRESH</Display>
              <Mono size={8} color={colors.ink} style={{ marginTop: 3 }}>★ DAILY ★</Mono>
            </Starburst>
          </View>

          {/* NO.1 curved seal bottom-left */}
          <View style={{ position: 'absolute', bottom: -10, left: 8, width: 88, height: 88 }}>
            <View style={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              width: 88, height: 88, borderRadius: 44,
              backgroundColor: colors.pink, borderWidth: 2, borderColor: colors.cream,
            } as any}/>
            <View style={{ position: 'absolute', top: -4, left: -4 }}>
              <ArcText text="ARCHIE'S · BURGERS · SHAKES · " size={96} fontSize={9} color={colors.cream}/>
            </View>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' } as any}>
              <Display size={22} color={colors.cream}>NO.1</Display>
            </View>
          </View>
        </View>

        {/* Title block */}
        <View style={{ paddingHorizontal: 28, marginTop: 36 }}>
          <Display size={78} color={colors.cream} shadow={{ color: colors.ink, x: 5, y: 5 }}>
            FAST{'\n'}FOOD.
          </Display>
          <Display size={78} color={colors.butter} shadow={{ color: colors.ink, x: 5, y: 5 }}>
            SLOW{'\n'}TASTE.
          </Display>
          <Italic size={22} color={colors.cream} style={{ marginTop: 10 }}>
            — since '57, slung with love.
          </Italic>
        </View>
      </ScrollView>

      {/* CTA stack */}
      <View style={{
        paddingHorizontal: 22, paddingBottom: insets.bottom + 24, paddingTop: 16, gap: 12,
        backgroundColor: colors.pink,
      }}>
        <Pill kind="cream" size="lg" full onPress={() => router.push('/signup')}>
          Create an account
        </Pill>
        <Pill kind="glass" size="lg" full onPress={() => router.push('/login')}>
          I already have one
        </Pill>
        <Mono size={10} color="rgba(255,241,220,0.7)" style={{ textAlign: 'center', marginTop: 4 }}>
          ★ By continuing · Terms & Privacy ★
        </Mono>
      </View>
    </View>
  );
}
