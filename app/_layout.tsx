import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

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
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
        <StripeProvider publishableKey="pk_test_51Pg52IClnSyidEOPK1f04a5vNTnlRICySgtJJmDG1zAoQ9TqGdljELayqUxiftG167OddlpS1aM6CWXOyZB03W9n000f0UJt7D">
          <RootLayoutNav />
        </StripeProvider>
      </ClerkProvider>
  );
}

function RootLayoutNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  // Automatically open login if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(routes)/login');
    }
  }, [isLoaded]);

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
            </Stack>
        )}
      </>
  );
}
