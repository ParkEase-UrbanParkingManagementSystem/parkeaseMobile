import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {responsiveWidth} from "react-native-responsive-dimensions";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import IOSMap from "@/components/Map/IOSMap";

import ParkingLotSearchModal from "@/components/Modal/ParkingLotSearchModal"

export default function HomePageScreen() {
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
            colors={[colors.primary, colors.primary]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                    <View style={styles.home_page_top}>
                        <View style={styles.searchBarContainer}>
                            <ParkingLotSearchModal/>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => router.push("/(routes)/profile")}>
                                <Image
                                    source={require('@/assets/images/driver_profile.png')}
                                    style={[styles.icon, {marginRight: 20}]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => router.push("/(routes)/notifications")}>
                                <Image
                                    source={require('@/assets/images/notification.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                <View style={styles.home_page_mid}>
                    <View style={styles.title}>
                        <Text style={{color: colors.secondary_light, fontFamily: "Nunito_700Bold", fontSize: 25, marginLeft: 10}}>
                            Locate Parking Lots Near you
                        </Text>
                    </View>
                    <View style={styles.map}>
                        <IOSMap/>
                    </View>
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
        justifyContent: "flex-start",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
    },
    home_page_top: {
        display: "flex",
        flexDirection: "row",
        width: wp("95%"),
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,

    },
    searchBarContainer: {
        width: wp("60%"),
        marginRight: 10
    },
    home_page_mid: {
        // flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,
        width: wp("100%"),
        height: hp("80%"),
        // padding: 10
    },
    title: {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,

    },
    iconContainer: {

    },
    icon: {
        width: wp("9%"),
        height: hp("4%"),
    },
    map: {
        width: wp("100%"),
        height: hp("76%"),
    },

});