// Scan tab — opens the QR scanner. This screen is just a placeholder
// stub since real camera scanning needs expo-camera + permissions.
import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Display, Italic, Mono } from '@/components/Type';
import { Icons } from '@/components/Icon';
import { Starburst } from '@/components/Starburst';
import { Sunburst } from '@/components/Sunburst';
import { Halftone } from '@/components/Halftone';
import { colors, shadow } from '@/theme/tokens';

export default function ScanScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.pink }}>
      <StatusBar style="light"/>
      <Sunburst rays={36} color={colors.butter} opacity={0.18}/>
      <Halftone color={colors.cream} opacity={0.3}/>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Starburst size={120} points={16} fill={colors.butter}>
          <Display size={22} color={colors.ink}>SCAN</Display>
          <Mono size={9} color={colors.ink} style={{ marginTop: 2 }}>AT THE COUNTER</Mono>
        </Starburst>
        <View style={{
          marginTop: 32,
          width: 240, height: 240, borderRadius: 24, backgroundColor: colors.cream,
          borderWidth: 2, borderColor: colors.ink,
          alignItems: 'center', justifyContent: 'center',
          ...shadow(colors.ink, 5, 5),
        }}>
          <Icons.QR color={colors.ink} size={120}/>
        </View>
        <Display size={32} color={colors.cream} shadow={{ color: colors.ink, x: 3, y: 3 }} style={{ marginTop: 32 }}>
          SHOW THIS
        </Display>
        <Italic size={32} color={colors.butter} shadow={{ color: colors.ink, x: 3, y: 3 }}>
          to earn pts.
        </Italic>
        <Mono size={11} color={colors.cream} style={{ marginTop: 16, opacity: 0.85 }}>
          MEMBER · 9050 0150 4040 9888
        </Mono>
      </View>
    </View>
  );
}
