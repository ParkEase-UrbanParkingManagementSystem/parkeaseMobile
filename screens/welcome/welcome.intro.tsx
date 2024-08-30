import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native";
import {
    Nunito_400Regular,
    Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { LinearGradient } from "expo-linear-gradient";
import AppIntroSlider from "react-native-app-intro-slider";
import { onboardingSwiperData } from "@/constants/constants";
import { router } from "expo-router";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";

import colors from '../../constants/Colors'

export default function WelcomeIntroScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const renderItem = ({ item }: { item: onboardingSwiperDataType }) => (
        <LinearGradient
            colors={[colors.secondary_light, colors.primary_light]}
            style={{ flex: 1, paddingHorizontal: 16 }}
            start={{ x: 0, y: 0 }}
            end={{x: 1 , y: 1 }}
        >
            <View style={{ marginTop: 60 }}>
                <TouchableOpacity
                    onPress={() => router.push("/(routes)/login")}
                    style={styles.skipButton}
                >
                    <Text className="text-black text-md font-JakartaBold">Skip</Text>
                </TouchableOpacity>
                <Image
                    source={item.image}
                    style={{ alignSelf: "center", marginBottom: 0, width: responsiveWidth(88), height: responsiveHeight(46)}}
                />
                <Text style={[styles.title, { fontFamily: "Raleway_700Bold" }]}>
                    {item.title}
                </Text>
                <View style={{ marginTop: 15 }}>
                    <Text
                        style={[
                            styles.description,
                            { fontFamily: "Nunito_400Regular" },
                        ]}
                    >
                        {item.description}
                    </Text>
                    <Text
                        style={[
                            styles.description,
                            { fontFamily: "Nunito_400Regular" },
                        ]}
                    >
                        {item.sortDescrition}
                    </Text>
                    <Text
                        style={[
                            styles.description,
                            { fontFamily: "Nunito_400Regular" },
                        ]}
                    >
                        {item.sortDescrition2}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );

    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={onboardingSwiperData}
            onDone={() => {
                router.push("/login");
            }}
            onSkip={() => {
                router.push("/login");
            }}
            renderNextButton={() => (
                <View style={styles.welcomeButtonStyle}>
                    <Text
                        style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
                    >
                        Next
                    </Text>
                </View>
            )}
            renderDoneButton={() => (
                <View style={styles.welcomeButtonStyle}>
                    <Text
                        style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
                    >
                        Done
                    </Text>
                </View>
            )}
            showSkipButton={false}
            dotStyle={styles.dotStyle}
            bottomButton={true}
            activeDotStyle={styles.activeDotStyle}
        />
    );
}
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        backgroundColor: "#2467EC",
        width: responsiveWidth(88),
        height: responsiveWidth(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
    },
    dotStyle: {
        backgroundColor: "#C6C7CC",
        width: responsiveWidth(2.5),
        height: responsiveWidth(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDotStyle: {
        backgroundColor: "#2467Ec",
        width: responsiveWidth(2.5),
        height: responsiveWidth(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
    },
    title: {
        fontSize: hp("3.5%"),
        textAlign: "center",
    },
    description: {
        fontSize: hp("2.5%"),
        color: "#575757",
        textAlign: "center",
    },
    input: {
        height: 55,
        marginHorizontal: 16,
        borderRadius: 8,
        paddingLeft: 35,
        fontSize: 16,
        backgroundColor: "white",
        color: "#A1A1A1",
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        position: "absolute",
        top: 60,
    },
    welcomeButtonStyle:{
        backgroundColor: "#ffcc5c",
        width: responsiveWidth(88),
        height: responsiveHeight(5.5),
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    buttonText: {
        color: "black",
        textAlign: "center",
    },
    skipButton: {
        alignSelf: "flex-end",
        marginBottom: 20,
        marginRight: 20
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: "black",
    },
})