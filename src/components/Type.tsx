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
// lineHeight 1.1 — Bagel Fat One glyphs (esp. tall numerals like "4", "2") push past the em-box;
// going tighter than this clips the top of digits when the parent has overflow:hidden (e.g. RewardTracker).
// Stacking still looks tight in the design (small ~6px visual gap).
export function Display({ size = 48, color = colors.ink, shadow: sh, style, children, ...p }: TxProps) {
  const sx = sh?.x ?? 3;
  const sy = sh?.y ?? 3;
  return (
    <Text
      {...p}
      allowFontScaling={false}
      style={[
        {
          fontFamily: fonts.display,
          fontSize: size,
          color,
          lineHeight: size * 1.1,
          letterSpacing: -0.4,
          includeFontPadding: false,
        },
        sh && textShadow(sh.color, sx, sy),
        style,
      ]}>
      {typeof children === 'string' ? children.toUpperCase() : children}
    </Text>
  );
}

// Caprasimo "italic" — retro playful serif. Used for "YET?", "YOU?", "YOURSELF" moments.
// Caprasimo only ships in Regular (no real italic glyphs), so `fontStyle: 'italic'` is a no-op.
// We fake italic with a horizontal skew so the accent words look properly slanted across platforms.
// `upper` defaults to true (matches the hero-accent treatment in the design); pass upper={false} for
// lowercase taglines / subscript phrases ("— since '57, slung with love.").
// When a shadow is set we treat the element as a hero accent: clamp to one line + auto-shrink so
// long words like "YOURSELF." can't wrap their trailing period onto a second line.
export function Italic({
  size = 24, color = colors.pink, shadow: sh, style, children, upper = true, ...p
}: TxProps & { upper?: boolean }) {
  const sx = sh?.x ?? 3;
  const sy = sh?.y ?? 3;
  const content = upper && typeof children === 'string' ? children.toUpperCase() : children;
  return (
    <Text
      numberOfLines={sh ? 1 : undefined}
      adjustsFontSizeToFit={sh ? true : undefined}
      minimumFontScale={sh ? 0.7 : undefined}
      {...p}
      allowFontScaling={false}
      style={[
        {
          fontFamily: fonts.italic,
          fontSize: size,
          color,
          lineHeight: size * 1.2,
          includeFontPadding: false,
          transform: [{ skewX: '-10deg' }],
        },
        sh && textShadow(sh.color, sx, sy),
        style,
      ]}>
      {content}
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
