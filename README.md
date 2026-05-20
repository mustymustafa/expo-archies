# Archie's — Retro premium redesign (Expo)

A runnable Expo Router project translating the HTML/React design into
React Native. All 9 screens are wired up, with the full retro design
system (chunky wood-type display, riso offset shadows, starburst stamps,
sunburst rays, halftone overlays, ticket-edge cards, butter-yellow accents).

## Run it

```bash
npm install
npx expo start
```

Then press **`i`** to open the iOS simulator (or **`a`** for Android, or scan
the QR code with **Expo Go** on your phone).

> Requires Node ≥ 18 and Xcode (for iOS) / Android Studio (for Android).
> First `npx expo start` may take a minute to compile the JSC bundle.

## What's inside

```
expo-archies/
├── app/                          ← expo-router routes
│   ├── _layout.tsx               root stack (loads fonts, sets nav)
│   ├── index.tsx                 redirects to /welcome
│   ├── welcome.tsx               01 · Welcome (uses shaker-fries.jpg)
│   ├── login.tsx                 02 · Login + Face ID
│   ├── signup.tsx                03 · Sign up — step 01
│   ├── menu.tsx                  09 · Side menu / profile (modal)
│   ├── refer.tsx                 08 · Refer a friend (modal)
│   └── (tabs)/
│       ├── _layout.tsx           custom-tabBar layout
│       ├── home.tsx              04 · Home (the hero feed)
│       ├── rewards.tsx           05 · Loyalty / Rewards
│       ├── scan.tsx              center QR action
│       ├── order.tsx             06 · Order Now
│       └── locations.tsx         07 · Locations
├── src/
│   ├── theme/tokens.ts           colors / fonts / shadow helpers
│   ├── hooks/useArchiesFonts.ts  Google Fonts loader
│   └── components/               retro design system
│       ├── Type.tsx              <Display> <Italic> <Mono> <Body>
│       ├── Pill.tsx              CTA button with offset shadow
│       ├── Starburst.tsx         vintage stamp/seal
│       ├── Sunburst.tsx          radial ray backdrop
│       ├── Halftone.tsx          tiled-dot overlay
│       ├── Ribbon.tsx            tilted mono-caps banner
│       ├── ArcText.tsx           curved text along a circle
│       ├── OffsetShadow.tsx      sharp-offset shadow wrapper
│       ├── Icon.tsx              SVG icon set
│       ├── Logo.tsx              placeholder "A" mark
│       ├── FoodSlot.tsx          gradient + stripe food placeholder
│       ├── SectionHead.tsx       kicker + display title pair
│       ├── RewardTracker.tsx     the points-tracker hero card
│       └── BottomNav.tsx         the custom retro tab bar
└── assets/
    └── shaker-fries.jpg          welcome-screen hero image
```

## Design system

**Fonts** (auto-loaded via `@expo-google-fonts`):
- `Bagel Fat One` — chunky wood-type display (`<Display>`)
- `Caprasimo` — playful retro serif italic (`<Italic>`)
- `Space Mono` — labels, ribbons, badges (`<Mono>`)
- `DM Sans` — body / form text (`<Body>`)

**Color tokens** (`src/theme/tokens.ts`):
- `pink / pinkDeep / pinkDarker` — the jewel pink
- `butter / butterDeep` — the second jewel (yellow)
- `cream / cream2 / cream3` — warm 70s diner neutrals
- `ink / ink2 / maroon` — darks

**Shadows** are flat retro offsets (4px down-right, sharp, no blur). On iOS
they render via `shadowColor + shadowOffset + shadowRadius=0`. On Android
they're approximated by the wrapper `<OffsetShadow>` component (a duplicate
View positioned underneath) and small `elevation`.

## Customizing

- **Drop in your real logo** — replace the placeholder in `src/components/Logo.tsx`
  with an `<Image source={require('../../assets/logo.png')} />`.
- **Add food photography** — `FoodSlot` is a gradient placeholder. Swap each
  usage to `<ImageBackground source={require('../assets/...')} />`.
- **Wire real auth** — `app/index.tsx` always redirects to `/welcome`. Read
  your session there and redirect to `/(tabs)/home` if signed in.
- **Tweak the retro intensity** — knock back `Halftone opacity`, `Sunburst opacity`,
  or `shadow x/y` in `tokens.ts` to dial it down.

## Notes & caveats

- **Curved text** (`<ArcText>`) uses SVG `<TextPath>`. On some Android versions
  this can flicker; if so, switch to a static image.
- **`mask-image` and `mix-blend-mode`** from the web version don't exist in RN —
  we use opacity + duplicate Views instead. The look is close but not pixel-identical.
- **Backdrop blur** (glass pills) doesn't exist on RN without `expo-blur`. Right
  now the `glass` Pill kind uses a semi-transparent solid; add `expo-blur` and
  swap in `<BlurView>` if you want real frosting.
- **No real QR scanning** — `/(tabs)/scan` is a placeholder display. Add
  `expo-camera` + `BarCodeScanner` when you wire it up.
