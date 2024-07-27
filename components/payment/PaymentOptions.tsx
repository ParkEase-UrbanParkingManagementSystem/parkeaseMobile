import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

type PaymentMethod = {
    id: string;
    name: string;
    number: string;
    image: any;
};

const paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Credit Card', number: '••••1022', image: require('@/assets/images/visa.png') },
    { id: '2', name: 'Debit Card', number: '••••4725', image: require('@/assets/images/amex.png') },
    { id: '3', name: 'PayPark', number: 'LKR 1750.00', image: require('@/assets/images/wallet.png') },
    { id: '4', name: 'Cash', number: "", image: require('@/assets/images/cash.png') },
];

const PaymentOptions: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const selectMethod = (id: string) => {
        setSelectedMethod(id);
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
            <>
                {paymentMethods.map(method => (
                    <TouchableOpacity
                        style={styles.option}
                        key={method.id}
                        onPress={() => selectMethod(method.id)}
                    >
                        <View style={styles.left}>
                            <Image
                                source={method.image}
                                style={{ width: 40, height: 40 }}
                            />
                        </View>
                        <View style={styles.mid}>
                            <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15 }}>{method.name}</Text>
                            <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 12 }}>{method.number}</Text>
                        </View>
                        <View style={[styles.right, { position: "absolute", right: 5, top: 15 }]}>
                            {selectedMethod === method.id && (
                                <Icon name="check" size={20} color="green" />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
});

export default PaymentOptions;
