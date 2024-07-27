import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Switch} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import React, {useState} from "react";
import PaymentOptions from '@/components/payment/PaymentOptions'

// type PaymentMethod = {
//     id: string;s
//     name: string;
//     number: string;
//     image: any;
// };
//
// const paymentMethods: PaymentMethod[] = [
//     { id: '1', name: 'Credit Card', number: '••••1022', image: require('@/assets/images/visa.png') },
//     { id: '2', name: 'Debit Card', number: '••••4725', image: require('@/assets/images/amex.png') },
//     { id: '3', name: 'PayPark', number: 'LKR 1750.00', image: require('@/assets/images/wallet.png') },
//     { id: '4', name: 'Cash', number: "", image: require('@/assets/images/cash.png') },
// ];


export default function WalletScreen() {
    // const [isEnabled, setIsEnabled] = useState(false);
    // const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    //
    // const selectMethod = (id: string) => {
    //     setSelectedMethod(id);
    // };
    // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 25}}>Wallet</Text>
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
                <View style={styles.sub_title}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Park Points</Text>
                </View>
                <View style={styles.option}>
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/ParkEase_logo.png')}
                            style={{width: 40, height: 40}}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Park Points</Text>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 12}}>LKR 145.00</Text>
                    </View>
                    <View style={styles.right}>
                        {/*<Text>{isEnabled ? "Enabled" : "Disabled"}</Text>*/}
                        {/*<Switch*/}
                        {/*    trackColor={{ false: colors.primary, true: colors.secondary }}*/}
                        {/*    thumbColor={isEnabled ? colors.primary : "#f4f3f4"}*/}
                        {/*    ios_backgroundColor="#3e3e3e"*/}
                        {/*    onValueChange={toggleSwitch}*/}
                        {/*    value={isEnabled}*/}
                        {/*/>*/}
                    </View>
                </View>
                <View style={styles.sub_title}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Payment Methods</Text>
                </View>
                <View style={styles.paymentMethodsContainer}>
                    <PaymentOptions/>
                </View>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/add.png')}
                            style={{width: 20, height: 20}}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Add payment method</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sub_title}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Vouchers</Text>
                </View>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/add.png')}
                            style={{width: 20, height: 20}}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Add voucher code</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sub_title}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Promotions</Text>
                </View>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/promotion.png')}
                            style={{width: 20, height: 20}}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Promotions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/add.png')}
                            style={{width: 20, height: 20}}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Add promo code</Text>
                    </View>
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
    sub_title: {
        width: wp("90%"),
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: 20,
    },
    option: {
        // borderStyle: "solid",
        // borderWidth: 1,
        flexDirection: "row",
        width: wp("90%"),
        padding: 5,
        gap: 10,
        marginTop: 10,
    },
    left: {
        // borderStyle: "solid",
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    mid: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("40%"),
        justifyContent: "center",
        alignItems: "flex-start",
    },
    right: {
        // borderStyle: "solid",
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        position: "relative",

    },
    paymentMethodsContainer: {
        // borderStyle: "solid",
        // borderWidth: 1,
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
});