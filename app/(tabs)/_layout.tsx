// Tabs layout — uses our custom retro pill BottomNav as the tab bar.
import React from 'react';
import { Tabs } from 'expo-router';
import { BottomNav } from '@/components/BottomNav';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props}/>}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="rewards" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="order" />
      <Tabs.Screen name="locations" />
    </Tabs>
  );
}
