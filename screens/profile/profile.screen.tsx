import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import React, {useEffect, useState, useContext} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VehicleContext } from '@/utils/vehicleContext';

import {EXPO_PUBLIC_API_KEY} from '../../config'
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";



export default function ProfileScreen() {

    const { selectedVehicle, setSelectedVehicle } = useContext(VehicleContext);
    const [fontsLoaded] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    const [userDetails, setUserDetails] = useState<any>(null);

    const handleLogout = async () => {
        
        setSelectedVehicle(null);
        await AsyncStorage.removeItem("token");
        router.push("/(routes)/login");
    }

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = await AsyncStorage.getItem("token");
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/driver/details`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token || ""
                    }
                });

                const parseRes = await response.json();

                if (response.ok) {
                    setUserDetails(parseRes.data);
                    
                } else {
                    console.error("Can't get the details");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        };
        
        fetchUserDetails();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    console.log("fetching user details", userDetails);

    return (
        <LinearGradient
            colors={[colors.secondary_light2, colors.primary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.header}>
                    <View style={styles.name}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 26}}>{userDetails?.fname} {userDetails?.lname}</Text>
                        <Text style={{fontFamily: "Nunito_700", fontSize: 14}}>{userDetails?.email}</Text>
                        
                    </View>
                    <View style={styles.profilePicImageContainer}>
                                <ProfileIcon userName={userDetails?.fname} />
                    </View>
                </View>
                <View style={styles.quickAccess}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(routes)/choose-vehicle")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/pickup_side.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 16}}>Vehicles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("(routes)/wallet")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/paypark.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 16}}>PayPark Wallet</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(routes)/recents")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/activity.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Activity</Text>
                    </TouchableOpacity> */}
                </View>
                    <TouchableOpacity style={styles.main} onPress={() => router.push("(routes)/parkpoints")}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_700Bold",fontSize: 16}}>Park-Points</Text>
                            <Text style={{fontFamily: "Nunito_400Regular", fontSize: 14}}>Earn ParkPoints as you pay for parking</Text>
                        </View>
                        <View style={styles.right}>
                            <Image
                                source={require("@/assets/images/parkpoints.png")}
                                style={{width: 45, height: 45}}
                            />
                        </View>
                    </TouchableOpacity>
                   
                <ScrollView style={styles.scrollView}>
                   

                    <TouchableOpacity style={styles.sub} onPress={() => router.push("(routes)/user-details")}>
                        <Image
                            source={require("@/assets/images/ParkingLocation.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}}>Usage Insights</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/settingsIcon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}} onPress={() => router.push("/(routes)/recents")}>Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/noticon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}} onPress={() => router.push("(routes)/notifications")}>Notifications</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/business.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}}>Lets talk business</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/deleteIcon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}}>Delete account</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.sub}
                        onPress={() => router.push("/(routes)/info")}
                    >
                        <Image
                            source={require("@/assets/images/PandP.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}}>Privacy and Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub} onPress={handleLogout}>
                        <Image
                            source={require("@/assets/images/logOutIcon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 18}}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{backgroundColor: colors.secondary, padding:5, borderRadius: 5}}
                >
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14}}>Back to Home</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </LinearGradient>
    )
}

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    header: {
        // borderStyle: "solid",
        // borderColor: "#2467EC",
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        width: wp("100%"),
    },
    name: {
        flexDirection: "column",
    },
    rating: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        borderStyle: "solid",
        borderColor: "#2467EC",
        borderWidth: 1,
        width: wp("20%"),
        padding: 8,
        backgroundColor: colors.secondary,
        borderRadius: 10
    },
    starIcon: {
        width: 20,
        height: 20,
    },
    profilePicImageContainer: {
    },
    profilePicImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    quickAccess: {
        display: "flex",
        flexDirection: "row",
        gap: 20,
        marginBottom: 10
    },
    button: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 10,
        width: wp("44%"),
        backgroundColor: colors.primary_light,
        
        // Shadow for iOS
        shadowColor: "#000", // Color of the shadow
        shadowOffset: { width: 0, height: 4 }, // Shadow position
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 6, // Blur radius of the shadow
    
        // Shadow for Android
        elevation: 8, // Elevation for Android shadow effect
    },
    
    quickAccessIcon: {
        width: 45,
        height: 35,
    },
    scrollView: {
        // borderStyle: "solid",
        // borderColor: "#2467EC",
        // borderWidth: 1,

        // flex: 1,
        width: wp("99%"),

    },
    main: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.primary_light,
        paddingHorizontal: 30,
        paddingVertical: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        borderRadius: 7,
        width: 365,
    
        // Shadow for iOS
        shadowColor: "#000", // Color of the shadow
        shadowOffset: { width: 0, height: 4 }, // Shadow position
        shadowOpacity: 0.3, // Opacity of the shadow
        shadowRadius: 6, // Blur radius of the shadow
    
        // Shadow for Android
        elevation: 8, // Elevation for Android shadow effect
    },
    
    left: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    right: {

    },
    sub: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        // backgroundColor: "#BCBDBF",
        padding: 12,
        // margin: 5,
        borderRadius: 7,
        gap: 20,
        marginLeft: 20,
        marginTop:20,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        width: wp("90%"),

    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
});