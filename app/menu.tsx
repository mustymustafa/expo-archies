// 09 · Side Menu / Profile — dark theme
import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Halftone } from '@/components/Halftone';
import { Logo } from '@/components/Logo';
import { colors, shadow } from '@/theme/tokens';

export default function MenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.ink }}>
      <StatusBar style="light"/>

      <View style={{
        paddingTop: insets.top + 8, paddingHorizontal: 22, paddingBottom: 8,
        flexDirection: 'row', justifyContent: 'space-between',
      }}>
        <Pressable onPress={() => router.back()} style={{
          width: 44, height: 44, borderRadius: 22,
          backgroundColor: 'rgba(255,255,255,0.10)',
          alignItems: 'center', justifyContent: 'center',
        }}><Icons.Close color={colors.cream} size={14}/></Pressable>
        <View style={{
          width: 44, height: 44, borderRadius: 22,
          backgroundColor: 'rgba(255,255,255,0.10)',
          alignItems: 'center', justifyContent: 'center',
        }}><Icons.Bell color={colors.cream} size={18}/></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>

        {/* Profile header */}
        <View style={{ paddingHorizontal: 22, paddingTop: 12, paddingBottom: 24, flexDirection: 'row', gap: 14, alignItems: 'center' }}>
          <View style={{
            width: 64, height: 64, borderRadius: 32, backgroundColor: colors.pink,
            borderWidth: 2, borderColor: colors.cream,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Display size={26} color={colors.cream}>JC</Display>
          </View>
          <View style={{ flex: 1 }}>
            <Mono size={11} color={colors.pink2}>★ TIER 02 · REGULAR</Mono>
            <Display size={26} color={colors.cream} style={{ marginTop: 4 }}>JAMES CARTER</Display>
            <Mono size={10} color="rgba(255,241,220,0.5)" style={{ marginTop: 2 }}>MEMBER SINCE AUG 2024</Mono>
          </View>
        </View>

        {/* Members card */}
        <View style={{ paddingHorizontal: 22, paddingBottom: 24 }}>
          <View style={{
            borderRadius: 22, overflow: 'hidden',
            borderWidth: 2, borderColor: colors.ink,
            ...shadow(colors.maroon, 4, 4),
          }}>
            <LinearGradient
              colors={[colors.pink, colors.pinkDeep]}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              style={{ padding: 22 }}>
              <Halftone color={colors.cream} opacity={0.25}/>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <Logo size={36}/>
                  <View>
                    <Mono size={11} color={colors.cream}>ARCHIE'S</Mono>
                    <Mono size={9} color="rgba(255,241,220,0.7)" style={{ marginTop: 2 }}>MEMBERS CARD</Mono>
                  </View>
                </View>
                <View style={{
                  width: 36, height: 36, borderRadius: 8,
                  backgroundColor: colors.cream,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icons.QR color={colors.ink} size={28}/>
                </View>
              </View>
              <Display size={22} color={colors.cream} shadow={{ color: colors.maroon, x: 2, y: 2 }} style={{ marginTop: 22 }}>
                9050 0150 4040 9888
              </Display>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                <CardStat label="POINTS" value="42"/>
                <CardStat label="REWARDS" value="01"/>
                <CardStat label="VISITS" value="23"/>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Menu lists */}
        <View style={{ paddingHorizontal: 22 }}>
          <MenuGroup title="My stuff">
            <MenuRow icon={<Icons.Bookmark color={colors.cream} size={18}/>} label="Saved favorites" detail="14"/>
            <MenuRow icon={<Icons.Refresh color={colors.cream} size={18}/>} label="Order history" detail="23 orders"/>
            <MenuRow icon={<Icons.Heart color={colors.cream} size={18}/>} label="Rewards" detail="1 ready" highlight/>
          </MenuGroup>
          <MenuGroup title="Account">
            <MenuRow icon={<Icons.Face color={colors.cream} size={18}/>} label="Sign-in & Face ID"/>
            <MenuRow icon={<Icons.Pin color={colors.cream} size={18}/>} label="Addresses"/>
            <MenuRow icon={<Icons.Message color={colors.cream} size={18}/>} label="Messages" detail="2 new"/>
          </MenuGroup>
          <MenuGroup title="More" last>
            <MenuRow icon={<Icons.Share color={colors.cream} size={18}/>} label="Refer a friend" onPress={() => router.push('/refer')}/>
            <MenuRow icon={<Icons.QR color={colors.cream} size={18}/>} label="eGift cards"/>
            <MenuRow icon={<Icons.Bell color={colors.cream} size={18}/>} label="Notifications"/>
          </MenuGroup>
        </View>

        <View style={{ paddingHorizontal: 22, paddingTop: 20, paddingBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Mono size={10} color="rgba(255,241,220,0.4)">v4.2.1 · ARCHIE'S</Mono>
          <Pressable onPress={() => { router.dismissAll?.(); router.replace('/welcome'); }}>
            <Mono size={11} color={colors.pink2}>SIGN OUT</Mono>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function CardStat({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Mono size={9} color="rgba(255,241,220,0.7)">{label}</Mono>
      <Display size={26} color={colors.cream}>{value}</Display>
    </View>
  );
}

function MenuGroup({ title, children, last }: any) {
  return (
    <View style={{ marginBottom: last ? 0 : 22 }}>
      <Mono size={10} color="rgba(255,241,220,0.45)" style={{ marginBottom: 8, paddingLeft: 4 }}>{title}</Mono>
      <View style={{
        backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 20, overflow: 'hidden',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
      }}>{children}</View>
    </View>
  );
}

function MenuRow({ icon, label, detail, highlight, onPress }: any) {
  return (
    <Pressable onPress={onPress} style={{
      flexDirection: 'row', alignItems: 'center', gap: 14,
      paddingHorizontal: 16, paddingVertical: 14,
      borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
    }}>
      <View style={{
        width: 36, height: 36, borderRadius: 11,
        backgroundColor: highlight ? colors.pink : 'rgba(255,255,255,0.08)',
        alignItems: 'center', justifyContent: 'center',
      }}>{icon}</View>
      <Body weight="500" size={15} color={colors.cream} style={{ flex: 1 }}>{label}</Body>
      {detail && (
        <View style={highlight ? {
          backgroundColor: 'rgba(255,31,122,0.18)',
          paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
        } : {}}>
          <Mono size={11} color={highlight ? colors.pink2 : 'rgba(255,241,220,0.5)'}>{detail}</Mono>
        </View>
      )}
      <Icons.Chev color="rgba(255,241,220,0.3)" size={12}/>
    </Pressable>
  );
}
