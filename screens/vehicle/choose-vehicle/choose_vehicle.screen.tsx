import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../../constants/Colors'
// import {Simulate} from "react-dom/test-utils";
// import abort = Simulate.abort;

export default function ChooseVehicleScreen() {
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
            colors={[colors.white, colors.white]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.title}>
                    <Text>
                        choose vehicle
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Please chose your vehicle
                    </Text>
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
        justifyContent: "center",
    },
    textContainer: {
        position: "absolute",
        right: 30,
        backgroundColor: colors.secondary,
        padding: 10,
        borderStyle: "solid",
        borderWidth: 5,
    },
    text: {
        color: colors.black,
    },
    title: {
        position: "absolute",
        top: 60,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
    },
});