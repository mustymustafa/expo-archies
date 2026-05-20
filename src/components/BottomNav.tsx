// Custom bottom tab bar — recreates the floating pill nav from the web
// design. 5 items with the center "Scan" as an oversized pink stud.
import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Mono } from './Type';
import { Icons } from './Icon';
import { colors, shadow } from '@/theme/tokens';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const ICON_MAP: Record<string, (c: string) => React.ReactNode> = {
  home:      (c) => <Icons.Home color={c} size={22}/>,
  rewards:   (c) => <Icons.Star color={c} size={22}/>,
  scan:      (c) => <Icons.QR color={c} size={22}/>,
  order:     (c) => <Icons.Bag color={c} size={22}/>,
  locations: (c) => <Icons.Pin color={c} size={22}/>,
};
const LABEL_MAP: Record<string, string> = {
  home: 'Home', rewards: 'Rewards', scan: 'Scan', order: 'Order', locations: 'Find',
};
// Order is fixed — center index 2 = scan = the big stud
const ORDER = ['home', 'rewards', 'scan', 'order', 'locations'];

export function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  // map our preferred order to route indices
  const ordered = ORDER
    .map((k) => state.routes.find((r) => r.name === k))
    .filter(Boolean) as typeof state.routes;
  const activeName = state.routes[state.index].name;

  return (
    <View style={{
      position: 'absolute', left: 16, right: 16,
      bottom: insets.bottom + 10,
      backgroundColor: colors.ink,
      borderRadius: 999,
      paddingHorizontal: 8, paddingVertical: 12,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      borderWidth: 2, borderColor: colors.ink,
      ...shadow(colors.maroon, 4, 4),
    }}>
      {ordered.map((route) => {
        const isCenter = route.name === 'scan';
        const isActive = route.name === activeName;
        const onPress = () => {
          const ev = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isActive && !ev.defaultPrevented) navigation.navigate(route.name);
        };
        if (isCenter) {
          return (
            <Pressable key={route.key} onPress={onPress} style={{
              width: 56, height: 56, borderRadius: 28,
              backgroundColor: colors.pink,
              alignItems: 'center', justifyContent: 'center',
              marginTop: -28,
              borderWidth: 3, borderColor: colors.ink,
              ...shadow(colors.maroon, 3, 3),
            }}>
              {ICON_MAP[route.name](colors.butter)}
            </Pressable>
          );
        }
        const c = isActive ? colors.butter : 'rgba(255,241,220,0.55)';
        return (
          <Pressable key={route.key} onPress={onPress} style={{
            flex: 1, alignItems: 'center', gap: 3, paddingVertical: 4,
          }}>
            {ICON_MAP[route.name](c)}
            <Mono size={9} color={c}>{LABEL_MAP[route.name]}</Mono>
          </Pressable>
        );
      })}
    </View>
  );
}
