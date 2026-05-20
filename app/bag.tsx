// 12 · Bag — review lines from the cart store, tweak qty, checkout CTA.
import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono, Body } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { FoodSlot } from '@/components/FoodSlot';
import { Ribbon } from '@/components/Ribbon';
import { foodImages } from '@/lib/foodImages';
import { useCart, type CartLine } from '@/store/cart';
import { colors, shadow } from '@/theme/tokens';

const DELIVERY_GBP = 1.99;

export default function BagScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { lines, count, subtotal, inc, dec, remove, clear } = useCart();

  const total = lines.length > 0 ? subtotal + DELIVERY_GBP : 0;

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
          <Mono size={10} color={colors.pinkDeep}>YOUR BAG</Mono>
          <Mono size={9} color={colors.mute}>
            {count} ITEM{count === 1 ? '' : 'S'}
          </Mono>
        </View>
        {lines.length > 0 ? (
          <Pressable
            onPress={clear}
            style={{
              height: 40,
              paddingHorizontal: 14,
              borderRadius: 20,
              backgroundColor: '#fff',
              borderWidth: 1.5,
              borderColor: colors.ink,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Mono size={10} color={colors.ink}>CLEAR</Mono>
          </Pressable>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {lines.length === 0 ? (
        <EmptyBag onBrowse={() => router.push('/browse-menu')} />
      ) : (
        <>
          <View style={{ paddingHorizontal: 22, paddingTop: 4, paddingBottom: 14 }}>
            <Ribbon tone="pink" tilt={-2} style={{ marginBottom: 10 }}>
              ★ READY WHEN YOU ARE ★
            </Ribbon>
            <Display
              size={44}
              color={colors.ink}
              shadow={{ color: colors.pink, x: 4, y: 4 }}
            >
              ALMOST
            </Display>
            <Italic
              size={36}
              color={colors.pink}
              shadow={{ color: colors.ink, x: 3, y: 3 }}
              style={{ marginTop: -6, marginLeft: 6 }}
            >
              there.
            </Italic>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 18,
              paddingBottom: insets.bottom + 200,
              gap: 12,
            }}
          >
            {lines.map((line) => (
              <BagRow
                key={line.id}
                line={line}
                onInc={() => inc(line.id)}
                onDec={() => dec(line.id)}
                onRemove={() => remove(line.id)}
              />
            ))}

            {/* Totals card */}
            <View
              style={{
                marginTop: 8,
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
              <View
                style={{
                  marginTop: 10,
                  paddingTop: 12,
                  borderTopWidth: 1.5,
                  borderTopColor: colors.line2,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <Display size={20} color={colors.ink}>TOTAL</Display>
                <Display size={26} color={colors.pink}>
                  £{total.toFixed(2)}
                </Display>
              </View>
            </View>
          </ScrollView>

          {/* Checkout bar */}
          <View
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
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                backgroundColor: colors.ink,
                borderRadius: 999,
                paddingVertical: 16,
                paddingHorizontal: 22,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 2,
                borderColor: colors.ink,
                opacity: pressed ? 0.94 : 1,
                ...shadow(colors.maroon, 3, 3),
              })}
            >
              <View
                style={{
                  backgroundColor: colors.pink,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                }}
              >
                <Mono size={11} color={colors.cream}>×{count}</Mono>
              </View>
              <Mono size={12} color={colors.butter}>CHECKOUT</Mono>
              <Mono size={12} color={colors.butter}>£{total.toFixed(2)}</Mono>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

function BagRow({
  line,
  onInc,
  onDec,
  onRemove,
}: {
  line: CartLine;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
}) {
  const lineTotal = line.unitPrice * line.qty;
  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 22,
        borderWidth: 2,
        borderColor: colors.ink,
        padding: 12,
        flexDirection: 'row',
        gap: 12,
        ...shadow(colors.ink, 3, 3),
      }}
    >
      <View
        style={{
          width: 78,
          height: 78,
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: 1.5,
          borderColor: colors.ink,
        }}
      >
        <FoodSlot tone="pink" radius={0} image={foodImages[line.image]} style={{ flex: 1 }} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Display size={16} color={colors.ink} numberOfLines={1}>
          {line.name}
        </Display>
        {(line.removed?.length ?? 0) > 0 && (
          <Mono size={9} color={colors.mute} style={{ marginTop: 3 }}>
            NO {(line.removed ?? []).join(', ').toUpperCase()}
          </Mono>
        )}
        {(line.extras?.length ?? 0) > 0 && (
          <Mono size={9} color={colors.pinkDeep} style={{ marginTop: 3 }}>
            + {(line.extras ?? []).map((e) => e.label).join(', ').toUpperCase()}
          </Mono>
        )}
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              backgroundColor: colors.pinkMist,
              borderRadius: 999,
              padding: 4,
              borderWidth: 1.5,
              borderColor: colors.ink,
            }}
          >
            <RowStep onPress={onDec}>
              <Icons.Minus color={colors.cream} size={12} />
            </RowStep>
            <Mono size={11} color={colors.ink}>{String(line.qty).padStart(2, '0')}</Mono>
            <RowStep onPress={onInc}>
              <Icons.Plus color={colors.cream} size={12} />
            </RowStep>
          </View>
          <Body weight="700" size={14} color={colors.ink}>
            £{lineTotal.toFixed(2)}
          </Body>
        </View>
      </View>
      <Pressable
        onPress={onRemove}
        hitSlop={8}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.cream,
          borderWidth: 1.5,
          borderColor: colors.ink,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icons.Close color={colors.ink} size={10} />
      </Pressable>
    </View>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
      }}
    >
      <Mono size={11} color={colors.mute}>{label.toUpperCase()}</Mono>
      <Body weight="700" size={13} color={colors.ink}>{value}</Body>
    </View>
  );
}

function RowStep({ children, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 26,
        height: 26,
        borderRadius: 13,
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

function EmptyBag({ onBrowse }: { onBrowse: () => void }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30, gap: 14 }}>
      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          backgroundColor: colors.pinkMist,
          borderWidth: 2,
          borderColor: colors.pinkDeep,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icons.Bag color={colors.pinkDeep} size={42} />
      </View>
      <Display size={36} color={colors.ink} shadow={{ color: colors.pink, x: 3, y: 3 }}>
        EMPTY.
      </Display>
      <Italic size={22} color={colors.pink} style={{ marginTop: -8 }}>
        for now…
      </Italic>
      <Mono size={11} color={colors.mute} style={{ textAlign: 'center', maxWidth: 240, lineHeight: 16 }}>
        ADD SOMETHING FROM THE MENU AND IT'LL TURN UP RIGHT HERE.
      </Mono>
      <Pressable
        onPress={onBrowse}
        style={({ pressed }) => ({
          marginTop: 8,
          backgroundColor: colors.pink,
          borderRadius: 999,
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderWidth: 2,
          borderColor: colors.ink,
          opacity: pressed ? 0.94 : 1,
          ...shadow(colors.ink, 3, 3),
        })}
      >
        <Mono size={11} color={colors.cream}>BROWSE THE MENU →</Mono>
      </Pressable>
    </View>
  );
}
