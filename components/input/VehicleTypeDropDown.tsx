import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

// Define the props interface
interface VehicleTypeDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const VehicleTypeDropDown: React.FC<VehicleTypeDropdownProps> = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <RNPickerSelect
                onValueChange={(value) => onChange(value)} // Call the parent function when value changes
                items={[
                    { label: 'Car/SVU/Van/Jeep/Pickup', value: '1' },
                    { label: 'Bike', value: '2' },                                
                    { label: 'TukTuk', value: '3' },
                    { label: 'Large Vehicle', value: '4' },
                ]}
                placeholder={{
                    label: 'Select vehicle type',
                    value: null,
                    color: 'gray',
                }}
                style={pickerSelectStyles}
                value={value} // Set the selected value
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
        borderColor: "gray",
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
        paddingRight: 30,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
    },
});

export default VehicleTypeDropDown;
