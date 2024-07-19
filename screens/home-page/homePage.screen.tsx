import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {responsiveWidth} from "react-native-responsive-dimensions";

import ParkingLotSearchBox from "@/components/SearchBox/ParkingLotSearchBox"

export default function HomePageScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const data = [
        'Broadway Parking Hub',
        'Empire State Parking',
        'Central Park Garage',
        'Hudson River Parking',
        'Times Square Lot',
        'Brooklyn Bridge Parking',
        'SoHo Parking Plaza',
        'Liberty Street Garage',
    ];

    return (
        <LinearGradient
            colors={[colors.primary, colors.primary]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                    <View style={styles.home_page_top}>
                        <ParkingLotSearchBox data={data}/>
                        <View style={styles.iconContainer}></View>
                        <View style={styles.iconContainer}></View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Go Back"
                                color={colors.secondary_light}
                                onPress={() => router.back()}
                        />
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
        justifyContent: "center",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
    },
    home_page_top: {
        display: "flex",
        flexDirection: "column",
        width: responsiveWidth(50),
        height: responsiveWidth(50),
        borderStyle: "solid",
    },
    searchBox: {

    },
    iconContainer: {

    },

});