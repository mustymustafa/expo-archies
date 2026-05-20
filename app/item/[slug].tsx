// 11 · Item detail + customize — native redesign of the web "WITHOUT" page.
// Hero photo, ingredient toggles, optional extras, qty stepper, sticky add-to-bag bar.
import React, { useMemo, useRef, useState } from 'react';
import { View, ScrollView, Pressable, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { FoodSlot } from '@/components/FoodSlot';
import { Ribbon } from '@/components/Ribbon';
import { foodImages } from '@/lib/foodImages';
import { findItem } from '@/lib/menuData';
import { useCart } from '@/store/cart';
import { comingSoon } from '@/lib/comingSoon';
import { colors, shadow } from '@/theme/tokens';

export default function ItemScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const item = useMemo(() => (slug ? findItem(String(slug)) : undefined), [slug]);
  const cart = useCart();

  const [removed, setRemoved] = useState<Record<string, boolean>>({});
  const [extras, setExtras] = useState<Record<string, boolean>>({});
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState<{ qty: number } | null>(null);

  // animations: bag-button press feedback + toast slide-in
  const btnScale = useRef(new Animated.Value(1)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!item) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.cream,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <Display size={28} color={colors.ink}>NOT FOUND</Display>
        <Mono size={11} color={colors.mute} style={{ marginTop: 6 }}>
          We couldn't find that item.
        </Mono>
        <Pressable
          onPress={() => router.back()}
          style={{
            marginTop: 18,
            paddingHorizontal: 18,
            paddingVertical: 12,
            backgroundColor: colors.ink,
            borderRadius: 999,
          }}
        >
          <Mono size={11} color={colors.butter}>← BACK</Mono>
        </Pressable>
      </View>
    );
  }

  const extrasTotal = (item.extras ?? [])
    .filter((e) => extras[e.id])
    .reduce((acc, e) => acc + e.deltaGBP, 0);
  const unit = item.priceGBP + extrasTotal;
  const total = unit * qty;

  const onAddToBag = () => {
    // 1) press animation on the bar
    Animated.sequence([
      Animated.timing(btnScale, {
        toValue: 0.96,
        duration: 80,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(btnScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
        tension: 200,
      }),
    ]).start();

    // 2) commit to store
    const removedList = (item.removables ?? []).filter((n) => removed[n]);
    const extrasList = (item.extras ?? []).filter((e) => extras[e.id]);
    cart.add({
      slug: item.slug,
      name: item.name,
      image: item.image,
      unitPrice: unit,
      qty,
      removed: removedList,
      extras: extrasList,
    });

    // 3) show the snackbar
    setJustAdded({ qty });
    toastAnim.stopAnimation();
    toastAnim.setValue(0);
    Animated.spring(toastAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 90,
    }).start();
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setJustAdded(null);
      });
    }, 2200);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.cream }}>
      <StatusBar style="dark" />

      {/* Hero image */}
      <View style={{ height: 320 }}>
        <FoodSlot
          tone="pink"
          radius={0}
          image={foodImages[item.image]}
          style={{ flex: 1 }}
        />
        <LinearGradient
          colors={['rgba(31,16,20,0.55)', 'rgba(31,16,20,0)']}
          locations={[0, 0.45]}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 140 }}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['rgba(255,241,220,0)', colors.cream]}
          locations={[0.6, 1]}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 80 }}
          pointerEvents="none"
        />

        <View
          style={{
            position: 'absolute',
            top: insets.top + 8,
            left: 18,
            right: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CircleBtn onPress={() => router.back()}>
            <Icons.Back size={18} />
          </CircleBtn>
          <View style={{ alignItems: 'center' }}>
            <Mono size={10} color={colors.cream}>ORDER NOW</Mono>
          </View>
          <CircleBtn onPress={() => comingSoon('Save to favorites')}>
            <Icons.Heart size={18} />
          </CircleBtn>
        </View>

        {item.tag && (
          <View style={{ position: 'absolute', bottom: 28, left: 22 }}>
            <Ribbon tone="butter" tilt={-3}>
              {item.tag.toUpperCase()}
            </Ribbon>
          </View>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 140 }}
      >
        {/* Title block */}
        <View style={{ paddingHorizontal: 22, paddingTop: 4 }}>
          <Display
            size={42}
            color={colors.ink}
            shadow={{ color: colors.pink, x: 3, y: 3 }}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {item.name}
          </Display>
          <Italic
            size={20}
            color={colors.pink}
            shadow={{ color: colors.ink, x: 2, y: 2 }}
            style={{ marginTop: -2, marginLeft: 4 }}
          >
            yours, your way.
          </Italic>
          <Body
            weight="500"
            size={14}
            color={colors.ink2}
            style={{ marginTop: 14, lineHeight: 20 }}
          >
            {item.description}
          </Body>
          {item.kcal && (
            <Mono size={10} color={colors.mute} style={{ marginTop: 10 }}>
              {item.kcal} KCAL · ALLERGENS ON REQUEST
            </Mono>
          )}
        </View>

        {/* WITHOUT — ingredient toggles */}
        {item.removables && item.removables.length > 0 && (
          <View style={{ paddingHorizontal: 22, marginTop: 28 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <View style={{ width: 14, height: 2, backgroundColor: colors.pink }} />
              <Mono size={10} color={colors.pinkDeep}>OPTIONAL</Mono>
            </View>
            <Display size={26} color={colors.ink}>WITHOUT</Display>
            <View
              style={{
                marginTop: 12,
                backgroundColor: '#fff',
                borderRadius: 22,
                borderWidth: 2,
                borderColor: colors.ink,
                overflow: 'hidden',
                ...shadow(colors.ink, 3, 3),
              }}
            >
              {item.removables.map((name, idx) => {
                const isOff = !!removed[name];
                return (
                  <Pressable
                    key={name}
                    onPress={() =>
                      setRemoved((m) => ({ ...m, [name]: !m[name] }))
                    }
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 14,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      borderBottomWidth: idx === item.removables!.length - 1 ? 0 : 1.5,
                      borderBottomColor: colors.line2,
                      opacity: pressed ? 0.94 : 1,
                    })}
                  >
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: colors.ink,
                        backgroundColor: isOff ? colors.pink : '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isOff && <Icons.Check color={colors.cream} size={14} />}
                    </View>
                    <Body weight="700" size={15} color={colors.ink} style={{ flex: 1 }}>
                      No {name}
                    </Body>
                    {isOff && (
                      <Mono size={9} color={colors.pinkDeep}>REMOVED</Mono>
                    )}
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* EXTRAS — paid add-ons */}
        {item.extras && item.extras.length > 0 && (
          <View style={{ paddingHorizontal: 22, marginTop: 28 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <View style={{ width: 14, height: 2, backgroundColor: colors.pink }} />
              <Mono size={10} color={colors.pinkDeep}>MAKE IT BIGGER</Mono>
            </View>
            <Display size={26} color={colors.ink}>EXTRAS</Display>
            <View style={{ marginTop: 12, gap: 10 }}>
              {item.extras.map((e) => {
                const on = !!extras[e.id];
                return (
                  <Pressable
                    key={e.id}
                    onPress={() =>
                      setExtras((m) => ({ ...m, [e.id]: !m[e.id] }))
                    }
                    style={({ pressed }) => ({
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 14,
                      backgroundColor: on ? colors.pinkMist : '#fff',
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      borderRadius: 18,
                      borderWidth: 2,
                      borderColor: on ? colors.pinkDeep : colors.ink,
                      opacity: pressed ? 0.94 : 1,
                      ...(on ? shadow(colors.pinkDeep, 2, 2) : {}),
                    })}
                  >
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        borderWidth: 2,
                        borderColor: colors.ink,
                        backgroundColor: on ? colors.pink : '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {on && <Icons.Plus color={colors.cream} size={14} />}
                    </View>
                    <Body weight="700" size={15} color={colors.ink} style={{ flex: 1 }}>
                      {e.label}
                    </Body>
                    <Mono size={11} color={colors.pinkDeep}>
                      +£{e.deltaGBP.toFixed(2)}
                    </Mono>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* QUANTITY */}
        <View style={{ paddingHorizontal: 22, marginTop: 28 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginBottom: 10,
            }}
          >
            <View style={{ width: 14, height: 2, backgroundColor: colors.pink }} />
            <Mono size={10} color={colors.pinkDeep}>HOW MANY</Mono>
          </View>
          <Display size={26} color={colors.ink}>QUANTITY</Display>
          <View
            style={{
              marginTop: 12,
              backgroundColor: '#fff',
              borderRadius: 999,
              borderWidth: 2,
              borderColor: colors.ink,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 6,
              paddingVertical: 6,
              ...shadow(colors.ink, 3, 3),
            }}
          >
            <StepperBtn onPress={() => setQty((q) => Math.max(1, q - 1))}>
              <Icons.Minus color={colors.cream} size={18} />
            </StepperBtn>
            <Display size={28} color={colors.ink}>{String(qty).padStart(2, '0')}</Display>
            <StepperBtn onPress={() => setQty((q) => Math.min(20, q + 1))}>
              <Icons.Plus color={colors.cream} size={18} />
            </StepperBtn>
          </View>
        </View>
      </ScrollView>

      {/* Snackbar — "Added to bag" */}
      {justAdded && (
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: insets.top + 10,
            alignItems: 'center',
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-30, 0],
                }),
              },
            ],
            opacity: toastAnim,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: colors.ink,
              borderRadius: 999,
              paddingLeft: 6,
              paddingRight: 16,
              paddingVertical: 6,
              borderWidth: 2,
              borderColor: colors.butter,
              ...shadow(colors.maroon, 3, 3),
            }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: colors.butter,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icons.Check color={colors.ink} size={14} />
            </View>
            <Mono size={11} color={colors.cream}>
              ADDED ×{justAdded.qty} TO BAG
            </Mono>
            <Pressable onPress={() => router.push('/bag')}>
              <Mono size={11} color={colors.butter}>VIEW →</Mono>
            </Pressable>
          </View>
        </Animated.View>
      )}

      {/* Sticky add-to-bag bar */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 18,
          paddingTop: 10,
          paddingBottom: insets.bottom + 12,
          backgroundColor: colors.cream,
          borderTopWidth: 1.5,
          borderTopColor: colors.line2,
          transform: [{ scale: btnScale }],
        }}
      >
        <Pressable
          onPress={onAddToBag}
          style={({ pressed }) => ({
            backgroundColor: colors.pink,
            borderRadius: 999,
            paddingVertical: 16,
            paddingHorizontal: 22,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderWidth: 2,
            borderColor: colors.ink,
            opacity: pressed ? 0.94 : 1,
            ...shadow(colors.ink, 3, 3),
          })}
        >
          <View
            style={{
              backgroundColor: colors.ink,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Mono size={11} color={colors.butter}>×{qty}</Mono>
          </View>
          <Mono size={12} color={colors.cream}>ADD TO BAG</Mono>
          <Mono size={12} color={colors.cream}>£{total.toFixed(2)}</Mono>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function StepperBtn({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.ink,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: pressed ? 0.85 : 1,
      })}
    >
      {children}
    </Pressable>
  );
}

function CircleBtn({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,241,220,0.85)',
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
