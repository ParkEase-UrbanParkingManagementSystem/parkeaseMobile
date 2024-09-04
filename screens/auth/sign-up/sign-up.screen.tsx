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
    Alert
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
import { useState, useEffect } from "react";
import { router } from "expo-router";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {heightPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../../constants/Colors";
import { useSignUp } from "@clerk/clerk-expo";
import OAuth from "@/components/OAuth";
import { ReactNativeModal } from "react-native-modal";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

export default function SignUpScreen() {
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [required, setRequired] = useState(false);
    const [error, setError] = useState({
        password: "",
    });
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        console.log('showSuccessModal changed:', showSuccessModal);
    }, [showSuccessModal]);

    const [form, setForm] = useState({
        fname: "",
        lname: "",
        nic: "",
        email: "",
        password: "",
        contact: "",
        addressNo: "",
        street1: "",
        street2: "",
        city: "",
        district: "",
        isverified: false,
        role_id: "",
        clerkid: "",
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });
    const [loading, setLoading] = useState(false);

    const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY

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

    const handleSignUp = async () => {
        if (!isLoaded) return;

        setLoading(true);
        try {
            // Create the user with Clerk
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            // Prepare for email verification
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // Set the verification state to pending
            setVerification({
                ...verification,
                state: "pending",
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors?.[0]?.longMessage || 'An unexpected error occurred.');
            setLoading(false);
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) return;

        try {
            // Attempt email verification
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === "complete") {
                // Register the user in your backend
                const body = {
                    fname: form.fname,
                    lname: form.lname,
                    nic: form.nic,
                    email: form.email,
                    password: form.password,
                    contact: form.contact,
                    addressNo: form.addressNo,
                    street1: form.street1,
                    street2: form.street2,
                    city: form.city,
                    district: form.district,
                    isverified: true,
                    role_id: 1,
                    clerkid: completeSignUp.createdUserId,
                };

                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/auth/registerDriver`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (response.ok) {
                    // Set the session as active in Clerk
                    await setActive({ session: completeSignUp.createdSessionId });
                    setVerification({
                        ...verification,
                        state: "success",
                    });
                } else {
                    setVerification({
                        ...verification,
                        error: "Registration failed. Please try again.",
                        state: "failed",
                    });
                }
            } else {
                setVerification({
                    ...verification,
                    error: "Verification failed. Please try again.",
                    state: "failed",
                });
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setVerification({
                ...verification,
                error: err.errors?.[0]?.longMessage || 'An unexpected error occurred.',
                state: "failed",
            });
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
                <ScrollView>
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
                            <ScrollView contentContainerStyle={{}} style={{ height: hp("30%")}}>
                                <Text style={{fontFamily:"Nunito_700Bold", fontSize: 15, marginHorizontal:25}}>Personal Details</Text>
                                {/* email field */}
                                <View style={{ marginTop: 15 }}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        value={form.email}
                                        placeholder="Email Address"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, email: value })}
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
                                        value={form.password}
                                        placeholder="********"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, password: value })}
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
                                        value={form.fname}
                                        placeholder="First Name"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, fname: value })}
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
                                        value={form.lname}
                                        placeholder="Last Name"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, lname: value })}

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
                                        value={form.nic}
                                        placeholder="NIC Number"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, nic: value })}

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
                                        value={form.contact}
                                        placeholder="Contact No"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, contact: value })}

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
                                        value={form.addressNo}
                                        placeholder="Address No"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, addressNo: value })}

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
                                        value={form.street1}
                                        placeholder="Street 1"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, street1: value })}

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
                                        value={form.street2}
                                        placeholder="Street 2"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, street2: value })}

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
                                        value={form.city}
                                        placeholder="City"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, city: value })}

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
                                        value={form.district}
                                        placeholder="District"
                                        placeholderTextColor = "#D1D2D5"
                                        onChangeText={(value) => setForm({ ...form, district: value })}

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

                            <OAuth />

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

                        {/*modal to type email verification code*/}
                        <ReactNativeModal
                            isVisible={verification.state === "pending"}
                            onModalHide={() => {
                                if (verification.state === "success") {
                                    setShowSuccessModal(true);
                                }
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <Text style={styles.headerText}>
                                    Verification
                                </Text>
                                <Text style={styles.bodyText}>
                                    We've sent a verification code to {form.email}.
                                </Text>
                                <InputField
                                    label={"Code"}
                                    icon={icons.lock}
                                    placeholder={"12345"}
                                    value={verification.code}
                                    keyboardType="numeric"
                                    onChangeText={(code) =>
                                        setVerification({ ...verification, code })
                                    }
                                />
                                {verification.error && (
                                    <Text style={styles.errorText}>
                                        {verification.error}
                                    </Text>
                                )}
                                <CustomButton
                                    title="Verify Email"
                                    onPress={onPressVerify}
                                    className="mt-5 bg-green-500"
                                />
                            </View>
                        </ReactNativeModal>

                        {/*success modal*/}
                        <ReactNativeModal
                            isVisible={showSuccessModal}
                        >
                                <View style={styles.container}>
                                <Image
                                    source={require("@/assets/images/checked.png")}
                                    style={styles.image}
                                />
                                    <Text style={styles.title}>
                                    Verified
                                </Text>
                                    <Text style={styles.message}>
                                    You have successfully verified your account.
                                </Text>
                                <CustomButton
                                    title="Login"
                                    onPress={() => {
                                        setShowSuccessModal(false); // Set the modal visibility to false
                                        router.push("/(routes)/login"); // Navigate to the home screen
                                    }}
                                    className="mt-5"
                                />
                            </View>
                        </ReactNativeModal>
                    </View>
                </ScrollView>
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
    modalContainer: {
        backgroundColor: 'white',
        paddingHorizontal: 28, // px-7 (7 * 4)
        paddingVertical: 36, // py-9 (9 * 4)
        borderRadius: 20, // rounded-2xl
        minHeight: 300, // min-h-[300px]
    },
    headerText: {
        fontFamily: 'JakartaExtraBold', // font-JakartaExtraBold
        fontSize: 24, // text-2xl
        marginBottom: 8, // mb-2 (2 * 4)
    },
    bodyText: {
        fontFamily: 'Jakarta', // font-Jakarta
        marginBottom: 20, // mb-5 (5 * 4)
    },
    errorText: {
        color: '#EF4444', // text-red-500
        fontSize: 12, // text-sm
        marginTop: 4, // mt-1 (1 * 4)
    },
    verifyButton: {
        marginTop: 20, // mt-5 (5 * 4)
        backgroundColor: '#22C55E', // bg-success-500
    },
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 28, // px-7
        paddingVertical: 36, // py-9
        borderRadius: 16, // rounded-2xl
        minHeight: 300, // min-h-[300px]
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    image: {
        width: 110,
        height: 110,
        marginVertical: 20, // my-5
        alignSelf: 'center',
    },
    title: {
        fontSize: 24, // text-3xl
        fontFamily: 'JakartaBold',
        textAlign: 'center',
    },
    message: {
        fontSize: 16, // text-base
        color: '#9E9E9E', // text-gray-400
        fontFamily: 'Jakarta',
        textAlign: 'center',
        marginTop: 8, // mt-2
    },
});