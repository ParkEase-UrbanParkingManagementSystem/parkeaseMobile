import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ChooseVehicleScreen() {
    let [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    interface Vehicle {
        type_id: number;
        name: string;
        vehicle_number: string;
    }

    interface VehicleImageProps {
        vehicleType: number;
    }

    const VehicleImage: React.FC<VehicleImageProps> = ({ vehicleType }) => {
        const getImageSource = (vehicleType: number) => {
            switch (vehicleType) {
                case 1:
                    return require('@/assets/images/car_side.png');
                case 2:
                    return require('@/assets/images/bike_side.png');
                case 3:
                    return require('@/assets/images/tuktuk_side.png'); // Fallback image
            }
        };

        return <Image style={styles.vehicleIcon} source={getImageSource(vehicleType)} />;
    };

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            const token = await AsyncStorage.getItem("token");
            console.log("Token:", token);  // Debugging token

            try {
                const response = await fetch(`http://192.168.106.147:5000/vehicle`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token || ""  // Ensuring token is included correctly
                    }
                });

                console.log("Response status:", response.status);  // Debugging response status
                const parseRes = await response.json();
                console.log("Parsed response:", parseRes);  // Debugging parsed response

                if (response.ok) {
                    setVehicles(parseRes.data);
                    console.log("Vehicle details set in state:", parseRes.data);  // Confirm state update
                } else {
                    console.error("Error fetching details:", parseRes.message);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log("Fetch error:", error.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        };

        fetchVehicleDetails();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.firstContainer}>
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

                <Text style={styles.listTopic}>
                        Vehicle List
                    </Text>
                <View style={styles.vehicleSelectorContainer}>
                    
                    <ScrollView style={styles.vehicleSelector}>
                        {vehicles && vehicles.map((vehicle, index) => (
                            <View key={index} style={styles.vehicleContainer}>
                                <View style={styles.vehicleIconContainer}>
                                    <VehicleImage vehicleType={vehicle.type_id} />
                                </View>
                                <View style={styles.vehicleDetailsContainer}>
                                    <Text style={styles.vehicleRegNo}>{vehicle.name}</Text>
                                    <Text style={styles.vehicleName_2}>{vehicle.vehicle_number}</Text>
                                </View>
                                <TouchableOpacity style={styles.selectButton}>
                                    <Text style={{ color: colors.white }}>Select</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.actionButtonContainer}>
                    <TouchableOpacity
                        style={styles.addVehicleButtonContainer}
                        onPress={() => router.push("/(routes)/add-vehicle")}
                    >
                        <Text style={styles.addVehicleText}>
                            Add Vehicle
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.continueButtonContainer}
                        onPress={() => router.push("/(routes)/home-page")}
                    >
                        <Text style={styles.continueText}>
                            Continue
                        </Text>
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
        backgroundColor: colors.primary_light,
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
        backgroundColor: colors.secondary_light,
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
    listTopic: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    }
    ,
    vehicleRegNo: {
        fontSize: 22,
        fontWeight: "bold",
    },
    vehicleName_2: {
        fontSize: 18,
        fontWeight: "normal",
        color: colors.primary
    },
    selectButton: {
        backgroundColor: colors.primary,
        padding: 10,
        borderRadius: 8,
    },
});
