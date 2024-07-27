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
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.bill}>
                    <View style={styles.header}>
                        <Image
                            source={require('@/assets/images/checked.png')}
                            style={{width: 60, height: 60}}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Parking Completed</Text>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20, color: colors.success}}>140 LKR</Text>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Nugegoda Super Market</Text>
                        <View style={styles.dashedLine} />
                    </View>
                    <View style={styles.vehicle}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Nissan Patrol Y61</Text>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>CAQ-1628</Text>
                    </View>
                    <View style={styles.duration}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Parking Date</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 21 July 2024</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>In Time</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 18:20</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Out Time</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 21:30</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Duration</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 2 hours 31 minutes</Text>
                            </View>
                        </View>
                        <View style={styles.dashedLine} />
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden ID</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 359974</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden Name</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: Saman Kumara</Text>
                            </View>
                        </View>
                        <View style={styles.dashedLine} />
                    </View>
                    <View style={styles.charge}>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Base Rate</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: LKR 70 (first hour)</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Additional fees</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: LKR 70</Text>
                                <TouchableOpacity
                                    // onPress={() => router.push("/(routes)/info")}
                                >
                                    <Image
                                        source={require('@/assets/images/info.png')}
                                        style={{width: 15, height: 15}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Total</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>: LKR 140</Text>
                            </View>
                        </View>
                    </View>
                </View>
                    <View style={styles.currentPaymentMethod}>
                        <Image
                            source={require('@/assets/images/visa.png')}
                            style={{width: 25, height: 25}}
                        />
                        <Text>Debit Card ••••1022</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/(routes)/payment/paymentMethods")}
                            style={{marginLeft: 20}}
                        >
                            <Image
                                source={require('@/assets/images/next.png')}
                                style={{width: 15, height: 15}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.actionButtonContainer}>
                        <TouchableOpacity
                            // onPress={() => router.back()}
                            style={{backgroundColor: colors.error, padding:5, borderRadius: 5}}
                        >
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14}}>Report Issue</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            // onPress={() => router.push("/(routes)/QR")}
                            style={{backgroundColor: colors.primary, padding:5, borderRadius: 5}}
                        >
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14, color: colors.secondary_light}}>Pay and Leave</Text>
                        </TouchableOpacity>
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
    },
    bill: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("90%"),
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        padding: 10,
        marginTop: hp("8%"),

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity:  0.19,
        shadowRadius: 5.62,
        elevation: 6
    },
    header:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    dashedLine: {
        width: '100%', // Adjust width as needed
        height: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderRadius: 1, // Optional: to prevent rounding corners on the dashes
        marginVertical: 10,
    },
    vehicle: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
    },
    duration: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        // borderStyle: "solid",
        // borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("30%"),
        alignItems: "flex-start",
        marginLeft: wp("16%"),
    },
    right: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("50%"),
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 50,

    },
    charge: {
        display: "flex",
        flexDirection: "column",
    },
    bottomContainer: {

    },
    currentPaymentMethod: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#FFFFFF",
        margin: 10,
        padding: 10,
        borderRadius: 15,

    },
    actionButtonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 25,
        marginTop: 10,
        width: wp("90%"),
        paddingHorizontal: 10,
    },

});