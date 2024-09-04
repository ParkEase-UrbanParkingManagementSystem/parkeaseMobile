import {
    View,
    Button,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator, SafeAreaView,
    Alert
} from "react-native";
import {
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
import { useState, useCallback } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../constants/Colors"
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

export default function LoginScreen(message?: any) {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    // const [required, setRequired] = useState("");
    // const [error, setError] = useState({
    //     password: "",
    // });
    const { signIn, setActive, isLoaded } = useSignIn();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY

    const handleSignIn = useCallback(async () => {
        if (!isLoaded) return;

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === "complete") {
                await setActive({ session: signInAttempt.createdSessionId });
                router.push("/(routes)/home-page")
            } else {
                // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
                console.log(JSON.stringify(signInAttempt, null, 2));
                Alert.alert("Error", "Log in failed. Please try again.");
            }
        } catch (err: any) {
            console.log(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors[0].longMessage);
        }
    }, [isLoaded, form]);

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

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
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
                        Welcome Back!
                    </Text>
                    <Text style={styles.learningText}>
                        Login to your existing account of ParkEase
                    </Text>
                    <View style={styles.inputContainer}>
                        <View>
                            <InputField
                                label="Email"
                                placeholder="Enter email"
                                placeholderTextColor = "#D1D2D5"
                                icon={icons.email}
                                textContentType="emailAddress"
                                value={form.email}
                                autoCapitalize="none" // Disable automatic capitalization
                                onChangeText={(value) => setForm({ ...form, email: value })}
                            />
                            <View>
                                <InputField
                                    label="Password"
                                    placeholder="Enter password"
                                    placeholderTextColor = "#D1D2D5"
                                    icon={icons.lock}
                                    secureTextEntry={!isPasswordVisible}
                                    textContentType="password"
                                    value={form.password}
                                    onChangeText={(value) => setForm({ ...form, password: value })}
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
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push("/(routes)/forgot-password")}
                            >
                                <Text
                                    style={[
                                        styles.forgotSection,
                                        { fontFamily: "Nunito_600SemiBold" },
                                    ]}
                                >
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    padding: 16,
                                    borderRadius: 8,
                                    marginHorizontal: 16,
                                    backgroundColor: colors.primary,
                                    marginTop: 15,
                                }}
                                onPress={handleSignIn}
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
                                        Login
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <OAuth/>

                            <View style={styles.signupRedirect}>
                                <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
                                    Don't have an account?
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.push("/(routes)/sign-up")}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontFamily: "Raleway_600SemiBold",
                                            color: "#2467EC",
                                            marginLeft: 5,
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
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
        marginHorizontal: 16,
        borderRadius: 8,
        paddingLeft: 35,
        fontSize: 16,
        backgroundColor: "white",
        color: "#A1A1A1",
    },
    visibleIcon: {
        position: "absolute",
        right: 30,
        top: 55,
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
    appNavigation: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: "flex-start",
    }


});
