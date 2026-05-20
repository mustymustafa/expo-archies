// Load Google fonts (Bagel Fat One, Caprasimo, Space Mono, DM Sans)
import { useFonts as useBagelFatOne } from '@expo-google-fonts/bagel-fat-one';
import { BagelFatOne_400Regular } from '@expo-google-fonts/bagel-fat-one';
import { Caprasimo_400Regular } from '@expo-google-fonts/caprasimo';
import { SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono';
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold } from '@expo-google-fonts/dm-sans';

export function useArchiesFonts() {
  const [loaded] = useBagelFatOne({
    BagelFatOne_400Regular,
    Caprasimo_400Regular,
    SpaceMono_400Regular,
    SpaceMono_700Bold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });
  return loaded;
}
