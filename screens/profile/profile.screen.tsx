import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export default function profileScreen() {
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
            colors={[colors.primary_light, colors.primary_light]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.header}>
                    <View style={styles.name}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 30}}>Chethiya Wanigarathne</Text>
                        <View style={styles.rating}>
                            <Image
                                style={styles.starIcon}
                                source={require("@/assets/images/star.png")}
                            />
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>4.77</Text>
                        </View>
                    </View>
                    <View style={styles.profilePicImageContainer}>
                        <Image
                            style={styles.profilePicImage}
                            source={require("@/assets/images/profilePic.jpg")}
                        />
                    </View>
                </View>
                <View style={styles.quickAccess}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(routes)/choose-vehicle")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/pickup_side.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Vehicles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={() => router.push("/(routes)/")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/paymentIcon.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        // onPress={() => router.push("/(routes)/")}
                    >
                        <Image
                            style={styles.quickAccessIcon}
                            source={require("@/assets/images/activity.png")}
                        />
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>Activity</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Go Back"
                            color={"#000000"}
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
    header: {
        // borderStyle: "solid",
        // borderColor: "#2467EC",
        // borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        width: wp("100%"),
    },
    name: {
        flexDirection: "column",
    },
    rating: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        justifyContent: "flex-start",
        borderStyle: "solid",
        borderColor: "#2467EC",
        borderWidth: 1,
        maxWidth: "23%",
        padding: 8,
        backgroundColor: colors.secondary,
        borderRadius: 10
    },
    starIcon: {
        width: 20,
        height: 20,
    },
    profilePicImageContainer: {
    },
    profilePicImage: {
        width: 50,
        height: 50,
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 25,
    },
    quickAccess: {
        display: "flex",
        flexDirection: "row",
        gap: 35,
    },
    button: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        // borderStyle: "solid",
        // borderColor: "#2467EC",
        // borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        gap: 10,
        width: wp("25%"),
        backgroundColor: "#efefef",
    },
    quickAccessIcon: {
        width: 35,
        height: 30,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
});