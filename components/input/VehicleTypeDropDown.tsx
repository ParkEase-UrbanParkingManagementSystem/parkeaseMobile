import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    FlatList,
    Dimensions,
} from "react-native";

interface DropdownItem {
    label: string;
    value: string;
}

interface VehicleTypeDropdownProps {
    value: string;
    onChange: (value: string) => void;
}

const VehicleTypeDropDown: React.FC<VehicleTypeDropdownProps> = ({ value, onChange }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const options: DropdownItem[] = [
        { label: "Car/SUV/Van/Jeep/Pickup", value: "1" },
        { label: "Bike", value: "2" },
        { label: "TukTuk", value: "3" },
        { label: "Large Vehicle", value: "4" },
    ];

    const selectedLabel =
        options.find((option) => option.value === value)?.label ||
        "Select vehicle type";

    const handleSelect = (item: DropdownItem) => {
        onChange(item.value);
        setIsModalVisible(false);
    };

    return (
        <View>
            {/* Dropdown Trigger */}
            <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setIsModalVisible(true)}
                activeOpacity={0.7}
            >
                <Text style={[styles.text, !value && styles.placeholderText]}>
                    {selectedLabel}
                </Text>
            </TouchableOpacity>

            {/* Modal for Dropdown Options */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#FFEFD4FF",
        width: "100%",
        
    },
    text: {
        fontSize: 16,
        color: "black",
    },
    placeholderText: {
        color: "gray",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 20,
    },
    option: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    optionText: {
        fontSize: 16,
        color: "black",
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "gray",
        borderRadius: 8,
        alignSelf: "center",
    },
    closeButtonText: {
        fontSize: 16,
        color: "#fff",
    },
});

export default VehicleTypeDropDown;
