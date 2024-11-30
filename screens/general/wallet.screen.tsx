import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Modal, Alert } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import React, { useState, useEffect } from "react";
import PaymentMethodForm from "@/components/payment/PaymentMethodForm";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

import {EXPO_PUBLIC_API_KEY} from '../../config'



export default function PaymentScreen() {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [details, setDetails] = useState<any>(null); // Changed to `any` for simplicity
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
    const amountToPay = Number(details?.toll_amount) || 0; // Ensure amountToPay is a number
    
     

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('No token found');
                console.log(token)

                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/parked-detailsMob`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token || "",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.status}`);
                }

                const data = await response.json();
                if (data.message === "No parking details found") {
                    setDetails(null);
                } else {
                    setDetails(data.data);
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [router]);

    

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const selectMethod = (id: string) => {
        setSelectedMethod(id);
    };

    const handleConfirmPayment = () => {
        if (selectedMethod) {
            setIsConfirmationVisible(true);
        }
    };

    const confirmPayment = async () => {
        if(selectedMethod === '1') {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/pay-wallet`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', 
                        token: token || "",
                    },
                    body: JSON.stringify({ 
                        amount: amountToPay,
                        method: selectedMethod,
                        instance_id: details?.instance_id,
                    }),
                });
                // Handle response
            } catch (error) {
                console.error('Error paying by wallet:', error);
            }
        } else if(selectedMethod === '2') {
            try {
                const token = await AsyncStorage.getItem('token');

                if (!token) throw new Error('No token found');

                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/pay-cash`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token || "",
                    },
                    body: JSON.stringify({method: selectedMethod,
                        instance_id: details?.instance_id, }),
                });

            } catch (error) {
                console.error('Error paying by cash:', error);
            }
        } else if(selectedMethod === '3') {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('No token found');

                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/pay-pp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token || "",
                    },
                    body: JSON.stringify({ amount: amountToPay, method: selectedMethod,
                        instance_id: details?.instance_id, }),
                });
                // Handle response
            } catch (error) {
                console.error('Error paying by park points:', error);
            }
        }
        setIsConfirmationVisible(false);
        Alert.alert("Payment Confirmed", "Your payment has been processed successfully.");
        router.push("/(routes)/home-page")
    };

    const cancelConfirmation = () => {
        setIsConfirmationVisible(false);
    };

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    });

    if (!fontsLoaded) {
        if (fontError) {
            console.error(fontError);
        }
        return null;
    }

    const paymentMethods = [
        { id: '1', name: 'PayPark Wallet', balance: `LKR ${details?.wallet || 0}`, image: require('@/assets/images/wallet.png') },
        ...(details?.method_id !== 4 ? [{ id: '2', name: 'Cash', balance: '', image: require('@/assets/images/cash.png') }] : []),
        { id: '3', name: 'Park Points', balance: `LKR ${details?.parkpoints || 0}`, image: require('@/assets/images/ParkEase_logo.png') },
    ];

    const getBalance = (methodId: string) => {
        const method = paymentMethods.find(m => m.id === methodId);
        return method?.balance ? parseFloat(method.balance.replace('LKR ', '').replace(',', '')) : 0;
    };

    const balance = selectedMethod ? getBalance(selectedMethod) : 0;
    const isBalanceSufficient = balance >= amountToPay;

    if (!details) {
        return (
            <LinearGradient colors={[colors.secondary_light, colors.secondary_light]} style={styles.gradient}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.messageContainer}>
                        <Text style={styles.noDetailsText}>
                            Please ask your warden to rescan your QR code before proceeding with payments.
                        </Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.container}>
            <SafeAreaView style={styles.innerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {/* Navigate back */}}>
                        <Image source={require('@/assets/images/next.png')} style={styles.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                </View>

        {details.method_id!=4 && (<View style={styles.amountContainer2}>
                    
                    <Text style={styles.amountText2}>Amount to Pay</Text>
                    <Text style={styles.amountValue2}>LKR {amountToPay.toFixed(2)}</Text>
                    
                </View>)} 
                



                {details.method_id === 4 && (
                 <View style={styles.amountContainer}>
               <Text style={styles.descriptionText}>
                    Your vehicle has been exited from the parking lot due to your absence or an unavoidable situation. 
                    To ensure smooth parking operations, you are required to settle this payment before proceeding to 
                   your next parking session.
                 </Text>
                <Text style={styles.amountText}>Amount to Pay</Text>
                 <Text style={styles.amountValue}>LKR {amountToPay.toFixed(2)}</Text>
                </View>
                    )}


                <View style={styles.paymentMethodsContainer}>
                    {paymentMethods.map(method => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.paymentMethod,
                                selectedMethod === method.id && styles.selectedMethod
                            ]}
                            onPress={() => selectMethod(method.id)}
                        >
                            <Image source={method.image} style={styles.paymentImage} />
                            <View style={styles.paymentDetails}>
                                <Text style={styles.paymentName}>{method.name}</Text>
                                {method.balance ? (
                                    <Text style={styles.paymentBalance}>{method.balance}</Text>
                                ) : null}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
                {selectedMethod && (
                    <View style={styles.summaryContainer}>
                        {selectedMethod === '2' ? (
                            <Text style={styles.summaryText}>Cash payment selected. Confirm payment.</Text>
                        ) : (
                            <>
                                <Text style={styles.summaryText}>Current Balance: LKR {balance.toFixed(2)}</Text>
                                <Text style={styles.summaryText}>Amount to Pay: LKR {amountToPay.toFixed(2)}</Text>
                                <Text style={styles.summaryText}>Balance After Payment: LKR {(balance - amountToPay).toFixed(2)}</Text>
                                {!isBalanceSufficient && (
                                    <Text style={styles.insufficientBalanceText}>Insufficient balance for this method.</Text>
                                )}
                            </>
                        )}
                    </View>
                )}
                <TouchableOpacity
                    style={[
                        styles.confirmButton,
                        (selectedMethod === '2' || isBalanceSufficient) ? styles.confirmButtonVisible : styles.confirmButtonHidden
                    ]}
                    onPress={handleConfirmPayment}
                >
                    <Text style={styles.confirmButtonText}>Confirm Payment</Text>
                </TouchableOpacity>

                <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeModal}>
                    <PaymentMethodForm onClose={closeModal} />
                </Modal>

                <Modal visible={isConfirmationVisible} transparent={true} animationType="fade" onRequestClose={cancelConfirmation}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Confirm Payment</Text>
                            <Text style={styles.modalMessage}>
                                Are you sure you want to proceed with the payment using  
                                {selectedMethod === '1' ? "PayPark Wallet" : selectedMethod === '2' ? " Cash" : " Park Points"}?
                            </Text>
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity style={styles.modalButton} onPress={confirmPayment}>
                                    <Text style={styles.modalButtonText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={cancelConfirmation}>
                                    <Text style={styles.modalButtonText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </LinearGradient>
    );
}

// styles
export const styles = StyleSheet.create({

    amountContainer2: {
        width: '100%',
        alignItems: 'center',
        marginVertical: hp('3%'),
    },
    amountText2: {
        fontFamily: "Nunito_400Regular",
        fontSize: 20,
        color: colors.primary,
    },
    amountValue2: {
        fontFamily: "Nunito_700Bold",
        fontSize: 36,
        color: colors.primary,
    },

    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer: {
        display: 'flex',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5
    },
    noDetailsText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    innerContainer: {
        flex: 1,
        width: '90%',
        justifyContent: 'flex-start',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp('4%'),
    },
    backIcon: {
        width: 30,
        height: 30,
        tintColor: colors.primary,
    },
    headerTitle: {
        fontFamily: "Nunito_700Bold",
        fontSize: 28,
        color: colors.primary,
        marginLeft: wp('4%'),
    },
    amountContainer: {
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        margin: 10,
    },
    descriptionText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        lineHeight: 22,
        textAlign: 'center',
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'center',
        marginBottom: 5,
    },
    amountValue: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#d9534f',
        textAlign: 'center',
    },
    paymentMethodsContainer: {
        width: '100%',
        marginVertical: hp('3%'),
        gap: hp('2%'),
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp('1.5%'),
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        paddingHorizontal: wp('4%'),
    },
    selectedMethod: {
        backgroundColor: colors.secondary_light2,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    paymentImage: {
        width: 50,
        height: 50,
        marginRight: wp('4%'),
    },
    paymentDetails: {
        flex: 1,
    },
    paymentName: {
        fontFamily: "Nunito_700Bold",
        fontSize: 18,
        color: colors.primary,
    },
    paymentBalance: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        color: colors.primary,
    },
    summaryContainer: {
        width: '100%',
        padding: hp('2%'),
        backgroundColor: colors.secondary_light2,
        borderRadius: 12,
        marginVertical: hp('3%'),
    },
    summaryText: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        color: colors.primary,
        marginBottom: hp('1%'),
    },
    insufficientBalanceText: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        color: colors.error,
        marginTop: hp('1%'),
    },
    confirmButton: {
        width: '100%',
        paddingVertical: hp('2.5%'),
        backgroundColor: colors.primary,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('4%'),
    },
    confirmButtonVisible: {
        display: 'flex',
    },
    confirmButtonHidden: {
        display: 'none',
    },
    confirmButtonText: {
        fontFamily: "Nunito_700Bold",
        fontSize: 20,
        color: colors.white,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: hp('4%'),
        backgroundColor: colors.white,
        borderRadius: 12,
        alignItems: 'center',
    },
    modalTitle: {
        fontFamily: "Nunito_700Bold",
        fontSize: 20,
        color: colors.primary,
        marginBottom: hp('2%'),
    },
    modalMessage: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        color: colors.primary,
        marginBottom: hp('3%'),
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    },
    modalButton: {
        width: '45%',
        paddingVertical: hp('1.5%'),
        backgroundColor: colors.primary,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalButtonText: {
        fontFamily: "Nunito_700Bold",
        fontSize: 16,
        color: colors.white,
    },
});
