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
    
}

// const generateQRCodeValue = (userID: string, vehicleID: string): string => {
//     const data = {
//         userID: userID,
//         vehicleID: vehicleID
//     };
//     return JSON.stringify(data);
// };

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ userID, vehicleID }) => {
    // const qrValue = generateQRCodeValue(userID, vehicleID);

    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <QRCode
                value={`Vehicle: ${vehicleID}, User: ${userID}`}
                size={250}

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
