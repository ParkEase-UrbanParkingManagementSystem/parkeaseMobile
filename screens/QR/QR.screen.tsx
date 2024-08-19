import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import QRCodeGenerator from '@/components/Qrcode/Qrcode'; // Adjust the path as necessary




interface QRScreenProps {
    userID : string;
    vehicleID: string;
}

const QRScreen: React.FC<QRScreenProps> = ({ userID, vehicleID }) => {

    console.log("Palaweni Wade hari",userID, vehicleID)
    
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    if (!fontsLoaded) {
        return null; // or a loading spinner/placeholder
    }

    // details for the QR code
 
    

    // const router = useRouter(); // Ensure this is correct for your routing setup

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <QRCodeGenerator
                    userID={userID}
                    vehicleID={vehicleID}
                    // style={styles.qrCode}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.parkedButton} onPress={() => router.back()}>
                        <Text style={styles.buttonText}>Parked</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.billButton} onPress={() => router.push("/(routes)/payment/bill")}>
                        <Text style={styles.buttonText}>View Bill</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 30,
        position: "absolute",
        bottom: 30,
    },
    parkedButton: {
        backgroundColor: "#000000",
        padding: 10,
        borderRadius: 5,
    },
    billButton: {
        backgroundColor: "#000000",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    qrCode: {
        width: 1,  // Adjust the size as needed
        height: 1, // Adjust the size as needed
    },
});


export default QRScreen;