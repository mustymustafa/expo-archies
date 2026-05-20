// Root layout — loads fonts, sets up the stack navigator with the
// (tabs) group plus modal/standalone routes (welcome, login, signup,
// refer, menu).
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useArchiesFonts } from '@/hooks/useArchiesFonts';
import { View } from 'react-native';
import { colors } from '@/theme/tokens';
import { CartProvider } from '@/store/cart';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const loaded = useArchiesFonts();
  useEffect(() => { if (loaded) SplashScreen.hideAsync().catch(() => {}); }, [loaded]);
  if (!loaded) return <View style={{ flex: 1, backgroundColor: colors.cream }}/>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.cream } }}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="login" options={{ presentation: 'card' }}/>
            <Stack.Screen name="signup" options={{ presentation: 'card' }}/>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="refer" options={{ presentation: 'modal' }}/>
            <Stack.Screen name="menu" options={{ presentation: 'modal' }}/>
            <Stack.Screen name="browse-menu" options={{ presentation: 'modal', animation: 'slide_from_bottom' }}/>
            <Stack.Screen name="item/[slug]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }}/>
            <Stack.Screen name="bag" options={{ presentation: 'modal', animation: 'slide_from_bottom' }}/>
            <Stack.Screen name="checkout" options={{ presentation: 'modal', animation: 'slide_from_right' }}/>
            <Stack.Screen name="order-confirmation" options={{ gestureEnabled: false, animation: 'fade', headerBackVisible: false }}/>
          </Stack>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
