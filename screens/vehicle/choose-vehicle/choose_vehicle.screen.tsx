import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../../constants/Colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
// import {Simulate} from "react-dom/test-utils";
// import abort = Simulate.abort;

export default function ChooseVehicleScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <LinearGradient
            colors={[colors.primary, colors.white]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.title}>
                    <Text>
                        choose your vehicle
                    </Text>
                </View>
                <View style={styles.PlateNoContainer}>
                    <Text style={styles.plateNo}>
                        CAQ - 1628
                    </Text>
                </View>
                <View style={styles.vehicleNameContainer}>
                    <Text style={styles.vehicleName}>
                        Nissan Patrol Y61
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.changeVehicle}
                    onPress={() => router.push("/(routes)/change-vehicle")}
                >
                    <Text>Change Vehicle</Text>
                </TouchableOpacity>
                <View style={styles.vehicleImageContainer}>
                    <Image
                        style={styles.vehicleImage}
                        source={require('@/assets/images/car.png')}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Go Back"
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
    title: {
        position: "absolute",
        top: 60,
    },
    PlateNoContainer: {
        position: "absolute",
        top: 100,
    },
    plateNo: {
        color: colors.black,
        fontSize: 40,
        fontWeight: "800"
    },
    vehicleNameContainer: {
        position: "absolute",
        top: 190,
    },
    vehicleName: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: "500"
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
    },
    vehicleImageContainer: {
        position: "absolute",
        top: 250,
    },
    vehicleImage: {
        width: wp("100%"),
        height: hp("25%"),
    },
    changeVehicle: {

    },

});