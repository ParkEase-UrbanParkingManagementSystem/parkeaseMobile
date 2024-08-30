import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
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
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

import colors from "../../../constants/Colors";
import {EXPO_PUBLIC_API_KEY} from "@env";

export default function SignUpScreen() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [required, setRequired] = useState(false);
    const [error, setError] = useState({
        password: "",
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [nic, setNic] = useState('');
    const [contact, setContact] = useState('');
    const [addressNo, setAddressNo] = useState('');
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [loading, setLoading] = useState(false);


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

    // const handlePasswordValidation = (value: string) => {
    //     const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    //     const passwordOneNumber = /(?=.*[0-9])/;
    //     const passwordSixValue = /(?=.{6,})/;
    //
    //     if (!passwordSpecialCharacter.test(value)) {
    //         setError({
    //             ...error,
    //             password: "Write at least one special character",
    //         });
    //         setPassword('');
    //     } else if (!passwordOneNumber.test(value)) {
    //         setError({
    //             ...error,
    //             password: "Write at least one number",
    //         });
    //         setPassword('');
    //     } else if (!passwordSixValue.test(value)) {
    //         setError({
    //             ...error,
    //             password: "Write at least 6 characters",
    //         });
    //         setPassword('');
    //     } else {
    //         setError({
    //             ...error,
    //             password: "",
    //         });
    //         setPassword(value);
    //     }
    // };

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const body = {
                email,
                password,
                fname,
                lname,
                nic,
                contact,
                addressNo,
                street1,
                street2,
                city,
                district,
            };

            const response = await fetch(`${EXPO_PUBLIC_API_KEY}/auth/registerDriver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                alert('Registration successful. Please log in.');
                router.push("/(routes)/login")
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                alert('An error occurred: ' + error.message);
            } else {
                console.error('Unexpected error:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={[colors.primary_light, colors.primary_light]}
            style={{ flex: 1 }}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <View>
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
                        <ScrollView contentContainerStyle={{}} style={{ height: hp("40%")}}>
                            <Text style={{fontFamily:"Nunito_700Bold", fontSize: 15, marginHorizontal:25}}>Personal Details</Text>
                            {/* email field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={email}
                                    placeholder="Email Address"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setEmail(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* password field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    secureTextEntry={!isPasswordVisible}
                                    value={password}
                                    placeholder="********"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setPassword(value)
                                    }
                                />
                                <TouchableOpacity
                                    style={styles.visibleIcon}
                                    onPress={() => setPasswordVisible(!isPasswordVisible)}
                                >
                                    {isPasswordVisible ? (
                                        <Ionicons name="eye-off-outline" size={23} color="#747474" />
                                    ) : (
                                        <Ionicons name="eye-outline" size={23} color="#747474" />
                                    )}
                                </TouchableOpacity>
                            </View>
                            {error.password && (
                                <View style={[styles.errorContainer, { top: 143, left: 15 }]}>
                                    <Entypo name="cross" size={18} color={"red"} />
                                    <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                                        {error.password}
                                    </Text>
                                </View>
                            )}
                            {/* first name field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={fname}
                                    placeholder="First Name"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setFname(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* last name field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={lname}
                                    placeholder="Last Name"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setLname(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* nic field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={nic}
                                    placeholder="NIC Number"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setNic(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* contact no field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="phone-pad"
                                    value={contact}
                                    placeholder="Contact No"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setContact(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>

                            {/*address*/}
                            <Text style={{fontFamily:"Nunito_700Bold", fontSize: 15, marginHorizontal:25, marginTop: 20}}>Address Details</Text>
                            {/* addressNo field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={addressNo}
                                    placeholder="Address No"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setAddressNo(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* street1 field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={street1}
                                    placeholder="Street 1"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setStreet1(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* street2 field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={street2}
                                    placeholder="Street 2"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setStreet2(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* city field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={city}
                                    placeholder="City"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setCity(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                            {/* district field */}
                            <View style={{ marginTop: 15 }}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    value={district}
                                    placeholder="District"
                                    placeholderTextColor = "#D1D2D5"
                                    onChangeText={(value) =>
                                        setDistrict(value)
                                    }
                                />
                                {required && (
                                    <View style={styles.errorContainer}>
                                        <Entypo name="cross" size={18} color={"red"} />
                                    </View>
                                )}
                            </View>
                        </ScrollView>

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
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    signInImage: {
        width: "50%",
        height: "20%",
        alignSelf: "center",
        marginTop: 25,
        marginBottom: 25,
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
        marginHorizontal: 0,
        marginTop: 30,
        rowGap: 0,
    },
    input: {
        height: 55,
        marginHorizontal: 25,
        borderRadius: 8,
        paddingLeft: 40,
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