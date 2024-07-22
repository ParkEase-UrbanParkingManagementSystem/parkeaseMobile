import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator, SafeAreaView,
} from "react-native";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Fontisto,
    Ionicons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
    useFonts,
    Raleway_700Bold,
    Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
import { router } from "expo-router";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../../constants/Colors"
import {white} from "colorette";
import {color} from "ansi-fragments";

export default function SignUpScreen() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [required, setRequired] = useState("");
    const [error, setError] = useState({
        password: "",
    });

    let [fontsLoaded, fontError] = useFonts({
        Raleway_600SemiBold,
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_700Bold,
        Nunito_600SemiBold,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const handlePasswordValidation = (value: string) => {
        const password = value;
        const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
        const passwordOneNumber = /(?=.*[0-9])/;
        const passwordSixValue = /(?=.{6,})/;

        if (!passwordSpecialCharacter.test(password)) {
            setError({
                ...error,
                password: "Write at least one special character",
            });
            setUserInfo({ ...userInfo, password: "" });
        } else if (!passwordOneNumber.test(password)) {
            setError({
                ...error,
                password: "Write at least one number",
            });
            setUserInfo({ ...userInfo, password: "" });
        } else if (!passwordSixValue.test(password)) {
            setError({
                ...error,
                password: "Write at least 6 characters",
            });
            setUserInfo({ ...userInfo, password: "" });
        } else {
            setError({
                ...error,
                password: "",
            });
            setUserInfo({ ...userInfo, password: value });
        }
    };
    const handleSignUp = async () => {
        // router.push("(routes)/verifyAccount")
    }
    // const handleSignUp = async () => {
    //     await axios
    //         .post(`${SERVER_URI}/login`, {
    //             email: userInfo.email,
    //             password: userInfo.password,
    //         })
    //         .then(async (res) => {
    //             await AsyncStorage.setItem("access_token", res.data.accessToken);
    //             await AsyncStorage.setItem("refresh_token", res.data.refreshToken);
    //             router.push("/(tabs)");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             Toast.show("Email or password is not correct!", {
    //                 type: "danger",
    //             });
    //         });
    // };

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.primary_light]}
            style={{ flex: 1}}
            start={{ x: 0.5, y: 1 }}
            end={{x: 0.5, y: 0 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <Image
                        style={styles.signInImage}
                        source={require("@/assets/sign-in/signin.webp")}
                    />
                    <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
                        Hi, Welcome to ParkEase
                    </Text>
                    <Text style={styles.learningText}>
                        Create an account and start parking in no time
                    </Text>
                    <View style={styles.inputContainer}>
    {/*name field*/}
                        <View style={{marginTop:15}}>
                            <TextInput
                                style={styles.input}
                                keyboardType="default"
                                value={userInfo.name}
                                placeholder="User Name"
                                onChangeText={(value) =>
                                    setUserInfo({ ...userInfo, name: value })
                                }
                            />
                            <AntDesign
                                style={{ position: "absolute", left: 26, top: 17.8 }}
                                name="user"
                                size={20}
                                color={"#A1A1A1"}
                            />
                            {required && (
                                <View style={styles.errorContainer}>
                                    <Entypo name="cross" size={18} color={"red"} />
                                </View>
                            )}
    {/*email field*/}
                        <View style={{marginTop:15}}>
                            <TextInput
                                style={styles.input}
                                keyboardType="email-address"
                                value={userInfo.email}
                                placeholder="Email Address"
                                onChangeText={(value) =>
                                    setUserInfo({ ...userInfo, email: value })
                                }
                            />
                            <Fontisto
                                style={{ position: "absolute", left: 26, top: 17.8 }}
                                name="email"
                                size={20}
                                color={"#A1A1A1"}
                            />
                            {required && (
                                <View style={styles.errorContainer}>
                                    <Entypo name="cross" size={18} color={"red"} />
                                </View>
                            )}
    {/*contact no field*/}
                            <View style={{marginTop:15}}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="phone-pad"
                                    value={userInfo.email}
                                    placeholder="Phone No"
                                    onChangeText={(value) =>
                                        setUserInfo({ ...userInfo, email: value })
                                    }
                                />
                                <Fontisto
                                    style={{ position: "absolute", left: 26, top: 17.8 }}
                                    name="phone"
                                    size={20}
                                    color={"#A1A1A1"}
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
        {/*password field*/}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="default"
                                    secureTextEntry={!isPasswordVisible}
                                    defaultValue=""
                                    placeholder="Password"
                                    onChangeText={handlePasswordValidation}
                                />
                                <TouchableOpacity
                                    style={styles.visibleIcon}
                                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                                >
                                    {isPasswordVisible ? (
                                        <Ionicons
                                            name="eye-off-outline"
                                            size={23}
                                            color={"#747474"}
                                        />
                                    ) : (
                                        <Ionicons name="eye-outline" size={23} color={"#747474"} />
                                    )}
                                </TouchableOpacity>
                                <SimpleLineIcons
                                    style={styles.icon2}
                                    name="lock"
                                    size={20}
                                    color={"#A1A1A1"}
                                />
                            </View>
                            {error.password && (
                                <View style={[styles.errorContainer, { top: 145 }]}>
                                    <Entypo name="cross" size={18} color={"red"} />
                                    <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                                        {error.password}
                                    </Text>
                                </View>
                            )}

                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    borderRadius: 8,
                                    marginHorizontal: 16,
                                    backgroundColor: colors.primary,
                                    marginTop: 15,
                                }}
                                onPress={handleSignUp}
                            >
                                {buttonSpinner ? (
                                    <ActivityIndicator size="small" color={"white"} />
                                ) : (
                                    <Text
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 16,
                                            fontFamily: "Raleway_700Bold",
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: 20,
                                    gap: 10,
                                }}
                            >
                                <TouchableOpacity>
                                    <FontAwesome name="google" size={30} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <FontAwesome name="github" size={30} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.signupRedirect}>
                                <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                                    Already have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.push("/(routes)/login")}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontFamily: "Raleway_600SemiBold",
                                            color: "#2467EC",
                                            marginLeft: 5,
                                        }}
                                    >
                                        Login
                                    </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    signInImage: {
        width: "80%",
        height: 250,
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 24,
    },
    learningText: {
        textAlign: "center",
        color: "#575757",
        fontSize: 15,
        marginTop: 5,
    },
    inputContainer: {
        marginHorizontal: 16,
        marginTop: 30,
        rowGap: 30,
    },
    input: {
        height: 55,
        marginHorizontal: 25,
        borderRadius: 8,
        paddingLeft: 35,
        fontSize: 16,
        backgroundColor: "white",
        color: "#A1A1A1",
    },
    visibleIcon: {
        position: "absolute",
        right: 30,
        top: 15,
    },
    icon2: {
        position: "absolute",
        left: 23,
        top: 17.8,
        marginTop: -2,
    },
    forgotSection: {
        marginHorizontal: 16,
        textAlign: "right",
        fontSize: 16,
        marginTop: 10,
    },
    signupRedirect: {
        flexDirection: "row",
        marginHorizontal: 16,
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20,
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        position: "absolute",
        top: 60,
    },


});
