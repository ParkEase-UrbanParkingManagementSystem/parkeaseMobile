import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// Define the props interface
interface VehicleNumberInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

const VehicleNumberInput: React.FC<VehicleNumberInputProps> = ({ value, onChangeText }) => {
    return (
        <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Enter Vehicle Number"
            value={value} // Use the value prop here
            onChangeText={onChangeText} // Use the onChangeText prop here
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

export default VehicleNumberInput;
