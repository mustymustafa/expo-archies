// 13 · Checkout — review address, time, payment + promo, place order.
// UI-only flow: no real payment integration, place-order shows a brief
// loading state and routes to /order-confirmation.
import React, { useMemo, useRef, useState } from 'react';
import { View, ScrollView, Pressable, TextInput, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Ribbon } from '@/components/Ribbon';
import { useCart } from '@/store/cart';
import { comingSoon } from '@/lib/comingSoon';
import { colors, shadow } from '@/theme/tokens';

type Address = { id: string; label: string; line1: string; line2: string };
type TimeSlot = { id: string; label: string; sub: string };
type PaymentMethod = { id: string; label: string; sub: string; kind: 'apple' | 'card' | 'cash' };

const ADDRESSES: Address[] = [
  { id: 'home', label: 'Home', line1: '24 Northern Quarter Mews', line2: 'M1 2GH · Manchester' },
  { id: 'work', label: 'Work', line1: 'Spinningfields, Level 04', line2: 'M3 3JE · Manchester' },
];

const TIMES: TimeSlot[] = [
  { id: 'asap', label: 'ASAP', sub: '25–35 min' },
  { id: '19:30', label: '19:30', sub: 'Tonight' },
  { id: '20:00', label: '20:00', sub: 'Tonight' },
  { id: '20:30', label: '20:30', sub: 'Tonight' },
];

const PAYMENTS: PaymentMethod[] = [
  { id: 'apple', label: 'Apple Pay', sub: 'One-tap with Face ID', kind: 'apple' },
  { id: 'card-1', label: 'VISA ···· 4242', sub: 'Expires 09/27', kind: 'card' },
  { id: 'cash', label: 'Cash on delivery', sub: 'Exact change preferred', kind: 'cash' },
];

const DELIVERY_GBP = 1.99;
const PROMO_CODES: Record<string, { label: string; deltaGBP: number }> = {
  ARCHIES10: { label: 'ARCHIES10 · 10% off', deltaGBP: -0 }, // computed
  FREEDEL: { label: 'FREEDEL · Free delivery', deltaGBP: -DELIVERY_GBP },
};

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lines, count, subtotal, clear } = useCart();

  const [addrId, setAddrId] = useState<string>(ADDRESSES[0].id);
  const [timeId, setTimeId] = useState<string>(TIMES[0].id);
  const [payId, setPayId] = useState<string>(PAYMENTS[0].id);
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<{ code: string; deltaGBP: number; label: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [tip, setTip] = useState<number>(0);
  const [placing, setPlacing] = useState(false);

  const placeScale = useRef(new Animated.Value(1)).current;

  const promoDelta = useMemo(() => {
    if (!promo) return 0;
    if (promo.code === 'ARCHIES10') return -(subtotal * 0.1);
    return promo.deltaGBP;
  }, [promo, subtotal]);

  const total = useMemo(() => {
    if (lines.length === 0) return 0;
    return Math.max(0, subtotal + DELIVERY_GBP + promoDelta + tip);
  }, [lines.length, subtotal, promoDelta, tip]);

  const applyPromo = () => {
    const key = promoInput.trim().toUpperCase();
    if (!key) return;
    const found = PROMO_CODES[key];
    if (!found) {
      setPromoError('That code didn\'t take.');
      setPromo(null);
      return;
    }
    setPromoError(null);
    setPromo({ code: key, deltaGBP: found.deltaGBP, label: found.label });
  };

  const removePromo = () => {
    setPromo(null);
    setPromoInput('');
    setPromoError(null);
  };

  const onPlaceOrder = () => {
    if (lines.length === 0 || placing) return;
    Animated.sequence([
      Animated.timing(placeScale, {
        toValue: 0.96,
        duration: 80,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.spring(placeScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 4,
        tension: 200,
      }),
    ]).start();
    setPlacing(true);

    // simulate placing — clear cart, collapse the modal stack, present confirmation.
    setTimeout(() => {
      const orderNumber = `AR-${Math.floor(100000 + Math.random() * 900000)}`;
      const etaMin = timeId === 'asap' ? 28 : 0;
      const etaLabel = timeId === 'asap' ? `${etaMin} MIN` : timeId;
      const addr = ADDRESSES.find((a) => a.id === addrId)!;
      const itemsCount = count;
      clear();

      // Pop every modal that piled up on the way here (item, bag, browse-menu,
      // checkout itself) so confirmation sits directly on top of (tabs).
      router.dismissAll?.();

      // Defer the push by a frame so the dismiss animation settles before we
      // navigate — prevents the brief flash of /bag underneath.
      requestAnimationFrame(() => {
        router.push({
          pathname: '/order-confirmation',
          params: {
            order: orderNumber,
            eta: etaLabel,
            total: total.toFixed(2),
            items: String(itemsCount),
            addr: `${addr.line1} · ${addr.line2}`,
          },
        });
      });
    }, 700);
  };

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
          <Mono size={10} color={colors.pinkDeep}>CHECKOUT</Mono>
          <Mono size={9} color={colors.mute}>STEP 02 OF 02</Mono>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 130 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingHorizontal: 22, paddingTop: 4, paddingBottom: 18 }}>
          <Ribbon tone="pink" tilt={-2} style={{ marginBottom: 10 }}>
            ★ {count} ITEM{count === 1 ? '' : 'S'} · £{total.toFixed(2)} ★
          </Ribbon>
          <Display
            size={44}
            color={colors.ink}
            shadow={{ color: colors.pink, x: 4, y: 4 }}
          >
            ONE LAST
          </Display>
          <Italic
            size={36}
            color={colors.pink}
            shadow={{ color: colors.ink, x: 3, y: 3 }}
            style={{ marginTop: -6, marginLeft: 6 }}
          >
            thing.
          </Italic>
        </View>

        {/* Delivery address */}
        <Section kicker="WHERE TO" title="DELIVERY">
          <View style={{ gap: 10 }}>
            {ADDRESSES.map((a) => {
              const selected = a.id === addrId;
              return (
                <OptionRow
                  key={a.id}
                  selected={selected}
                  onPress={() => setAddrId(a.id)}
                  icon={<Icons.Pin color={selected ? colors.cream : colors.pinkDeep} size={18} />}
                  iconBg={selected ? colors.pink : colors.pinkMist}
                  iconBorder={selected ? colors.ink : colors.pinkDeep}
                  title={a.label.toUpperCase()}
                  subtitle={`${a.line1}\n${a.line2}`}
                />
              );
            })}
            <Pressable
              onPress={() => comingSoon('Add new address')}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderRadius: 14,
                borderWidth: 1.5,
                borderColor: colors.ink,
                borderStyle: 'dashed',
                backgroundColor: 'transparent',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Icons.Plus color={colors.ink} size={14} />
              <Mono size={11} color={colors.ink}>ADD NEW ADDRESS</Mono>
            </Pressable>
          </View>
        </Section>

        {/* Delivery time */}
        <Section kicker="WHEN" title="TIME">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {TIMES.map((t) => {
              const sel = t.id === timeId;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => setTimeId(t.id)}
                  style={({ pressed }) => ({
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    borderRadius: 999,
                    borderWidth: 1.5,
                    borderColor: colors.ink,
                    backgroundColor: sel ? colors.ink : '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    opacity: pressed ? 0.94 : 1,
                    ...(sel ? shadow(colors.ink, 2, 2) : {}),
                  })}
                >
                  <Mono size={11} color={sel ? colors.butter : colors.ink}>
                    {t.label}
                  </Mono>
                  <Mono size={9} color={sel ? 'rgba(255,200,72,0.7)' : colors.mute}>
                    {t.sub}
                  </Mono>
                </Pressable>
              );
            })}
          </View>
        </Section>

        {/* Payment */}
        <Section kicker="HOW" title="PAYMENT">
          <View style={{ gap: 10 }}>
            {PAYMENTS.map((p) => {
              const sel = p.id === payId;
              return (
                <OptionRow
                  key={p.id}
                  selected={sel}
                  onPress={() => setPayId(p.id)}
                  icon={<PayIcon kind={p.kind} color={sel ? colors.cream : colors.ink} />}
                  iconBg={sel ? colors.ink : colors.cream2}
                  iconBorder={sel ? colors.ink : colors.ink}
                  title={p.label}
                  subtitle={p.sub}
                />
              );
            })}
          </View>
        </Section>

        {/* Tip */}
        <Section kicker="LOOK AFTER YOUR DRIVER" title="TIP" optional>
          <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
            {[0, 1, 2, 3].map((t) => {
              const sel = t === tip;
              return (
                <Pressable
                  key={t}
                  onPress={() => setTip(t)}
                  style={({ pressed }) => ({
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 999,
                    borderWidth: 1.5,
                    borderColor: colors.ink,
                    backgroundColor: sel ? colors.pink : '#fff',
                    opacity: pressed ? 0.94 : 1,
                    ...(sel ? shadow(colors.ink, 2, 2) : {}),
                  })}
                >
                  <Mono size={11} color={sel ? colors.cream : colors.ink}>
                    {t === 0 ? 'NO TIP' : `£${t.toFixed(2)}`}
                  </Mono>
                </Pressable>
              );
            })}
          </View>
        </Section>

        {/* Promo */}
        <Section kicker="GOT A CODE?" title="PROMO" optional>
          {promo ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                backgroundColor: colors.pinkMist,
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderWidth: 1.5,
                borderColor: colors.pinkDeep,
              }}
            >
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: colors.pink,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icons.Check color={colors.cream} size={14} />
              </View>
              <Body weight="700" size={13} color={colors.ink} style={{ flex: 1 }}>
                {promo.label}
              </Body>
              <Pressable hitSlop={8} onPress={removePromo}>
                <Icons.Close color={colors.pinkDeep} size={12} />
              </Pressable>
            </View>
          ) : (
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  borderRadius: 14,
                  borderWidth: 1.5,
                  borderColor: promoError ? colors.pinkDeep : colors.ink,
                  paddingLeft: 14,
                  paddingRight: 6,
                  paddingVertical: 6,
                }}
              >
                <TextInput
                  value={promoInput}
                  onChangeText={(t) => {
                    setPromoInput(t);
                    if (promoError) setPromoError(null);
                  }}
                  placeholder="ARCHIES10"
                  placeholderTextColor={colors.mute2}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  style={{
                    flex: 1,
                    fontFamily: 'SpaceMono_700Bold',
                    fontSize: 13,
                    letterSpacing: 1.4,
                    color: colors.ink,
                    paddingVertical: 8,
                  }}
                />
                <Pressable
                  onPress={applyPromo}
                  style={({ pressed }) => ({
                    backgroundColor: colors.ink,
                    paddingHorizontal: 14,
                    paddingVertical: 8,
                    borderRadius: 999,
                    opacity: pressed ? 0.85 : 1,
                  })}
                >
                  <Mono size={10} color={colors.butter}>APPLY</Mono>
                </Pressable>
              </View>
              {promoError && (
                <Mono size={10} color={colors.pinkDeep}>
                  {promoError.toUpperCase()}
                </Mono>
              )}
            </View>
          )}
        </Section>

        {/* Summary */}
        <Section kicker="THE DAMAGE" title="SUMMARY">
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 22,
              borderWidth: 2,
              borderColor: colors.ink,
              padding: 16,
              ...shadow(colors.ink, 3, 3),
            }}
          >
            <TotalRow label="Subtotal" value={`£${subtotal.toFixed(2)}`} />
            <TotalRow label="Delivery" value={`£${DELIVERY_GBP.toFixed(2)}`} />
            {tip > 0 && <TotalRow label="Driver tip" value={`£${tip.toFixed(2)}`} />}
            {promo && (
              <TotalRow
                label={promo.code}
                value={`-£${Math.abs(promoDelta).toFixed(2)}`}
                accent
              />
            )}
            <View
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1.5,
                borderTopColor: colors.line2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Display size={20} color={colors.ink}>TOTAL</Display>
              <Display size={26} color={colors.pink}>£{total.toFixed(2)}</Display>
            </View>
          </View>
        </Section>
      </ScrollView>

      {/* Place order */}
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
          transform: [{ scale: placeScale }],
        }}
      >
        <Pressable
          onPress={onPlaceOrder}
          disabled={lines.length === 0 || placing}
          style={({ pressed }) => ({
            backgroundColor: lines.length === 0 ? colors.mute2 : colors.pink,
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
            <Mono size={11} color={colors.butter}>×{count}</Mono>
          </View>
          <Mono size={12} color={colors.cream}>
            {placing ? 'PLACING…' : 'PLACE ORDER'}
          </Mono>
          <Mono size={12} color={colors.cream}>£{total.toFixed(2)}</Mono>
        </Pressable>
      </Animated.View>
    </View>
  );
}

function Section({
  kicker,
  title,
  optional,
  children,
}: {
  kicker: string;
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={{ paddingHorizontal: 22, marginTop: 26 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}
      >
        <View style={{ width: 14, height: 2, backgroundColor: colors.pink }} />
        <Mono size={10} color={colors.pinkDeep}>{kicker}</Mono>
        {optional && <Mono size={9} color={colors.mute}>· OPTIONAL</Mono>}
      </View>
      <Display size={26} color={colors.ink} style={{ marginBottom: 12 }}>
        {title}
      </Display>
      {children}
    </View>
  );
}

function OptionRow({
  selected,
  onPress,
  icon,
  iconBg,
  iconBorder,
  title,
  subtitle,
}: {
  selected: boolean;
  onPress: () => void;
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        backgroundColor: selected ? colors.pinkMist : '#fff',
        borderRadius: 18,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderWidth: 2,
        borderColor: selected ? colors.pinkDeep : colors.ink,
        opacity: pressed ? 0.94 : 1,
        ...(selected ? shadow(colors.pinkDeep, 2, 2) : {}),
      })}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 14,
          backgroundColor: iconBg,
          borderWidth: 1.5,
          borderColor: iconBorder,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Display size={16} color={colors.ink} numberOfLines={1}>
          {title}
        </Display>
        <Mono size={10} color={colors.mute} style={{ marginTop: 2 }}>
          {subtitle}
        </Mono>
      </View>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: colors.ink,
          backgroundColor: selected ? colors.pink : '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected && <Icons.Check color={colors.cream} size={12} />}
      </View>
    </Pressable>
  );
}

function TotalRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
      }}
    >
      <Mono size={11} color={accent ? colors.pinkDeep : colors.mute}>
        {label.toUpperCase()}
      </Mono>
      <Body weight="700" size={13} color={accent ? colors.pinkDeep : colors.ink}>
        {value}
      </Body>
    </View>
  );
}

function PayIcon({ kind, color }: { kind: 'apple' | 'card' | 'cash'; color: string }) {
  if (kind === 'apple') {
    return <Mono size={14} color={color}>Pay</Mono>;
  }
  if (kind === 'card') {
    return <Icons.QR color={color} size={20} />;
  }
  return <Mono size={11} color={color}>£</Mono>;
}

function CircleBtn({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
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
