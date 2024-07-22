import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Button,
    ActivityIndicator, ScrollView
} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../../constants/Colors'
import {AntDesign, Entypo, FontAwesome, Fontisto, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {useState} from "react";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import VehicleNameInput from "@/components/input/VehicleNameInput";
import VehicleTypeDropDown from "@/components/input/VehicleTypeDropDown";
import PlateTypeModal from "@/components/Modal/PlateTypeModal"

import PlateNoInput_type1 from '@/components/input/PlateNoInput_type1';
import PlateNoInput_type2 from "@/components/input/PlateNoInput_type2";
import PlateNoInput_type3 from "@/components/input/PlateNoInput_type3";
import PlateNoInput_type4 from "@/components/input/PlateNoInput_type4";
export default function AddVehicleScreen() {
    const [type, setType] = useState<number>(0);
    let input
    let modalButton
    if (type == 0) {
        input = <Text style={{color: colors.primary, fontSize: 15.5, fontWeight: "600", fontFamily: "Nunito_700Bold"}}>Please select license plate type</Text>
        modalButton =
            <>
                <View style={styles.inputContainer}>
                    <Image
                        style={styles.feildIcon}
                        source={require("@/assets/images/types_icon.png")}
                    />
                    <PlateTypeModal type={type} setType={setType} />
                </View>
            </>
    }
    else if (type == 1) {
        input = <PlateNoInput_type1/>
        modalButton = null
    }
    else if (type == 2) {
        input = <PlateNoInput_type2/>
        modalButton = null
    }
    else if (type == 3) {
        input = <PlateNoInput_type3/>
        modalButton = null
    }
    else if (type == 4) {
        input = <PlateNoInput_type4/>
        modalButton = null
    }
    const [buttonSpinner, setButtonSpinner] = useState(false);
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
            colors={[colors.secondary_light, colors.primary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <ScrollView>
                    <Image
                        style={styles.signInImage}
                        source={require("@/assets/images/add_vehicle.png")}
                    />
                    <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
                        ParkEase your vehicle
                    </Text>
                    <Text style={styles.learningText}>
                        Register your vehicle with ParkEase
                    </Text>
                    <View style={styles.formContainer}>
                        <View style={{marginTop:15}}>
                                {modalButton}
                                <View style={styles.inputContainer}>
                                    <Image
                                        style={styles.feildIcon}
                                        source={require("@/assets/images/plate.png")}
                                    />
                                    {input}
                                </View>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.feildIcon}
                                    source={require("@/assets/images/vehicle_name.png")}
                                />
                                <VehicleNameInput/>
                            </View>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.feildIcon}
                                    source={require("@/assets/images/car_side.png")}
                                />
                                <VehicleTypeDropDown/>
                            </View>
                            <View style={{marginTop:15, alignItems:"center"}}>
                                <TouchableOpacity
                                    style={{
                                        padding: 16,
                                        borderRadius: 8,
                                        marginHorizontal: 16,
                                        backgroundColor: colors.primary,
                                        marginTop: 15,
                                        width: wp("50%"),
                                    }}
                                    // onPress={handleSignUp}
                                    onPress={() => router.push("/(routes)/choose-vehicle")}
                                >
                                    {buttonSpinner ? (
                                        <ActivityIndicator size="small" color={"white"} />
                                    ) : (
                                        <Text
                                            style={{
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: 16,
                                                fontFamily: "Raleway_700Bold",
                                            }}
                                        >
                                            Add
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    signInImage: {
        width: "80%",
        height: 300,
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 24,
    },
    learningText: {
        textAlign: "center",
        color: "#575757",
        fontSize: 15,
        marginTop: 5,
    },
    input: {
        height: 55,
        marginHorizontal: 25,
        borderRadius: 10,
        paddingLeft: 35,
        fontSize: 16,
        backgroundColor: "white",
        color: "#A1A1A1",
    },
    visibleIcon: {
        position: "absolute",
        right: 30,
        top: 15,
    },
    icon2: {
        position: "absolute",
        left: 23,
        top: 17.8,
        marginTop: -2,
    },
    forgotSection: {
        marginHorizontal: 16,
        textAlign: "right",
        fontSize: 16,
        marginTop: 10,
    },
    signupRedirect: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        position: "absolute",
        top: 60,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
    formContainer: {
      flex: 1,
        display: "flex",
        flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
        // borderStyle: "solid",
        // borderWidth: 0.5,
        width: wp("90%"),
        paddingVertical: 1,
        paddingHorizontal: 10,

    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        // borderStyle: "solid",
        // borderWidth: 0.5,
        marginBottom: 20,
        padding: 5,
        gap: 10
    },
    feildIcon: {
        width: wp("11%"),
        height: hp("5%"),
    },
});