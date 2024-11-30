import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

interface VehicleNumberInputProps {
    value: string;
    onChangeText: (text: string) => void;
}

const VehicleNumberInput: React.FC<VehicleNumberInputProps> = ({ value, onChangeText }) => {
    const [error, setError] = useState("");

    const handleChange = (text: string) => {
        const formattedText = text.toUpperCase();
        onChangeText(formattedText);

        // Regular expression to match the valid formats
        const validPattern = /^(?:[A-Z]{2}-\d{4}|[A-Z]{3}-\d{4}|\d{2}-\d{4})$/;

        if (!validPattern.test(formattedText)) {
            setError("Invalid vehicle number format");
        } else {
            setError(""); // Clear error if the format is valid
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardType="default"
                placeholder="Enter Number"
                placeholderTextColor="#A1A1A1"
                value={value}
                onChangeText={handleChange}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%', // Updated width to match other inputs
        marginBottom: 20,
    },
    input: {
        height: 55,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default VehicleNumberInput;
