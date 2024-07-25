// ActivitiesScreen.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingScreen from '@/app/(routes)/(tabs)/onGoing.screen';
import HistoryScreen from '@/app/(routes)/(tabs)/history.screen';
import PermitsScreen from '@/app/(routes)/(tabs)/permits.screen';
import {SafeAreaView} from "react-native";
import colors from "@/constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {
    useFonts,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
} from "@expo-google-fonts/nunito";

const Tab = createMaterialTopTabNavigator();

const ActivitiesScreen = () => {
    let [fontsLoaded, fontError] = useFonts({
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1}}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { textTransform: 'none', color: colors.primary, fontFamily: "Nunito_600SemiBold", fontSize: 15}, // Prevent default uppercase transformation// Adjust the marginTop as needed
                        tabBarIndicatorStyle: { backgroundColor: colors.secondary }, // Change the underline color

                    }}
                >
                    <Tab.Screen name="Ongoing" component={OngoingScreen} />
                    <Tab.Screen name="History" component={HistoryScreen} />
                    <Tab.Screen name="Permits" component={PermitsScreen} />
                </Tab.Navigator>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default ActivitiesScreen;
