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
            colors={[colors.secondary_light, colors.white]}
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
                <View style={styles.vehicleImageContainer}>
                    <Image
                        style={styles.vehicleImage}
                        source={require('@/assets/images/jeep.png')}
                    />
                </View>
                <TouchableOpacity
                    style={styles.addVehicleButtonContainer}
                    onPress={() => router.push("/(routes)/change-vehicle")}
                >
                    <Text style={styles.addVehicleText}>
                        continue
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.continueButtonContainer}
                    onPress={() => router.push("/(routes)/change-vehicle")}
                >
                    <Text style={styles.continueText}>
                        continue
                    </Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Button title="Go Back"
                            color={colors.primary_light}
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
        width: wp("45%"),
        height: hp("20%"),
    },
    addVehicleButtonContainer: {

    },
    addVehicleText: {

    },
    continueButtonContainer: {
        position: "absolute",
        bottom: 100,
        // borderStyle: "none",
        // borderWidth: 1,
        borderRadius: hp("1%"),
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.secondary
    },
    continueText: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: "500"



    },

});