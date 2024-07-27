import React, { useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
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
        <View style={styles.container}>
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
            <Button title="Add Payment Method" onPress={handleAddPaymentMethod} />
            <Button title="Cancel" onPress={onClose} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});

export default PaymentMethodForm;
