// Food image registry — maps a stable key to a require()'d JPG asset under
// `assets/food/`. Each card uses its OWN key so the user can drop different
// photos in for different cards (no visual repeats). All keys currently
// point at placeholder copies — replace the binary file per key as real
// photography comes in (filename stays).

import type { ImageSourcePropType } from 'react-native';

export const foodImages = {
  wings:     require('../../assets/food/wings.jpg') as ImageSourcePropType,
  burgers:   require('../../assets/food/burgers.jpg') as ImageSourcePropType,
  spread:    require('../../assets/food/spread.jpg') as ImageSourcePropType,
  shake:     require('../../assets/food/shake.jpg') as ImageSourcePropType,
  fries:     require('../../assets/food/fries.jpg') as ImageSourcePropType,
  smash:     require('../../assets/food/smash.jpg') as ImageSourcePropType,
  combo:     require('../../assets/food/combo.jpg') as ImageSourcePropType,
  curly:     require('../../assets/food/curly.jpg') as ImageSourcePropType,
  tenders:   require('../../assets/food/tenders.jpg') as ImageSourcePropType,
  milkshake: require('../../assets/food/milkshake.jpg') as ImageSourcePropType,
  sides:     require('../../assets/food/sides.jpg') as ImageSourcePropType,
  nuggets:   require('../../assets/food/nuggets.jpg') as ImageSourcePropType,
  late:      require('../../assets/food/late.jpg') as ImageSourcePropType,
  secret:    require('../../assets/food/secret.jpg') as ImageSourcePropType,
  crispy:    require('../../assets/food/crispy.jpg') as ImageSourcePropType,
  honey:     require('../../assets/food/honey.jpg') as ImageSourcePropType,
  og:        require('../../assets/food/og.jpg') as ImageSourcePropType,
  pink:      require('../../assets/food/pink.jpg') as ImageSourcePropType,
} as const;

export type FoodKey = keyof typeof foodImages;
