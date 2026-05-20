// 02 · Login — email + password + Face ID
import React from 'react';
import { View, ScrollView, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Pill } from '@/components/Pill';
import { Logo } from '@/components/Logo';
import { Icons } from '@/components/Icon';
import { colors, fonts } from '@/theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark"/>

      {/* Top bar */}
      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22, paddingBottom: 4,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Pressable onPress={() => router.back()} style={{
          width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
          borderWidth: 1.5, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.Back size={18}/>
        </Pressable>
        <Logo size={44}/>
        <View style={{ width: 44 }}/>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 28, paddingTop: 12 }}>
        {/* Hero title */}
        <View style={{
          alignSelf: 'flex-start', backgroundColor: colors.pinkMist,
          paddingHorizontal: 10, paddingVertical: 5,
          borderWidth: 1.5, borderColor: colors.pinkDeep,
          marginBottom: 14,
        }}>
          <Mono size={11} color={colors.pinkDeep}>★ WELCOME BACK</Mono>
        </View>
        <Display size={68} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>HUNGRY,</Display>
        <Display size={68} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>AREN'T</Display>
        <Italic size={68} color={colors.pink} shadow={{ color: colors.ink, x: 5, y: 5 }}>you?</Italic>

        {/* Inputs */}
        <View style={{ marginTop: 32, gap: 14 }}>
          <Field label="Email" defaultValue="james@archies.co" autoCapitalize="none" keyboardType="email-address"/>
          <Field label="Password" defaultValue="•••••••••••" secureTextEntry trailing={<Icons.Eye color={colors.mute} size={18}/>}/>
          <Mono size={11} color={colors.pinkDeep} style={{ textAlign: 'right' }}>FORGOT PASSWORD?</Mono>
        </View>

        <View style={{ flex: 1 }}/>

        <View style={{ gap: 12, paddingBottom: insets.bottom + 16, paddingTop: 24 }}>
          <Pill kind="pink" size="lg" full icon={<Icons.Arrow color={colors.cream} size={16}/>} onPress={() => router.replace('/home')}>
            Log in
          </Pill>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.line2 }}/>
            <Mono size={10} color={colors.mute}>OR</Mono>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.line2 }}/>
          </View>
          <Pill kind="ink" size="lg" full icon={<Icons.Face color={colors.butter} size={18}/>}>
            Sign in with Face ID
          </Pill>
        </View>
      </ScrollView>
    </View>
  );
}

function Field({ label, trailing, ...inputProps }: any & { label: string; trailing?: React.ReactNode }) {
  return (
    <View style={{
      backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 12,
      flexDirection: 'row', alignItems: 'center', gap: 8,
      borderWidth: 1, borderColor: colors.line2,
    }}>
      <View style={{ flex: 1 }}>
        <Mono size={10} color={colors.mute}>{label}</Mono>
        <TextInput
          {...inputProps}
          style={{
            fontFamily: fonts.textMedium, fontSize: 16, color: colors.ink,
            paddingVertical: 0, marginTop: 2,
          }}/>
      </View>
      {trailing}
    </View>
  );
}
