import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import QRCodeGenerator from '@/components/Qrcode/Qrcode'; // Adjust the path as necessary


export default function QRScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    // details for the Qr code
    const userID = "12345";
    const vehicleID = "67890";
    const driverVehicleID = "65234";
    const entryTime = new Date().toISOString();

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <QRCodeGenerator userID={userID} vehicleID={vehicleID} entryTime={entryTime} driverVehicleID={driverVehicleID}  />
                <View style={styles.buttonContainer}>
                    <Button title="Done"
                            color={"#000000"}
                            onPress={() => router.back()}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
});