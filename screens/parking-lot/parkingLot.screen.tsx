import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'

export default function parkingLotScreen() {
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
            colors={[colors.secondary_light, colors.white]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.topContainer}>
                    {/*<View style={styles.ScrollViewConatiner}>*/}
                        <ScrollView horizontal style={styles.imageScrollView}>
                            <View style={styles.imageContainer}>

                            </View>
                        </ScrollView>
                    {/*</View>*/}
                    <View style={styles.name}>

                    </View>
                    <View style={styles.des}>

                    </View>
                </View>
                <View style={styles.MidContainer}>
                    <View style={styles.capacities}>
                        <View style={styles.cap}>
                            <Image/>
                            <Text></Text>
                        </View>
                    </View>
                    <View style={styles.reviews}>
                        <ScrollView style={styles.reviewsScrollView}>
                            <View style={styles.review}>
                                {/*<Text></Text> name and data*/}
                                {/*<Text></Text> review*/}
                                {/*<View></View> stars*/}
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.BottomContainer}>
                    <Button
                        title="Back to Home"
                        onPress={() => router.back()}
                    />
                    <Button
                        title="Navigate"
                        // onPress={() => router.back()}
                    />
                </View>
                {/*<View style={styles.buttonContainer}>*/}
                {/*    <Button title="Go Back"*/}
                {/*            color={"#000000"}*/}
                {/*            onPress={() => router.back()}*/}
                {/*    />*/}
                {/*</View>*/}
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
        bottom: 30,
    },
    topContainer: {

    },
    imageScrollView: {

    },
    imageContainer: {

    },
    name: {

    },
    des: {

    },
    MidContainer: {

    },
    capacities: {

    },
    cap: {

    },
    reviews: {

    },
    reviewsScrollView: {

    },
    review: {

    },
    BottomContainer: {

    },
});