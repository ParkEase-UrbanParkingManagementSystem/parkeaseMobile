import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { VehicleProvider } from '../utils/vehicleContext'; 
import OnBoarding from './(routes)/onboarding';
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo"
import { LogBox } from "react-native";
import { tokenCache } from "@/lib/auth";
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// SplashScreen.preventAutoHideAsync();

const clerk_publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const stripe_publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

if (!clerk_publishableKey) {
  throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

LogBox.ignoreLogs(["Clerk:"]);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <ClerkProvider tokenCache={tokenCache} publishableKey={clerk_publishableKey}>
        <ClerkLoaded>
          <VehicleProvider>
            <StripeProvider publishableKey={stripe_publishableKey}>
              <RootLayoutNav />
            </StripeProvider>
          </VehicleProvider>
        </ClerkLoaded>
      </ClerkProvider>
  );
}

function RootLayoutNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <View />
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(routes)/welcome-intro/index" />
          <Stack.Screen name="(routes)/login/index" />
          <Stack.Screen name="(routes)/sign-up/index" />
          <Stack.Screen name="(routes)/forgot-password/index" />
          <Stack.Screen name="(routes)/verifyAccount/index" />
          <Stack.Screen name="(routes)/choose-vehicle/index" />
          <Stack.Screen name="(routes)/add-vehicle/index" />
          <Stack.Screen name="(routes)/home-page/index" />
          <Stack.Screen name="(routes)/profile/index" />
          <Stack.Screen name="(routes)/QR/index" />
          <Stack.Screen name="(routes)/parking-lot/index" />
          <Stack.Screen name="(routes)/activities/index" />
          <Stack.Screen name="(routes)/payment/bill" />
          <Stack.Screen name="(routes)/payment/paymentMethods" />
          <Stack.Screen name="(routes)/payment/wallet" />
          <Stack.Screen name="(routes)/info/index" />
          <Stack.Screen name="(routes)/parked/index" />
          <Stack.Screen name="(routes)/instance/index" />
          <Stack.Screen name="(routes)/(tabs)" />
          <Stack.Screen name="(routes)/parkpoints/index" />
          <Stack.Screen name="(routes)/wallet/index" />
          <Stack.Screen name="(routes)/recents/index" />

          <Stack.Screen name="+not-found" />
        </Stack>
      )}
    </>
  );
}
