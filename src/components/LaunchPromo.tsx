// Schedules a simulated local notification ~3s after app launch so the
// banner appears as a real OS notification (Android heads-up / iOS banner).
// No UI — this component renders nothing.
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const DELAY_SECONDS = 3;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export function LaunchPromo() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const settings = await Notifications.getPermissionsAsync();
        let granted = settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
        if (!granted) {
          const req = await Notifications.requestPermissionsAsync({
            ios: { allowAlert: true, allowBadge: false, allowSound: true, provideAppNotificationSettings: true },
          });
          granted = req.granted || req.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
        }
        if (!granted || cancelled) return;

        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('promos', {
            name: 'Archie\'s offers',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 200, 100, 200],
          });
        }

        await Notifications.scheduleNotificationAsync({
          content: {
            title: '★ 2-for-1 Smash Night',
            body: 'Tonight only — order any smash, get one free at Archie\'s.',
            sound: 'default',
            data: { promo: '2for1-smash' },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: DELAY_SECONDS,
            channelId: Platform.OS === 'android' ? 'promos' : undefined,
          },
        });
      } catch {
        // Notifications aren't supported in Expo Go for SDK 53+ on some platforms,
        // or on web — silently skip.
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return null;
}
