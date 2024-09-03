import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Alert
} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../../constants/Colors';
import { useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import VehicleNameInput from "@/components/input/VehicleNameInput";
import VehicleTypeDropDown from "@/components/input/VehicleTypeDropDown";
import VehicleNumberInput from "@/components/input/VehicleNumberInput"; // Assuming this is a new component
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddVehicleScreen() {
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [vehicleNumber, setVehicleNumber] = useState(""); 
    const [vehicleName, setVehicleName] = useState("");     
    const [vehicleType, setVehicleType] = useState(""); 

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY

    const handleAddVehicle = async () => {
        setButtonSpinner(true);

        const token = await AsyncStorage.getItem("token");

        const data = {
            vehicle_number: vehicleNumber,
            name: vehicleName,
            type_id: vehicleType,
        };

        try {
            const response = await fetch(`${EXPO_PUBLIC_API_KEY}/vehicle`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                   "token": token || ""  // Ensuring token is included correctly
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Vehicle registered successfully.');
                router.push("/(routes)/choose-vehicle");
            } else {
                Alert.alert('Error', result.message || 'Failed to register vehicle.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to connect to the server.');
        } finally {
            setButtonSpinner(false);
        }
    };

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1 }}
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
                        <View style={{ marginTop: 15 }}>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.feildIcon}
                                    source={require("@/assets/images/plate.png")}
                                />
                                <VehicleNumberInput value={vehicleNumber} onChangeText={setVehicleNumber} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.feildIcon}
                                    source={require("@/assets/images/vehicle_name.png")}
                                />
                                <VehicleNameInput value={vehicleName} onChangeText={setVehicleName} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Image
                                    style={styles.feildIcon}
                                    source={require("@/assets/images/car_side.png")}
                                />
                                <VehicleTypeDropDown value={vehicleType} onChange={setVehicleType} />
                            </View>
                            <View style={{ marginTop: 15, alignItems: "center" }}>
                                <TouchableOpacity
                                    style={{
                                        padding: 16,
                                        borderRadius: 8,
                                        marginHorizontal: 16,
                                        backgroundColor: colors.primary,
                                        marginTop: 15,
                                        width: wp("50%"),
                                    }}
                                    onPress={handleAddVehicle}
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
            </SafeAreaView>
        </LinearGradient>
    );
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
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 20,
        padding: 5,
        gap: 10
    },
    feildIcon: {
        width: wp("11%"),
        height: hp("5%"),
    },
    formContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        paddingVertical: 1,
        paddingHorizontal: 10,
    }
});
