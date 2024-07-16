import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const VehicleTypeDropDown = () => {
    const [selectedValue, setSelectedValue] = useState('');

    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => setSelectedValue(value)}
                items={[
                    { label: 'Bicycle', value: '0' },
                    { label: 'Bike', value: '1' },
                    { label: 'Bus', value: '2' },
                    { label: 'Car', value: '3' },
                    { label: 'Concrete Mixer', value: '4' },
                    { label: 'Container Truck', value: '5' },
                    { label: 'Fire Engine', value: '6' },
                    { label: 'Fork Lift', value: '7' },
                    { label: 'Jeep', value: '8' },
                    { label: 'Lorry', value: '9' },
                    { label: 'Pick Up', value: '10' },
                    { label: 'SUV', value: '11' },
                    { label: 'Tractor', value: '12' },
                    { label: 'TukTuk', value: '13' },
                    { label: 'Van', value: '14' },
                ]}
                placeholder={{
                    label: 'Select vehicle type',
                    value: null,
                    color: 'gray',
                }}
                style={pickerSelectStyles}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
            height: 40,
            paddingHorizontal: 8,
            width: "75%",
        marginLeft: -8,
        borderStyle: "solid",
        borderColor: "gray",
        // borderRadius: 50
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default VehicleTypeDropDown;
