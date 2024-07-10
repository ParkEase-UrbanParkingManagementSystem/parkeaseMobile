import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
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
                        source={require('@/assets/images/suv_side.png')}
                    />
                </View>
                <View style={styles.vehicleSelectorContainer}>
                    <ScrollView style={styles.vehicleSelector}>
                        {/*these are the registered vehicles of this user inside ParkEase*/}
                        {/*should be loaded from the db*/}
                        <View style={styles.vehicleContainer}>
                            <View style={styles.vehicleIconContainer}>
                                <Image
                                    style={styles.vehicleIcon}
                                    source={require('@/assets/images/bus_side.png')}
                                />
                            </View>
                            <View style={styles.vehicleDetailsContainer}>
                                <Text style={styles.vehicleRegNo}>NB - 1234</Text>
                                <Text style={styles.vehicleName_2}>Mitsubishi Fuso Rosa</Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={{color: colors.white}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.vehicleContainer}>
                            <View style={styles.vehicleIconContainer}>
                                <Image
                                    style={styles.vehicleIcon}
                                    source={require('@/assets/images/car_side.png')}
                                />
                            </View>
                            <View style={styles.vehicleDetailsContainer}>
                                <Text style={styles.vehicleRegNo}>CBF - 4545</Text>
                                <Text style={styles.vehicleName_2}>Mercedes-AMG GTC</Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={{color: colors.white}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.vehicleContainer}>
                            <View style={styles.vehicleIconContainer}>
                                <Image
                                    style={styles.vehicleIcon}
                                    source={require('@/assets/images/jeep_side.png')}
                                />
                            </View>
                            <View style={styles.vehicleDetailsContainer}>
                                <Text style={styles.vehicleRegNo}>CBR - 6789</Text>
                                <Text style={styles.vehicleName_2}>Jeep Wrangler Rubicon</Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={{color: colors.white}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.vehicleContainer}>
                            <View style={styles.vehicleIconContainer}>
                                <Image
                                    style={styles.vehicleIcon}
                                    source={require('@/assets/images/lorry_side.png')}
                                />
                            </View>
                            <View style={styles.vehicleDetailsContainer}>
                                <Text style={styles.vehicleRegNo}>PH - 1628</Text>
                                <Text style={styles.vehicleName_2}>Mitsubishi Fuso</Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={{color: colors.white}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.vehicleContainer}>
                            <View style={styles.vehicleIconContainer}>
                                <Image
                                    style={styles.vehicleIcon}
                                    source={require('@/assets/images/tuktuk_side.png')}
                                />
                            </View>
                            <View style={styles.vehicleDetailsContainer}>
                                <Text style={styles.vehicleRegNo}>ABB - 8256</Text>
                                <Text style={styles.vehicleName_2}>TVS King</Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={{color: colors.white}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.vehicleContainer}>
                            <View style={styles.vehicleIconContainer}>
                                <Image
                                    style={styles.vehicleIcon}
                                    source={require('@/assets/images/van_side.png')}
                                />
                            </View>
                            <View style={styles.vehicleDetailsContainer}>
                                <Text style={styles.vehicleRegNo}>NB - 7245</Text>
                                <Text style={styles.vehicleName_2}>Toyota Hiace</Text>
                            </View>
                            <TouchableOpacity style={styles.selectButton}>
                                <Text style={{color: colors.white}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.actionButtonContainer}>
                    <TouchableOpacity
                        style={styles.addVehicleButtonContainer}
                        onPress={() => router.push("/(routes)/change-vehicle")}
                    >
                        <Text style={styles.addVehicleText}>
                            Add Vehicle
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
                </View>
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
    actionButtonContainer: {
        position: "absolute",
        bottom: 80,
        flexDirection: "row",
        gap: 50,
    },
    addVehicleButtonContainer: {
        // position: "absolute",
        // bottom: 200,
        borderRadius: hp("1%"),
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: colors.secondary
    },
    addVehicleText: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: "600"
    },
    continueButtonContainer: {
        // position: "absolute",
        // bottom: 100,
        borderRadius: hp("1%"),
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: colors.secondary
    },
    continueText: {
        color: colors.primary,
        fontSize: 25,
        fontWeight: "600"
    },
    vehicleSelectorContainer: {
        position: "absolute",
        top: 440,
        width: wp("95%"),
        height: hp("36%"),
        backgroundColor: colors.secondary_light,
        padding: 10,
        borderRadius: hp("2%"),
    },
    vehicleSelector: {
        display: "flex",
        flexDirection: "column",
    },
    vehicleContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 5,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.primary_light,
        borderRadius: hp("2%"),
        marginBottom: 10
    },
    vehicleIconContainer: {
        width: '25%',
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    vehicleIcon: {
        width: 90,
        height: 90
    },
    vehicleDetailsContainer: {
        width: '50%',
        height: '100%',
        padding: 5,
        paddingLeft: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'flex-start',

    },
    vehicleRegNo:{
        fontSize: 25,
        fontWeight: "bold",
    },
    vehicleName_2: {
        fontSize: 16,
        fontWeight: "normal",
        color: colors.primary
    },
    selectButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
    },

});