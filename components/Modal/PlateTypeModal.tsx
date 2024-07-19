import React, { useState } from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity, Button} from 'react-native';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import { router } from "expo-router";
import colors from "@/constants/Colors";
import {Raleway_700Bold, useFonts} from "@expo-google-fonts/raleway";
import {Nunito_400Regular, Nunito_700Bold} from "@expo-google-fonts/nunito";

interface PlateTypeModalProps {
    type: number;
    setType: (type: number) => void;
}

const PlateTypeModal: React.FC<PlateTypeModalProps> = ({ type, setType }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <>
            {/*modal activation button*/}
            <TouchableOpacity
                style={styles.addVehicleButtonContainer}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addVehicleText}>
                    Choose licence plate type
                </Text>
            </TouchableOpacity>
            {/*plate type selection Modal*/}
            <Modal
                visible = {isModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.selectPlateTypeModal}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 25, marginTop: 50}}>Select the type of License Plate</Text>
                    {/*CAQ-1628 type selection*/}
                    <TouchableOpacity
                        style={styles.plateType}
                        onPress={() => {
                            setIsModalVisible(false);
                            setType(1);
                        }}
                    >
                        <Text style={styles.plateTypeText}>
                            ABC-1234
                        </Text>
                    </TouchableOpacity>
                    {/*310-2345 type selection*/}
                    <TouchableOpacity
                        style={styles.plateType}
                        onPress={() => {
                            setIsModalVisible(false);
                            setType(2);
                        }}
                    >
                        <Text style={styles.plateTypeText}>
                            123-4567
                        </Text>
                    </TouchableOpacity>
                    {/*1-shri-1 type selection*/}
                    <TouchableOpacity
                        style={styles.plateType}
                        onPress={() => {
                            setIsModalVisible(false);
                            setType(3);
                        }}
                    >
                        <Text style={styles.plateTypeText}>
                            1-ශ්‍රී-5000
                        </Text>
                    </TouchableOpacity>
                    {/*`EN 3177` type selection*/}
                    <TouchableOpacity
                        style={styles.plateType}
                        onPress={() => {
                            setIsModalVisible(false);
                            setType(4);
                        }}
                    >
                        <Text style={styles.plateTypeText}>
                            EN 3177
                        </Text>
                    </TouchableOpacity>
                    <Text style={{fontFamily: "Nunito_400Regular", fontSize: 15,textAlign: "center", marginTop: 20}}>
                        Please select the example which matches the license plate type of your vehicle
                    </Text>
                    <View>
                        <Button
                            title="Cancel"
                            onPress={() => setIsModalVisible(false)}
                        />
                    </View>
                </View>
            </Modal></>
    );
};

const styles = StyleSheet.create({
    addVehicleButtonContainer: {
        borderStyle: "solid",
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: hp("1%"),
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    addVehicleText: {
        color: colors.primary,
        fontSize: 15.5,
        fontWeight: "600",
        fontFamily: "Nunito_700Bold",
    },
    selectPlateTypeModal: {
        flex: 1,
        backgroundColor: colors.primary_light,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    plateType: {
        backgroundColor: colors.primary,
        padding: 20,
        width: wp("40%"),
        alignItems: "center",
        borderRadius: 15
    },
    plateTypeText: {
        color: colors.secondary_light,
        fontSize: 25,
        fontWeight: "600",
        fontFamily: "Nunito_700Bold",
    },
});

export default PlateTypeModal;
