import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import React from "react";

export default function profileScreen() {
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
            colors={[colors.primary_light, colors.primary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.header}>
                    <View style={styles.name}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 30}}>Chethiya Wanigarathne</Text>
                        <View style={styles.rating}>
                            <Image
                                style={styles.starIcon}
                                source={require("@/assets/images/star.png")}
                            />
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>4.77</Text>
                        </View>
                    </View>
                    <View style={styles.profilePicImageContainer}>
                        <Image
                            style={styles.profilePicImage}
                            source={require("@/assets/images/profilePic.jpg")}
                        />
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
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Vehicles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(routes)/payment/paymentMethods")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/paymentIcon.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(routes)/activities")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/activity.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Activity</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity style={styles.main}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_700Bold",fontSize: 15}}>Top-up your Park-Points</Text>
                            <Text style={{fontFamily: "Nunito_400Regular", fontSize: 12}}>On the other hand, we denounce with righteous</Text>
                        </View>
                        <View style={styles.right}>
                            <Image
                                source={require("@/assets/images/parkPoints.png")}
                                style={{width: 35, height: 35}}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.main}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_700Bold",fontSize: 15}}>Try ParkEase Pro</Text>
                            <Text style={{fontFamily: "Nunito_400Regular", fontSize: 12}}>Unlock huge discounts on parks</Text>
                        </View>
                        <View style={styles.right}>
                            <Image
                                source={require("@/assets/images/premium.png")}
                                style={{width: 35, height: 35}}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.main}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_700Bold",fontSize: 15}}>Safety checkup</Text>
                            <Text style={{fontFamily: "Nunito_400Regular", fontSize: 12}}>Boost your safety profile by turning on additional features</Text>
                        </View>
                        <View style={styles.right}>
                            <Image
                                source={require("@/assets/images/premium.png")}
                                style={{width: 35, height: 35}}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/settingsIcon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 15}}>Acuount Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/message.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 15}}>Messages</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/business.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 15}}>Lets talk business</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/logOutIcon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 15}}>Log Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/deleteIcon.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 15}}>Delete account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sub}>
                        <Image
                            source={require("@/assets/images/PandP.png")}
                            style={{width: 20, height: 20}}
                        />
                        <Text style={{fontFamily: "Nunito_700",fontSize: 15}}>Privacy and Policy</Text>
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
        maxWidth: "23%",
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
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 25,
    },
    quickAccess: {
        display: "flex",
        flexDirection: "row",
        gap: 35,
        marginBottom: 10
    },
    button: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        // borderStyle: "solid",
        // borderColor: "#2467EC",
        // borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        gap: 10,
        width: wp("25%"),
        backgroundColor: "#BCBDBF",
    },
    quickAccessIcon: {
        width: 35,
        height: 30,
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
        backgroundColor: "#BCBDBF",
        padding: 10,
        margin: 5,
        borderRadius: 7,
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
        padding: 10,
        // margin: 5,
        borderRadius: 7,
        gap: 20,
        marginLeft: 20,

    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
});