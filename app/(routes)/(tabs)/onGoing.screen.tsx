// OngoingScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/Colors";

const OngoingScreen = () => {
    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1}}
        >
            <ScrollView style={{ flex: 1 }}>

            </ScrollView>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OngoingScreen;
