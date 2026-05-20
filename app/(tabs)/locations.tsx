// 07 · Locations
import React from 'react';
import { View, ScrollView, Pressable, TextInput, Linking } from 'react-native';
import Svg, { Path, Pattern, Rect, Defs, Circle as SvgCircle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Ribbon } from '@/components/Ribbon';
import { FoodSlot } from '@/components/FoodSlot';
import { comingSoon } from '@/lib/comingSoon';
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

  

        {/* Restaurant cards */}
        <View style={{ paddingHorizontal: 18, gap: 12 }}>
          <LocationCard featured name="ARCHIE'S PICCADILLY" addr="6 & 7 Gateway House, Piccadilly" mi="0.4 mi" status="OPEN · UNTIL 03:00"/>
          <LocationCard name="ARCHIE'S ARNDALE" addr="Manchester Arndale" mi="0.9 mi" status="OPEN · UNTIL 22:00"/>
          <LocationCard name="ARCHIE'S OXFORD ST" addr="72 Oxford Street, Manchester" mi="1.2 mi" status="OPEN · UNTIL 23:00"/>
          <LocationCard name="ARCHIE'S TRAFFORD" addr="Trafford Palazzo, Manchester" mi="2.8 mi" status="CLOSES 22:00 · 18 MIN" warn/>
        </View>
      </ScrollView>
    </View>
  );
}

function LocationCard({ name, addr, mi, status, featured, warn }: any) {
  const openMaps = () => {
    const query = encodeURIComponent(`${name}, ${addr}`);
    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`).catch(() => {});
  };
  return (
    <Pressable onPress={openMaps} style={({ pressed }) => ({
      backgroundColor: featured ? colors.ink : '#fff',
      borderRadius: 22, padding: 16,
      flexDirection: 'row', alignItems: 'center', gap: 14,
      borderWidth: 1.5, borderColor: colors.ink,
      opacity: pressed ? 0.94 : 1,
      ...shadow(featured ? colors.pinkDeep : colors.ink, 4, 4),
    })}>
      {featured && (
        <View style={{
          position: 'absolute', top: 12, right: 12,
          backgroundColor: colors.pink, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999,
          borderWidth: 1.5, borderColor: colors.ink,
        }}>
          <Mono size={9} color={colors.cream}>★ CLOSEST</Mono>
        </View>
      )}
      <View style={{
        width: 60, height: 60, borderRadius: 16, overflow: 'hidden',
        borderWidth: 1.5, borderColor: colors.ink,
      }}>
        <FoodSlot tone={featured ? 'pink' : 'blush'} radius={0} style={{ flex: 1 }}/>
        <View pointerEvents="none" style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Icons.Pin color={featured ? colors.cream : colors.ink} size={28}/>
        </View>
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
    </Pressable>
  );
}
