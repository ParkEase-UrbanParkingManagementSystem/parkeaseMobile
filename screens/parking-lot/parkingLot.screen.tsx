import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import React from "react";

export default function parkingLotScreen() {
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
            colors={[colors.secondary_light, colors.primary_light ]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.topContainer}>
                    {/*<View style={styles.ScrollViewConatiner}>*/}
                        <ScrollView horizontal style={styles.imageScrollView}>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.parkingLotImage}
                                    source={require("@/assets/ParkingLots/nugegodaSM_1.jpg")}
                                />
                            </View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.parkingLotImage}
                                    source={require("@/assets/ParkingLots/nugegodaSM_2.jpg")}
                                />
                            </View>
                        </ScrollView>
                    {/*</View>*/}
                    <View style={styles.name}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 25}}>Nugegoda Super Market</Text>
                    </View>
                    <View style={styles.des}>
                        <Text style={{fontFamily: "Nunito_400Regular", fontSize: 14, textAlign: "center"}}>
                            A large urban vehicle park managed by Nugegoda Super Market
                        </Text>
                    </View>
                </View>
                <View style={styles.MidContainer}>
                    <View style={styles.capacities}>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/bicycle_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/bike_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/bus_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                    </View>
                    <View style={styles.capacities}>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/car_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/lorry_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/tuktuk_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                    </View>
                    <View style={styles.reviews}>
                        <ScrollView style={styles.reviewsScrollView}>
                            <View style={styles.review}>
                                {/*<Text></Text> name and data*/}
                                {/*<Text></Text> review*/}
                                {/*<View></View> stars*/}
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.BottomContainer}>
                    {/*<Button*/}
                    {/*    title="Back to Home"*/}
                    {/*    onPress={() => router.back()}*/}
                    {/*/>*/}
                    {/*<Button*/}
                    {/*    title="Navigate"*/}
                    {/*    // onPress={() => router.back()}*/}
                    {/*/>*/}
                </View>
                {/*<View style={styles.buttonContainer}>*/}
                {/*    <Button title="Go Back"*/}
                {/*            color={"#000000"}*/}
                {/*            onPress={() => router.back()}*/}
                {/*    />*/}
                {/*</View>*/}
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
    topContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: wp("100%"),
        height: wp("100%"),
        position: "absolute",
        top: 55,
    },
    imageScrollView: {
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.primary,
        margin: 5,
        borderRadius: 10,
    },
    imageContainer: {

    },
    parkingLotImage: {
        // width: "100%",
        width: wp("100%"),
        height: wp("100%"),
    },
    name: {

    },
    des: {
    },
    MidContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",

        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.primary,

        marginTop: 150,
        gap: 0
    },
    capacities: {
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.primary,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: wp("100%"),
    },
    cap: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("1%"),

        borderRightWidth: 1,
        borderRightColor: "black",

    },
    vehicleIcon: {
        width: 45,
        height: 45
    },
    reviews: {

    },
    reviewsScrollView: {

    },
    review: {

    },
    BottomContainer: {

    },
});