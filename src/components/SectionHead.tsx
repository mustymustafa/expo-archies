// SectionHead — kicker + display title pair used on home/order/rewards feeds.
import React from 'react';
import { View } from 'react-native';
import { Display, Mono } from './Type';
import { colors } from '@/theme/tokens';

type Props = { kicker?: string; title: string; action?: string | null };

export function SectionHead({ kicker, title, action = 'See all' }: Props) {
  return (
    <View style={{
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
      paddingHorizontal: 22, marginBottom: 14,
    }}>
      <View style={{ flexShrink: 1 }}>
        {kicker && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <View style={{ width: 14, height: 2, backgroundColor: colors.pink }}/>
            <Mono size={10} color={colors.pinkDeep}>{kicker}</Mono>
          </View>
        )}
        <Display size={32} color={colors.ink} shadow={{ color: colors.pink, x: 3, y: 3 }}>
          {title}
        </Display>
      </View>
      {action && (
        <View style={{ borderBottomWidth: 2, borderBottomColor: colors.ink, paddingBottom: 3 }}>
          <Mono size={11} color={colors.ink}>{action} →</Mono>
        </View>
      )}
    </View>
  );
}
