import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface VehicleNameInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

const VehicleNameInput: React.FC<VehicleNameInputProps> = ({ value, onChangeText }) => {
    const [name, setName] = useState('');

    return (
        <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter Vehicle Name"
            placeholderTextColor="#A1A1A1" // Optional: Add placeholder color
            value={value}
            onChangeText={onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 55,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 15,
        width: "80%", // Updated to be consistent with the layout
        fontSize: 16,
    },
});

export default VehicleNameInput;
