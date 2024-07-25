// PermitsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from "@/constants/Colors";
import {LinearGradient} from "expo-linear-gradient";

const PermitsScreen = () => {
    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Currently You dont have any permits</Text>
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

export default PermitsScreen;
