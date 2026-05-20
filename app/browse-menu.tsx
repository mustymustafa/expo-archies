// 10 · Browse Menu — full catalog with sticky category pills.
// Native redesign of the web Order Now > Smashed Burgers list view.
import React, { useMemo, useRef, useState } from 'react';
import { View, ScrollView, Pressable, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { FoodSlot } from '@/components/FoodSlot';
import { Ribbon } from '@/components/Ribbon';
import { foodImages } from '@/lib/foodImages';
import { CATEGORIES, CATEGORY_TONES, type MenuItem } from '@/lib/menuData';
import { colors, shadow } from '@/theme/tokens';

export default function BrowseMenuScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ category?: string }>();
  const initial = params.category && CATEGORIES.some((c) => c.id === params.category)
    ? (params.category as string)
    : CATEGORIES[0].id;
  const [activeId, setActiveId] = useState<string>(initial);
  const tabScroll = useRef<ScrollView>(null);

  const active = useMemo(
    () => CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0],
    [activeId],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark" />

      {/* Top bar */}
      <View
        style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 18,
          paddingBottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <CircleBtn onPress={() => router.back()}>
          <Icons.Back size={18} />
        </CircleBtn>
        <View style={{ alignItems: 'center' }}>
          <Mono size={10} color={colors.pinkDeep}>ORDER NOW</Mono>
          <Logo size={28} />
        </View>
        <CircleBtn onPress={() => router.push('/menu')}>
          <Icons.Menu size={18} />
        </CircleBtn>
      </View>

      {/* Hero */}
      <View style={{ paddingHorizontal: 22, paddingTop: 6, paddingBottom: 12 }}>
        <Ribbon tone="pink" tilt={-2} style={{ marginBottom: 8 }}>
          ★ {active.label.toUpperCase()} ★
        </Ribbon>
        <Display
          size={44}
          color={colors.ink}
          shadow={{ color: colors.pink, x: 4, y: 4 }}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          PICK A
        </Display>
        <Italic
          size={36}
          color={colors.pink}
          shadow={{ color: colors.ink, x: 3, y: 3 }}
          style={{ marginTop: -6, marginLeft: 6 }}
        >
          favourite.
        </Italic>
      </View>

      {/* Category pills */}
      <View style={{ paddingBottom: 10 }}>
        <ScrollView
          ref={tabScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 18, gap: 10 }}
        >
          {CATEGORIES.map((c) => {
            const isActive = c.id === activeId;
            return (
              <Pressable
                key={c.id}
                onPress={() => setActiveId(c.id)}
                style={({ pressed }) => ({
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 999,
                  backgroundColor: isActive ? colors.pink : '#fff',
                  borderWidth: 1.5,
                  borderColor: colors.ink,
                  opacity: pressed ? 0.94 : 1,
                  ...(isActive ? shadow(colors.ink, 2, 2) : {}),
                })}
              >
                <Mono size={11} color={isActive ? colors.cream : colors.ink}>
                  {c.label}
                </Mono>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Items */}
      <FlatList
        data={active.items}
        keyExtractor={(it) => it.slug}
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 10,
          paddingBottom: insets.bottom + 130,
          gap: 14,
        }}
        ListEmptyComponent={
          <View style={{ paddingVertical: 40, alignItems: 'center' }}>
            <Mono size={11} color={colors.mute}>NOTHING HERE YET.</Mono>
          </View>
        }
        renderItem={({ item }) => (
          <ItemCard
            item={item}
            tone={CATEGORY_TONES[active.id] ?? 'pink'}
            onPress={() => router.push(`/item/${item.slug}`)}
          />
        )}
      />
    </View>
  );
}

function ItemCard({
  item,
  tone,
  onPress,
}: {
  item: MenuItem;
  tone: 'pink' | 'blush' | 'cream' | 'night' | 'deep';
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: colors.ink,
        padding: 14,
        flexDirection: 'row',
        gap: 14,
        alignItems: 'center',
        opacity: pressed ? 0.95 : 1,
        ...shadow(colors.ink, 3, 3),
      })}
    >
      <View style={{ flex: 1, minWidth: 0 }}>
        {item.tag && (
          <Mono size={9} color={colors.pinkDeep} style={{ marginBottom: 4 }}>
            {item.tag}
          </Mono>
        )}
        <Display size={20} color={colors.pink} numberOfLines={1}>
          {item.name}
        </Display>
        <Body
          weight="500"
          size={12}
          color={colors.ink2}
          style={{ marginTop: 6, lineHeight: 17 }}
          numberOfLines={3}
        >
          {item.description}
          {item.kcal ? `  ·  ${item.kcal} Kcal` : ''}
        </Body>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: colors.ink,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
            }}
          >
            <Mono size={11} color={colors.butter}>
              £{item.priceGBP.toFixed(2)}
            </Mono>
          </View>
          <Mono size={10} color={colors.mute}>TAP TO CUSTOMISE →</Mono>
        </View>
      </View>
      <View
        style={{
          width: 102,
          height: 102,
          borderRadius: 18,
          overflow: 'hidden',
          borderWidth: 1.5,
          borderColor: colors.ink,
        }}
      >
        <FoodSlot
          tone={tone}
          radius={0}
          image={foodImages[item.image]}
          style={{ flex: 1 }}
        />
      </View>
    </Pressable>
  );
}

function CircleBtn({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: colors.ink,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Pressable>
  );
}
