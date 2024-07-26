import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import {Raleway_700Bold, useFonts} from "@expo-google-fonts/raleway";
import colors from "@/constants/Colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

interface QRCodeGeneratorProps {
    userID: string;
    vehicleID: string;
    entryTime: string;
    driverVehicleID: string;
}

const generateQRCodeValue = (userID: string, vehicleID: string, entryTime: string, driverVehicleID: string): string => {
    const data = {
        userID: userID,
        vehicleID: vehicleID,
        entryTime: entryTime,
        driverVehicleID: driverVehicleID
    };
    return JSON.stringify(data);
};

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ userID, vehicleID, entryTime, driverVehicleID }) => {
    const qrValue = generateQRCodeValue(userID, vehicleID, entryTime, driverVehicleID);

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.container}>
            <QRCode
                value={qrValue}
                size={wp("90%")}
                backgroundColor = {colors.secondary_light}
            />
            <Text
                style={styles.title}
            >
                Let Parking Warden scan this QR code
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary_light,
    },
    title: {
        fontFamily: "Nunito_400Regular",
        fontSize: 20,
        marginTop: 20,
        textAlign: "center",
    },
});

export default QRCodeGenerator;
