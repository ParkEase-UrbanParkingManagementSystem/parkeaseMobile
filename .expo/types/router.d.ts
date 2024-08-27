/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)` | `/(routes)/(tabs)` | `/(routes)/(tabs)/history.screen` | `/(routes)/(tabs)/onGoing.screen` | `/(routes)/(tabs)/permits.screen` | `/(routes)/QR` | `/(routes)/activities` | `/(routes)/add-vehicle` | `/(routes)/choose-vehicle` | `/(routes)/forgot-password` | `/(routes)/history.screen` | `/(routes)/home-page` | `/(routes)/info` | `/(routes)/login` | `/(routes)/onGoing.screen` | `/(routes)/onboarding` | `/(routes)/parking-lot` | `/(routes)/payment/bill` | `/(routes)/payment/paymentMethods` | `/(routes)/payment/wallet` | `/(routes)/permits.screen` | `/(routes)/profile` | `/(routes)/sign-up` | `/(routes)/verifyAccount` | `/(routes)/welcome-intro` | `/(routes)\instance\` | `/(routes)\parked\` | `/(tabs)` | `/(tabs)/history.screen` | `/(tabs)/onGoing.screen` | `/(tabs)/permits.screen` | `/..\screens\instance\instance.screen` | `/..\screens\parked\parked.screen` | `/QR` | `/_sitemap` | `/activities` | `/add-vehicle` | `/choose-vehicle` | `/forgot-password` | `/history.screen` | `/home-page` | `/info` | `/login` | `/onGoing.screen` | `/onboarding` | `/parking-lot` | `/payment/bill` | `/payment/paymentMethods` | `/payment/wallet` | `/permits.screen` | `/profile` | `/sign-up` | `/verifyAccount` | `/welcome-intro`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
