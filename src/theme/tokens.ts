// Design tokens — colors, fonts, shadows, sizes.
// Single source of truth for the retro Archie's app.

export const colors = {
  // creams & warm neutrals (70s diner palette)
  cream: '#FFF1DC',
  cream2: '#F7E2C2',
  cream3: '#EFD0A3',

  // jewel pinks (the brand)
  pink: '#FF1F7A',
  pink2: '#FF4691',
  pinkDeep: '#C8146B',
  pinkDarker: '#7A0838',
  pinkSoft: '#FFD8E7',
  pinkBlush: '#FFE0E9',
  pinkMist: '#FFEAF1',

  // buttery accent (the second jewel color)
  butter: '#FFC848',
  butterDeep: '#E5A015',
  mustard: '#C97D14',

  // dark
  ink: '#1F1014',
  ink2: '#4A2A30',
  maroon: '#5C0F1F',
  rust: '#B83A1A',
  olive: '#6E5A1A',

  // muted text
  mute: '#8A6F75',
  mute2: '#B4928E',

  // hairlines
  line: 'rgba(31,16,20,0.08)',
  line2: 'rgba(31,16,20,0.14)',
};

export const fonts = {
  // chunky retro wood-type — primary display
  display: 'BagelFatOne_400Regular',
  // playful retro serif italic — accent
  italic: 'Caprasimo_400Regular',
  // typewriter-y mono — labels, ribbons, badges
  mono: 'SpaceMono_700Bold',
  monoRegular: 'SpaceMono_400Regular',
  // body text
  text: 'DMSans_400Regular',
  textMedium: 'DMSans_500Medium',
  textBold: 'DMSans_700Bold',
};

// RN shadow + elevation preset — flat retro offset shadow (sharp, no blur)
export const shadow = (color = colors.ink, x = 4, y = 4) => ({
  shadowColor: color,
  shadowOffset: { width: x, height: y },
  shadowOpacity: 1,
  shadowRadius: 0,
  // Android falls back to a soft elevation since it can't do offset blur shadows
  elevation: 4,
});

// Text shadow preset — riso-print offset
export const textShadow = (color: string, x = 3, y = 3) => ({
  textShadowColor: color,
  textShadowOffset: { width: x, height: y },
  textShadowRadius: 0,
});

export const radii = {
  sm: 8,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};
