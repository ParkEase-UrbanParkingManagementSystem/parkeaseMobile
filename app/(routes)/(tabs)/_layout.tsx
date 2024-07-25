// ActivitiesScreen.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OngoingScreen from '@/app/(routes)/(tabs)/onGoing.screen';
import HistoryScreen from '@/app/(routes)/(tabs)/history.screen';
import PermitsScreen from '@/app/(routes)/(tabs)/permits.screen';

const Tab = createMaterialTopTabNavigator();

const ActivitiesScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { marginTop: 60 }, // Adjust the marginTop as needed
            }}
        >
            <Tab.Screen name="Ongoing" component={OngoingScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Permits" component={PermitsScreen} />
        </Tab.Navigator>
    );
};

export default ActivitiesScreen;
