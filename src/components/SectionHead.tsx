// SectionHead — kicker + display title pair used on home/order/rewards feeds.
import React from 'react';
import { View, Pressable } from 'react-native';
import { Display, Mono } from './Type';
import { colors } from '@/theme/tokens';

type Props = {
  kicker?: string;
  title: string;
  action?: string | null;
  onActionPress?: () => void;
};

export function SectionHead({ kicker, title, action = 'See all', onActionPress }: Props) {
  return (
    <View style={{
      paddingHorizontal: 22, marginBottom: 14,
    }}>
      {kicker && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <View style={{ width: 14, height: 2, backgroundColor: colors.pink }}/>
          <Mono size={10} color={colors.pinkDeep}>{kicker}</Mono>
        </View>
      )}
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Display
            size={28}
            color={colors.ink}
            shadow={{ color: colors.pink, x: 3, y: 3 }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {title}
          </Display>
        </View>
        {action && (
          <Pressable
            onPress={onActionPress}
            style={{
              borderBottomWidth: 2,
              borderBottomColor: colors.ink,
              paddingBottom: 2,
              marginBottom: 4,
            }}
          >
            <Mono size={10} color={colors.ink}>{action} →</Mono>
          </Pressable>
        )}
      </View>
    </View>
  );
}
