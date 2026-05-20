// RewardTracker — the hero card on Home + Rewards. Big points number,
// retro stamp, halftone overlay, sunburst rays, milestone progress bar.
import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Display, Italic, Mono } from './Type';
import { Sunburst } from './Sunburst';
import { Halftone } from './Halftone';
import { Starburst } from './Starburst';
import { Ribbon } from './Ribbon';
import { Icons } from './Icon';
import { colors, shadow } from '@/theme/tokens';

type Props = { points?: number; target?: number };

export function RewardTracker({ points = 42, target = 50 }: Props) {
  const pct = Math.min(100, (points / target) * 100);
  const milestones = [
    { p: 13, label: '£2',  hit: points >= 13 },
    { p: 25, label: '£3',  hit: points >= 25 },
    { p: 38, label: '£4',  hit: points >= 38 },
    { p: 50, label: '£5',  hit: points >= 50 },
  ];

  return (
    <View style={{
      borderRadius: 28, overflow: 'hidden',
      borderWidth: 2, borderColor: colors.ink,
      ...shadow(colors.ink, 4, 4),
    }}>
      <LinearGradient
        colors={[colors.pink, colors.pinkDeep, colors.pinkDarker]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 22, paddingTop: 24, paddingBottom: 22, position: 'relative' }}>

        <Sunburst rays={36} color={colors.butter} opacity={0.22}/>
        <Halftone color={colors.cream} opacity={0.35}/>

        {/* corner starburst */}
        <View style={{ position: 'absolute', top: -4, right: -6, zIndex: 3 }}>
          <Starburst size={78} points={14} fill={colors.butter} rotate={16}>
            <Display size={13} color={colors.ink}>NEXT{'\n'}REWARD</Display>
            <Mono size={9} color={colors.ink} style={{ marginTop: 2 }}>{target - points} PTS</Mono>
          </Starburst>
        </View>

        <View style={{ flex: 1 }}>
          <Ribbon tone="butter" tilt={-3}>★ ADDICTS · TIER 02 ★</Ribbon>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 18 }}>
            <Display size={96} color={colors.cream} shadow={{ color: colors.maroon, x: 4, y: 4 }}>
              {String(points).padStart(2, '0')}
            </Display>
            <Display size={48} color={colors.butter} shadow={{ color: colors.maroon, x: 3, y: 3 }} style={{ marginBottom: 8 }}>
              /{target}
            </Display>
          </View>
          <Italic size={18} color={colors.cream}>
            <Italic size={18} color={colors.butter}>{target - points} pts </Italic>'til your next bite.
          </Italic>
        </View>

        {/* progress bar */}
        <View style={{ marginTop: 22, height: 40, position: 'relative' }}>
          <View style={{
            position: 'absolute', top: 16, left: 0, right: 0, height: 10,
            backgroundColor: 'rgba(31,16,20,0.32)', borderRadius: 999,
            borderWidth: 1.5, borderColor: colors.ink,
          }}/>
          <View style={{
            position: 'absolute', top: 16, left: 0, height: 10,
            width: `${pct}%`, backgroundColor: colors.butter, borderRadius: 999,
            borderWidth: 1.5, borderColor: colors.ink,
          }}/>
          {milestones.map((m, i) => {
            const x = `${(m.p / target) * 100}%`;
            return (
              <View key={i} style={{
                position: 'absolute', top: 4, left: x as any,
                transform: [{ translateX: -16 }],
                alignItems: 'center',
              }}>
                <View style={{
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: m.hit ? colors.butter : colors.cream,
                  borderWidth: 2, borderColor: colors.ink,
                  alignItems: 'center', justifyContent: 'center',
                  ...(m.hit ? shadow(colors.ink, 2, 2) : {}),
                }}>
                  {m.hit ? <Icons.Check color={colors.ink} size={14}/> : <Mono size={10} color={colors.ink}>{m.label}</Mono>}
                </View>
              </View>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}
