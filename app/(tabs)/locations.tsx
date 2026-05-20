// 07 · Locations
import React from 'react';
import { View, ScrollView, Pressable, TextInput } from 'react-native';
import Svg, { Path, Pattern, Rect, Defs, Circle as SvgCircle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Ribbon } from '@/components/Ribbon';
import { FoodSlot } from '@/components/FoodSlot';
import { colors, shadow, fonts } from '@/theme/tokens';

export default function LocationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark"/>

      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22,
        flexDirection: 'row', justifyContent: 'space-between',
      }}>
        <Pressable onPress={() => router.push('/menu')} style={{
          width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
          borderWidth: 1.5, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
        }}><Icons.Menu size={18}/></Pressable>
        <View style={{ width: 44 }}/>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 8 }}>
        <Ribbon tone="pink" tilt={-2} style={{ marginBottom: 12 }}>★ 47 ACROSS THE UK ★</Ribbon>
        <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>FIND</Display>
        <Italic size={56} color={colors.pink} shadow={{ color: colors.ink, x: 5, y: 5 }} style={{ marginTop: -10, marginLeft: 6 }}>your fix.</Italic>
      </View>

      <View style={{ paddingHorizontal: 22, paddingTop: 14, paddingBottom: 16 }}>
        <View style={{
          backgroundColor: '#fff', borderRadius: 999,
          paddingHorizontal: 16, paddingVertical: 10,
          flexDirection: 'row', alignItems: 'center', gap: 10,
          borderWidth: 1.5, borderColor: colors.ink,
          ...shadow(colors.ink, 2, 2),
        }}>
          <Icons.Search color={colors.mute} size={16}/>
          <TextInput
            placeholder="Search by city or postcode"
            placeholderTextColor={colors.mute}
            style={{ flex: 1, fontFamily: fonts.text, fontSize: 14, color: colors.ink, paddingVertical: 0 }}/>
          <View style={{
            backgroundColor: colors.pink, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
            flexDirection: 'row', alignItems: 'center', gap: 4,
            borderWidth: 1.5, borderColor: colors.ink,
          }}>
            <Icons.Pin color={colors.cream} size={12}/>
            <Mono size={9} color={colors.cream}>NEAR ME</Mono>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}>

        {/* Map */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 20 }}>
          <View style={{
            height: 160, borderRadius: 22, overflow: 'hidden',
            borderWidth: 1.5, borderColor: colors.ink,
            ...shadow(colors.ink, 3, 3),
          }}>
            <LinearGradient
              colors={[colors.pinkMist, colors.pinkBlush]}
              style={{ flex: 1, position: 'relative' }}>
              <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
                <Defs>
                  <Pattern id="grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                    <Path d="M28 0H0v28" fill="none" stroke="rgba(122,8,56,0.10)" strokeWidth="1"/>
                  </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#grid)"/>
                <Path d="M0 80 Q80 60, 160 90 T 360 70" stroke="rgba(122,8,56,0.16)" strokeWidth="3" fill="none"/>
              </Svg>
              {/* pins */}
              {[[60, 60], [140, 90], [220, 50], [280, 95]].map(([x, y], i) => (
                <View key={i} style={{
                  position: 'absolute', left: x as number, top: y as number,
                  transform: [{ translateX: -13 }, { translateY: -26 }],
                  width: 26, height: 26, borderRadius: 13,
                  backgroundColor: i === 0 ? colors.ink : colors.pink,
                  borderWidth: 2, borderColor: colors.cream,
                  alignItems: 'center', justifyContent: 'center',
                  ...shadow(colors.ink, 2, 2),
                }}>
                  <Icons.Star color={colors.butter} size={12}/>
                </View>
              ))}
              <View style={{
                position: 'absolute', bottom: 12, right: 12,
                backgroundColor: colors.cream, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999,
                flexDirection: 'row', alignItems: 'center', gap: 4,
                borderWidth: 1.5, borderColor: colors.ink,
              }}>
                <Mono size={10} color={colors.ink}>OPEN MAP →</Mono>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Restaurant cards */}
        <View style={{ paddingHorizontal: 18, gap: 12 }}>
          <LocationCard featured name="ARCHIE'S PICCADILLY" addr="6 & 7 Gateway House, Piccadilly" mi="0.4 mi" status="OPEN · UNTIL 03:00"/>
          <LocationCard name="ARCHIE'S ARNDALE" addr="Manchester Arndale" mi="0.9 mi" status="OPEN · UNTIL 22:00"/>
          <LocationCard name="ARCHIE'S OXFORD ST" addr="72 Oxford Street" mi="1.2 mi" status="OPEN · UNTIL 23:00"/>
          <LocationCard name="ARCHIE'S TRAFFORD" addr="Trafford Palazzo" mi="2.8 mi" status="CLOSES 22:00 · 18 MIN" warn/>
        </View>
      </ScrollView>
    </View>
  );
}

function LocationCard({ name, addr, mi, status, featured, warn }: any) {
  return (
    <View style={{
      backgroundColor: featured ? colors.ink : '#fff',
      borderRadius: 22, padding: 16,
      flexDirection: 'row', alignItems: 'center', gap: 14,
      borderWidth: 1.5, borderColor: colors.ink,
      ...shadow(featured ? colors.pinkDeep : colors.ink, 4, 4),
    }}>
      {featured && (
        <View style={{
          position: 'absolute', top: 12, right: 12,
          backgroundColor: colors.pink, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
          borderWidth: 1.5, borderColor: colors.ink,
        }}>
          <Mono size={9} color={colors.cream}>★ CLOSEST</Mono>
        </View>
      )}
      <View style={{ width: 60, height: 60, borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: colors.ink }}>
        <FoodSlot tone={featured ? 'pink' : 'blush'} radius={0} style={{ flex: 1 }}/>
      </View>
      <View style={{ flex: 1, paddingRight: featured ? 72 : 0 }}>
        <Mono size={10} color={featured ? 'rgba(255,241,220,0.6)' : colors.mute}>{mi} AWAY · MANCHESTER</Mono>
        <Display size={18} color={featured ? colors.cream : colors.ink}>{name}</Display>
        <Body size={12} color={featured ? 'rgba(255,241,220,0.85)' : colors.ink2} style={{ marginTop: 4 }}>{addr}</Body>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 }}>
          <Icons.Clock color={warn ? colors.pink : featured ? colors.butter : colors.pinkDeep} size={12}/>
          <Mono size={10} color={warn ? colors.pink : featured ? colors.butter : colors.pinkDeep}>{status}</Mono>
        </View>
      </View>
    </View>
  );
}
