// Entry — redirect to /welcome on first launch.
// Swap to '/(tabs)/home' once you wire real auth state.
import { Redirect } from 'expo-router';
export default function Index() { return <Redirect href="/welcome"/>; }
