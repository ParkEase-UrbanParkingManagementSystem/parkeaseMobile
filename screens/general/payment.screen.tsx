import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import React from "react";

export default function PaymentScreen() {
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
            colors={[colors.white, colors.white]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.title}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 25}}>Payment options</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        // onPress={() => router.push("/(routes)/payment/paymentMethods")}
                        style={[styles.mode, {backgroundColor: colors.primary_light}]}
                    >
                        <Image
                            source={require('@/assets/images/personal.png')}
                            style={{width: 15, height: 15}}
                        />
                        <Text>Personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => router.push("/(routes)/payment/paymentMethods")}
                        style={[styles.mode, {backgroundColor: colors.secondary_light2}]}
                    >
                        <Image
                            source={require('@/assets/images/business_bag.png')}
                            style={{width: 15, height: 15}}
                        />
                        <Text>Business</Text>
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
        justifyContent: "flex-start",
        // position: "relative",
    },
    title:{
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("90%"),
        alignItems: "flex-start",
        justifyContent: "center",
    },
    buttonContainer: {
        // borderStyle: "solid",
        // borderWidth: 1,

        display: "flex",
        width: wp("90%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        marginTop: 5,

    },
    mode: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderRadius: 15,
        gap: 5,
    },
});