// 06 · Order Now — find a restaurant, browse menu, continue order
import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Starburst } from '@/components/Starburst';
import { Ribbon } from '@/components/Ribbon';
import { SectionHead } from '@/components/SectionHead';
import { FoodSlot } from '@/components/FoodSlot';
import { colors, shadow } from '@/theme/tokens';

export default function OrderScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark"/>

      {/* Top bar */}
      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22, paddingBottom: 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <CircleBtn onPress={() => router.back()}><Icons.Back size={18}/></CircleBtn>
        <Mono size={11} color={colors.ink}>ORDER</Mono>
        <CircleBtn><Icons.Bag size={18}/></CircleBtn>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}>

        {/* Hero */}
        <View style={{ paddingHorizontal: 22, paddingTop: 4, paddingBottom: 24 }}>
          <Ribbon tone="pink" tilt={-3} style={{ marginBottom: 14 }}>» DRIVE-IN · DELIVERED «</Ribbon>
          <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>WHAT'RE</Display>
          <Display size={56} color={colors.ink} shadow={{ color: colors.pink, x: 5, y: 5 }}>YOU</Display>
          <Italic size={56} color={colors.pink} shadow={{ color: colors.ink, x: 5, y: 5 }}>cravin'?</Italic>
          <View style={{ position: 'absolute', top: 2, right: 16 }}>
            <Starburst size={66} points={16} fill={colors.butter} rotate={20}>
              <Display size={14} color={colors.ink}>OPEN{'\n'}NOW</Display>
            </Starburst>
          </View>
        </View>

        {/* Mode toggle */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 16 }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 999, padding: 4,
            flexDirection: 'row',
            borderWidth: 1.5, borderColor: colors.ink,
            ...shadow(colors.ink, 2, 2),
          }}>
            {['Delivery', 'Collection', 'Dine-in'].map((m, i) => (
              <View key={m} style={{
                flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 999,
                backgroundColor: i === 0 ? colors.ink : 'transparent',
              }}>
                <Mono size={11} color={i === 0 ? colors.butter : colors.ink2}>{m}</Mono>
              </View>
            ))}
          </View>
        </View>

        {/* Location card */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 24 }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 24, padding: 6,
            borderWidth: 1.5, borderColor: colors.ink,
            ...shadow(colors.ink, 3, 3),
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12 }}>
              <View style={{
                width: 42, height: 42, borderRadius: 14, backgroundColor: colors.pinkMist,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 1.5, borderColor: colors.pinkDeep,
              }}>
                <Icons.Pin color={colors.pinkDeep} size={20}/>
              </View>
              <View style={{ flex: 1 }}>
                <Mono size={10} color={colors.mute}>DELIVER TO</Mono>
                <Body weight="700" size={15} color={colors.ink}>M1 2GH · Manchester</Body>
              </View>
              <Mono size={11} color={colors.pinkDeep}>CHANGE</Mono>
            </View>
            <View style={{
              backgroundColor: colors.pink, borderRadius: 18,
              padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10,
              borderWidth: 1.5, borderColor: colors.ink,
            }}>
              <Icons.Pin color={colors.cream} size={16}/>
              <Mono size={11} color={colors.cream} style={{ flex: 1 }}>USE MY CURRENT LOCATION</Mono>
              <Icons.Arrow color={colors.cream} size={14}/>
            </View>
          </View>
        </View>

        {/* Continue */}
        <SectionHead kicker="Pick up where you left off" title="CONTINUE"/>
        <View style={{ paddingHorizontal: 18, paddingBottom: 8 }}>
          <View style={{
            backgroundColor: '#fff', borderRadius: 24, padding: 14,
            flexDirection: 'row', gap: 14, alignItems: 'center',
            borderWidth: 1.5, borderColor: colors.ink,
            ...shadow(colors.ink, 3, 3),
          }}>
            <View style={{ width: 88, height: 88, borderRadius: 16, overflow: 'hidden', borderWidth: 1.5, borderColor: colors.ink }}>
              <FoodSlot tone="pink" radius={0} label="basket" style={{ flex: 1 }}/>
            </View>
            <View style={{ flex: 1 }}>
              <Mono size={9} color={colors.pinkDeep}>BASKET · 3 ITEMS</Mono>
              <Display size={20} color={colors.ink} style={{ marginTop: 2 }}>TRIPLE SMASH + SHAKE</Display>
              <Mono size={10} color={colors.mute} style={{ marginTop: 4 }}>£14.65 · PICCADILLY · 12 MIN</Mono>
            </View>
            <View style={{
              width: 36, height: 36, borderRadius: 18, backgroundColor: colors.ink,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Icons.Arrow color={colors.butter} size={14}/>
            </View>
          </View>
        </View>

        {/* Category grid */}
        <View style={{ marginTop: 24 }}>
          <SectionHead kicker="Browse the menu" title="WHAT'S GOOD"/>
          <View style={{ paddingHorizontal: 18, flexDirection: 'row', gap: 12 }}>
            <CategoryTile tone="pink" title="BURGERS" count="14 OPTIONS" big/>
            <View style={{ flex: 1, gap: 12 }}>
              <CategoryTile tone="cream" title="SHAKES" count="9"/>
              <CategoryTile tone="blush" title="SIDES" count="11"/>
            </View>
          </View>
          <View style={{ paddingHorizontal: 18, flexDirection: 'row', gap: 12, marginTop: 12 }}>
            <CategoryTile tone="night" title="LATE NIGHT" count="OPEN 'TIL 3AM"/>
            <CategoryTile tone="deep" title="SECRET MENU" count="MEMBERS ONLY" lock/>
          </View>
        </View>

        {/* Order again */}
        <View style={{ marginTop: 28 }}>
          <SectionHead kicker="One-tap reorder" title="YOUR HISTORY"/>
          <View style={{ paddingHorizontal: 18, gap: 10 }}>
            <HistoryRow date="TUE, 14 MAY" title="Triple Smash + Curly" sum="£11.20"/>
            <HistoryRow date="SUN, 12 MAY" title="Salted Caramel Shake" sum="£4.95"/>
            <HistoryRow date="FRI, 10 MAY" title="Hot Honey Combo" sum="£12.45"/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function CircleBtn({ children, onPress }: any) {
  return (
    <Pressable onPress={onPress} style={{
      width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
      borderWidth: 1.5, borderColor: colors.ink,
      alignItems: 'center', justifyContent: 'center',
    }}>{children}</Pressable>
  );
}

function CategoryTile({ tone, title, count, big, lock }: any) {
  const height = big ? 296 : 142;
  const flex = big ? undefined : undefined;
  const isDark = ['pink', 'night', 'deep'].includes(tone);
  return (
    <View style={{
      flex: big ? 1 : 1, height,
      borderRadius: 22, overflow: 'hidden',
      borderWidth: 1.5, borderColor: colors.ink,
    }}>
      <FoodSlot tone={tone} radius={0} label={title.toLowerCase()} style={{ flex: 1 }}/>
      <View style={{ position: 'absolute', left: 14, right: 14, bottom: 14 }}>
        {lock && (
          <View style={{
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(255,241,220,0.2)',
            borderColor: 'rgba(255,241,220,0.3)', borderWidth: 1,
            paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, marginBottom: 8,
          }}>
            <Mono size={9} color={colors.cream}>★ TIER 02+</Mono>
          </View>
        )}
        <Display size={big ? 28 : 18} color={isDark ? colors.cream : colors.ink}>{title}</Display>
        <Mono size={9} color={isDark ? 'rgba(255,241,220,0.85)' : colors.ink2} style={{ marginTop: 2 }}>{count}</Mono>
      </View>
    </View>
  );
}

function HistoryRow({ date, title, sum }: any) {
  return (
    <View style={{
      backgroundColor: '#fff', borderRadius: 18, padding: 14,
      flexDirection: 'row', alignItems: 'center', gap: 14,
      borderWidth: 1.5, borderColor: colors.ink,
      ...shadow(colors.ink, 2, 2),
    }}>
      <View style={{
        width: 44, height: 44, borderRadius: 12, backgroundColor: colors.pinkMist,
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1.5, borderColor: colors.pinkDeep,
      }}>
        <Icons.Refresh color={colors.pinkDeep} size={18}/>
      </View>
      <View style={{ flex: 1 }}>
        <Mono size={10} color={colors.mute}>{date}</Mono>
        <Display size={16} color={colors.ink} style={{ marginTop: 2 }}>{title}</Display>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Body weight="700" size={14} color={colors.ink}>{sum}</Body>
        <Mono size={10} color={colors.pinkDeep} style={{ marginTop: 2 }}>REORDER →</Mono>
      </View>
    </View>
  );
}
