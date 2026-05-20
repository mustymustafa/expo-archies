import { Alert } from 'react-native';

export function comingSoon(feature?: string) {
  Alert.alert(
    feature ? `${feature} — coming soon` : 'Coming soon',
    'This feature is not included in the free prototype.'
  );
}
