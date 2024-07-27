import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Modal } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import PaymentOptions from '@/components/payment/PaymentOptions';
import PaymentMethodForm from '@/components/payment/PaymentMethodForm';

export default function WalletScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const selectMethod = (id: string) => {
        setSelectedMethod(id);
    };

    const handleAddPaymentMethod = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <LinearGradient
            colors={[colors.white, colors.white]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.title}>
                    <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 25 }}>Wallet</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.mode, { backgroundColor: colors.primary_light }]}
                    >
                        <Image
                            source={require('@/assets/images/personal.png')}
                            style={{ width: 15, height: 15 }}
                        />
                        <Text>Personal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.mode, { backgroundColor: colors.secondary_light2 }]}
                    >
                        <Image
                            source={require('@/assets/images/business_bag.png')}
                            style={{ width: 15, height: 15 }}
                        />
                        <Text>Business</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sub_title}>
                    <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 20 }}>Park Points</Text>
                </View>
                <View style={styles.option}>
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/ParkEase_logo.png')}
                            style={{ width: 40, height: 40 }}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15 }}>Park Points</Text>
                        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 12 }}>LKR 145.00</Text>
                    </View>
                </View>
                <View style={styles.sub_title}>
                    <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 20 }}>Payment Methods</Text>
                </View>
                <View style={styles.paymentMethodsContainer}>
                    <PaymentOptions />
                </View>
                <TouchableOpacity
                    style={styles.option}
                    onPress={handleAddPaymentMethod}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/add.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15 }}>Add payment method</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    onRequestClose={closeModal}
                >
                    <PaymentMethodForm onClose={closeModal} />
                </Modal>
                <View style={styles.sub_title}>
                    <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 20 }}>Vouchers</Text>
                </View>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/add.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15 }}>Add voucher code</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.sub_title}>
                    <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 20 }}>Promotions</Text>
                </View>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/promotion.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15 }}>Promotions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.option}
                >
                    <View style={styles.left}>
                        <Image
                            source={require('@/assets/images/add.png')}
                            style={{ width: 20, height: 20 }}
                        />
                    </View>
                    <View style={styles.mid}>
                        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15 }}>Add promo code</Text>
                    </View>
                </TouchableOpacity>
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
    buttonContainer: {
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
    right: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        position: "relative",
    },
    paymentMethodsContainer: {
        // Add any additional styles needed
    },
    dashedLine: {
        width: '100%',
        height: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dashed',
        borderRadius: 1,
        marginVertical: 10,
    },
});
