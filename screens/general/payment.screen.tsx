import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Switch, Modal} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import colors from '../../constants/Colors';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import React, {useState} from "react";
import PaymentMethodForm from "@/components/payment/PaymentMethodForm";

const paymentMethods = [
    { id: '1', name: 'PayPark Wallet', balance: 'LKR 1750.00', image: require('@/assets/images/wallet.png') },
    { id: '2', name: 'Cash', balance: '', image: require('@/assets/images/cash.png') },
    { id: '3', name: 'Park Points', balance: 'LKR 145.00', image: require('@/assets/images/ParkEase_logo.png') },
];

export default function PaymentScreen() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddPaymentMethod = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

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
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 25}}>Amount to Pay: LKR 1250.00</Text>
                </View>
                <View style={styles.sub_title}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Payment Methods</Text>
                </View>
                {paymentMethods.map(method => (
                    <View key={method.id} style={styles.option}>
                        <View style={styles.left}>
                            <Image
                                source={method.image}
                                style={{width: 40, height: 40}}
                            />
                        </View>
                        <View style={styles.mid}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>{method.name}</Text>
                            {method.balance ? (
                                <Text style={{fontFamily: "Nunito_700Bold", fontSize: 12}}>{method.balance}</Text>
                            ) : null}
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.option} onPress={handleAddPaymentMethod}>
                    <View style={styles.left}>
                        <Image source={require('@/assets/images/add.png')} style={{ width: 20, height: 20 }} />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 15 }}>Add voucher code</Text>
                    </View>
                </TouchableOpacity>
                <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
                    <PaymentMethodForm onClose={closeModal} />
                </Modal>
            </SafeAreaView>
        </LinearGradient>
    );
}

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    title: {
        width: wp("90%"),
        alignItems: "flex-start",
        justifyContent: "center",
    },
    sub_title: {
        width: wp("90%"),
        alignItems: "flex-start",
        justifyContent: "center",
        marginTop: 20,
    },
    option: {
        flexDirection: "row",
        width: wp("90%"),
        padding: 5,
        gap: 10,
        marginTop: 10,
    },
    left: {
        justifyContent: "center",
        alignItems: "center",
    },
    mid: {
        width: wp("40%"),
        justifyContent: "center",
        alignItems: "flex-start",
    },
});
