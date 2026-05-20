// 03 · Sign Up · Step 01
import React from 'react';
import { View, ScrollView, TextInput, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Pill } from '@/components/Pill';
import { Icons } from '@/components/Icon';
import { colors, fonts } from '@/theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SignUpScreen() {
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
        }}>
          <Icons.Back size={18}/>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 28, paddingTop: 12 }}>
        {/* Step bars */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 28 }}>
          {[1, 2, 3].map((n) => (
            <View key={n} style={{
              flex: 1, height: 6, borderRadius: 3,
              backgroundColor: n === 1 ? colors.pink : 'rgba(31,16,20,0.12)',
              borderWidth: 1, borderColor: colors.ink,
            }}/>
          ))}
        </View>

        <View style={{
          alignSelf: 'flex-start', backgroundColor: colors.pinkMist,
          paddingHorizontal: 10, paddingVertical: 5,
          borderWidth: 1.5, borderColor: colors.pinkDeep,
          marginBottom: 12,
        }}>
          <Mono size={11} color={colors.pinkDeep}>STEP 01 — ABOUT YOU</Mono>
        </View>
        <Display size={58} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>WHAT</Display>
        <Display size={58} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>SHOULD</Display>
        <Display size={58} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>WE CALL</Display>
        <Italic size={58} color={colors.pink} shadow={{ color: colors.ink, x: 5, y: 5 }}>you?</Italic>

        <View style={{ marginTop: 32, gap: 14 }}>
          <Field label="First name" defaultValue="James"/>
          <Field label="Last name" defaultValue="Carter"/>
          <View style={{
            backgroundColor: colors.pinkMist, borderRadius: 18, padding: 14,
            flexDirection: 'row', alignItems: 'center', gap: 12,
            borderWidth: 1.5, borderColor: colors.pinkDeep,
          }}>
            <View style={{
              width: 32, height: 32, borderRadius: 10, backgroundColor: colors.pink,
              alignItems: 'center', justifyContent: 'center',
              borderWidth: 1.5, borderColor: colors.ink,
            }}>
              <Icons.Star color={colors.butter} size={16}/>
            </View>
            <Body size={12} color={colors.ink2} style={{ flex: 1 }}>
              <Body weight="700" color={colors.ink}>50 welcome points</Body> are waiting when you finish signing up.
            </Body>
          </View>
        </View>

        <View style={{ flex: 1 }}/>

        <View style={{ paddingBottom: insets.bottom + 16, paddingTop: 24 }}>
          <Pill kind="pink" size="lg" full icon={<Icons.Arrow color={colors.cream} size={16}/>} onPress={() => router.replace('/home')}>
            Continue
          </Pill>
          <Mono size={11} color={colors.mute} style={{ textAlign: 'center', marginTop: 14 }}>
            Already have an account? <Mono size={11} color={colors.pinkDeep}>Log in</Mono>
          </Mono>
        </View>
      </ScrollView>
    </View>
  );
}

function Field({ label, ...inputProps }: any & { label: string }) {
  return (
    <View style={{
      backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 18, paddingVertical: 12,
      borderWidth: 1, borderColor: colors.line2,
    }}>
      <Mono size={10} color={colors.mute}>{label}</Mono>
      <TextInput
        {...inputProps}
        style={{
          fontFamily: fonts.textMedium, fontSize: 16, color: colors.ink,
          paddingVertical: 0, marginTop: 2,
        }}/>
    </View>
  );
}
