// Display & body text helpers — preset Text variants for each typeface
// in our system. Use these instead of bare <Text> to keep type consistent.
import React from 'react';
import { Text, TextProps, TextStyle, StyleProp } from 'react-native';
import { fonts, colors, textShadow } from '@/theme/tokens';

type TxProps = TextProps & {
  size?: number;
  color?: string;
  shadow?: { color: string; x?: number; y?: number };
  style?: StyleProp<TextStyle>;
};

// Chunky retro wood-type — Bagel Fat One. Always uppercase.
export function Display({ size = 48, color = colors.ink, shadow: sh, style, children, ...p }: TxProps) {
  return (
    <Text
      {...p}
      style={[
        { fontFamily: fonts.display, fontSize: size, color, lineHeight: size * 0.92, letterSpacing: -0.4 },
        sh && textShadow(sh.color, sh.x ?? 3, sh.y ?? 3),
        style,
      ]}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </Text>
  );
}

// Caprasimo italic — retro playful serif. Used for "yet?", "you?", "yourself" moments.
export function Italic({ size = 24, color = colors.pink, shadow: sh, style, children, ...p }: TxProps) {
  return (
    <Text
      {...p}
      style={[
        { fontFamily: fonts.italic, fontSize: size, color, lineHeight: size * 1, fontStyle: 'italic' },
        sh && textShadow(sh.color, sh.x ?? 3, sh.y ?? 3),
        style,
      ]}>
      {children}
    </Text>
  );
}

// Space Mono — for labels, ribbon text, ticket-style metadata.
export function Mono({ size = 11, color = colors.ink, bold = true, style, children, ...p }: TxProps & { bold?: boolean }) {
  return (
    <Text
      {...p}
      style={[
        {
          fontFamily: bold ? fonts.mono : fonts.monoRegular,
          fontSize: size, color,
          letterSpacing: 1.4, textTransform: 'uppercase',
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

// DM Sans — fine print + form input text.
export function Body({ size = 13, color = colors.ink, weight = '500', style, children, ...p }: TxProps & { weight?: '400' | '500' | '700' }) {
  const family = weight === '700' ? fonts.textBold : weight === '500' ? fonts.textMedium : fonts.text;
  return (
    <Text {...p} style={[{ fontFamily: family, fontSize: size, color }, style]}>{children}</Text>
  );
}
