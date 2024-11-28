import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Raleway_700Bold, Raleway_600SemiBold } from "@expo-google-fonts/raleway";
import { Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../../../constants/Colors";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import OAuth from "@/components/OAuth";
import { EXPO_PUBLIC_API_KEY } from '../../../config';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  let [fontsLoaded] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSignIn = async (email: string, password: string) => {
    try {
      setButtonSpinner(true);
      const body = { email, password };
      console.log("Sending request with body:", body);

      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log("Response:", parseRes);

      if (parseRes.token) {
        console.log("Received token:", parseRes.token);
        await AsyncStorage.setItem("token", parseRes.token);

        const role_id = parseRes.role_id;
        console.log("Role ID:", role_id);

        if (role_id === 1) {
          router.push("/(routes)/home-page");
        } else {
          Alert.alert("Login successful", "But unknown role");
        }
      } else {
        Alert.alert("Login failed", "Please check your credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      Alert.alert("Error", "An error occurred during login.");
    } finally {
      setButtonSpinner(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.secondary_light, colors.primary]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Image
            style={styles.signInImage}
            source={require("@/assets/sign-in/signin.webp")}
            resizeMode="contain"
          />
          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.learningText}>
              Login to your existing account of ParkEase
            </Text>
            <View style={styles.inputContainer}>
              <InputField
                label="Email"
                placeholder="Enter email"
                placeholderTextColor="#A1A1A1"
                icon={icons.email}
                textContentType="emailAddress"
                value={form.email}
                autoCapitalize="none"
                onChangeText={(value) => setForm({ ...form, email: value })}
              />
              <View>
                <InputField
                  label="Password"
                  placeholder="Enter password"
                  placeholderTextColor="#A1A1A1"
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
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={23}
                    color="#747474"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => router.push("/(routes)/forgot-password")}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSignIn(form.email, form.password)}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>
              <OAuth />
              <View style={styles.signupRedirect}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push("/(routes)/sign-up")}>
                  <Text style={styles.signupLink}>Sign Up</Text>
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
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  signInImage: {
    width: width * 0.6,
    height: width * 0.5,
    alignSelf: "center",
   
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: "Raleway_700Bold",
    color: colors.primary,
    marginBottom: 5,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Nunito_600SemiBold",
  },
  inputContainer: {
    rowGap: 20,
  },
  visibleIcon: {
    position: "absolute",
    right: 15,
    top: 45,
  },
  forgotPassword: {
    textAlign: "right",
    fontSize: 16,
    color: colors.primary,
    fontFamily: "Nunito_600SemiBold",
  },
  loginButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    marginTop: 2,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Raleway_700Bold",
  },
  signupRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    
  },
  signupText: {
    fontSize: 16,
    fontFamily: "Raleway_600SemiBold",
  },
  signupLink: {
    fontSize: 16,
    fontFamily: "Raleway_600SemiBold",
    color: colors.primary,
    marginLeft: 5,
  },
});

