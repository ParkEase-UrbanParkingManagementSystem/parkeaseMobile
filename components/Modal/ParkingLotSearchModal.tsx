import React, { useState } from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity, Button} from 'react-native';
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import { router } from "expo-router";
import colors from "@/constants/Colors";
import {Raleway_700Bold, useFonts} from "@expo-google-fonts/raleway";
import {Nunito_400Regular, Nunito_700Bold} from "@expo-google-fonts/nunito";
import ParkingLotSearchBox from "@/components/SearchBox/ParkingLotSearchBox";

interface ParkingLotSearchModalProps {
    data: string[];
}

const ParkingLotSearchModal: React.FC<ParkingLotSearchModalProps> = ({ data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    return (
        <>
            {/*modal activation button*/}
            <TouchableOpacity
                style={styles.ParkingLotSearchButtonContainer}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.SearchBarText}>
                    Search for parking Lots
                </Text>
            </TouchableOpacity>
            {/*plate type selection Modal*/}
            <Modal
                visible = {isModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <ParkingLotSearchBox data={data}/>
                <View style={{marginBottom: 60}}>
                    <Button
                        title="Cancel"
                        onPress={() => setIsModalVisible(false)}
                    />
                </View>
            </Modal></>
    );
};

const styles = StyleSheet.create({
    ParkingLotSearchButtonContainer: {
        borderStyle: "solid",
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: hp("1%"),
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    SearchBarText: {
        color: colors.secondary_light,
        fontSize: 15.5,
        fontWeight: "600",
        fontFamily: "Nunito_400Regular",
    },
});

export default ParkingLotSearchModal;
