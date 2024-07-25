// OngoingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OngoingScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Ongoing Activities</Text>
        </View>
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
