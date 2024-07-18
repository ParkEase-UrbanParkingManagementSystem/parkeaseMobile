import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const PlateNoInput_type1 = () => {
    const [EnglishLetter, setEnglishLetter] = useState('');
    const [Numeric, setNumeric] = useState('');
    const [plateInfo, setPlateInfo] = useState({
        EnglishLetter: "",
        Numeric: "",
    });

    return (
        <>
            <TextInput
                style={styles.EnglishLetterInput}
                keyboardType="default"
                placeholder="ABC"
                value={plateInfo.EnglishLetter}
                onChangeText={(value) =>
                    setPlateInfo({ ...plateInfo, EnglishLetter: value })
                }
            />
            <Text>-</Text>
            <TextInput
                style={styles.NumericInput}
                placeholder="1234"
                value={plateInfo.Numeric}
                onChangeText={(value) =>
                    setPlateInfo({ ...plateInfo, Numeric: value })
                }
            /></>
    );
};

const styles = StyleSheet.create({
    EnglishLetterInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
        width: "20%"
    },
    NumericInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: 8,
        width: "42%"
    }
});

export default PlateNoInput_type1;
