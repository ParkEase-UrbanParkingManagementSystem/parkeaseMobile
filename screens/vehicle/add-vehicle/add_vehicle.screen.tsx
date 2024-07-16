import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Button,
    TextInput,
    ActivityIndicator, ScrollView
} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../../constants/Colors'
import {AntDesign, Entypo, FontAwesome, Fontisto, Ionicons, SimpleLineIcons} from "@expo/vector-icons";
import {useState} from "react";

export default function AddVehicleScreen() {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [buttonSpinner, setButtonSpinner] = useState(false);
    const [required, setRequired] = useState("");
    const [error, setError] = useState({
        password: "",
    });
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
            colors={[colors.primary_light, colors.white]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <ScrollView>
                    <Image
                        style={styles.signInImage}
                        source={require("@/assets/sign-in/signin.webp")}
                    />
                    <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
                        ParkEase your vehicle
                    </Text>
                    <Text style={styles.learningText}>
                        Register your vehicle with ParkEase
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

                                <TouchableOpacity
                                    style={{
                                        padding: 16,
                                        borderRadius: 8,
                                        marginHorizontal: 16,
                                        backgroundColor: colors.primary,
                                        marginTop: 15,
                                    }}
                                    // onPress={handleSignUp}
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
                <View style={styles.buttonContainer}>
                    <Button title="Go Back"
                            color={colors.primary_light}
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
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
});