// PermitsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PermitsScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Permits</Text>
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

export default PermitsScreen;
