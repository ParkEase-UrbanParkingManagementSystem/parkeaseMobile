import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const VehicleNameInput = () => {
    const [name, setName] = useState('');

    return (
        <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Nissan Leaf 2020 "
            value={name}
            onChangeText={(value) => setName(value)}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
        width: "70%"
    },
});

export default VehicleNameInput;
