import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { CardField, useStripe, CardFieldInput } from '@stripe/stripe-react-native';

const PaymentMethodForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { createPaymentMethod } = useStripe();
    const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);

    const handleAddPaymentMethod = async () => {
        if (!cardDetails?.complete) {
            Alert.alert("Please enter complete card details");
            return;
        }

        const { paymentMethod, error } = await createPaymentMethod({
            paymentMethodType: 'Card',
            paymentMethodData: {
                billingDetails: {},
            },
        });

        if (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        } else {
            console.log(paymentMethod);
            onClose();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Add Payment Method</Text>
                <View style={styles.inputContainer}>
                    <CardField
                        postalCodeEnabled={true}
                        placeholders={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={styles.card}
                        style={styles.cardContainer}
                        onCardChange={(details) => {
                            setCardDetails(details);
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleAddPaymentMethod}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    container: {
        width: '90%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    cardContainer: {
        height: 50,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#d9534f',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default PaymentMethodForm;
