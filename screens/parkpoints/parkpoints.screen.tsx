import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_KEY } from '../../config';

export default function ParkPointsScreen({ parkPoints: initialPoints = 1000 }) {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [parkPoints, setParkPoints] = useState(initialPoints);

  const fetchParkPoints = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/driver/getParkPoints`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      setParkPoints(Number(data.data?.no_of_points) || 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchParkPoints();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#FFD981", "#D1D2D5"]}
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
          My ParkPoints
        </Text>

        {/* Information Section */}
        <Text style={[styles.infoText, { fontFamily: "Nunito_500Regular" }]}>
          Earn ParkPoints as you pay for parking and redeem them and pay your parking fees.
        </Text>

        {/* PayPark Image */}
        <Image source={require("../../assets/images/parkpoints.png")} style={styles.payparkImage} />

        {/* ParkPoints Balance */}
        <View style={styles.pointsWrapper}>
          <Text style={[styles.pointsAmount, { fontFamily: "Nunito_700Bold" }]}>
            {parkPoints?.toFixed(0)} Points
          </Text>
          <Text style={[styles.pointsLabel, { fontFamily: "Nunito_400Regular" }]}>
            Available ParkPoints
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { fontFamily: "Nunito_700Bold" }]}>
            Earn ParkPoints for every parking session!
          </Text>
          <Text style={[styles.footerText2, { fontFamily: "Nunito_400Regular" }]}>
            Earn 5 ParkPoints for every parking session.
          </Text>
          <Text style={[styles.footerText2, { fontFamily: "Nunito_400Regular" }]}>
           When you spend 1 Point = Rs. 1/=
          </Text>
        </View>

        {/* Redeem Points Button */}
        {/* <TouchableOpacity
          style={styles.redeemButton}
          onPress={() => router.push("/")}
        >
          <LinearGradient
            colors={["#1A2131", "#1A2131"]}
            style={styles.redeemButtonGradient}
          >
            <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
              Redeem Points
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => router.push("/")}
        >
          <LinearGradient
            colors={["#1A2131", "#1A2131"]}
            style={styles.historyButtonGradient}
          >
            <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
              View Points History
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        
      </SafeAreaView>
    </LinearGradient>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  titleText: {
    fontSize: hp("4%"),
    color: "#1A2131",
    marginBottom: 20,
    textAlign: "center",
  },
  infoText: {
    fontSize: hp("2%"),
    color: "#6b6b6b",
    textAlign: "center",
    marginBottom: 3,
    paddingHorizontal: 20,
    lineHeight: 24,
    fontWeight: "600",
  },
  payparkImage: {
    width: wp("40%"),
    height: hp("20%"),
    resizeMode: "contain",
    marginBottom: 3,
  },
  pointsWrapper: {
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 20,
    width: wp("80%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 10,
  },
  pointsAmount: {
    fontSize: hp("4%"),
    color: "#1E2952",
    marginBottom: 10,
  },
  pointsLabel: {
    fontSize: hp("2.5%"),
    color: "#6b6b6b",
  },
  redeemButton: {
    width: wp("75%"),
    marginBottom: 10,
  },
  historyButton: {
    width: wp("75%"),
    marginBottom: 0,
  },
  redeemButtonGradient: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  historyButtonGradient: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: hp("2.5%"),
    color: "#FFF",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    marginBottom: 30,
  },
  footerText: {
    fontSize: hp("2.5%"),
    color: "#6b6b6b",
  },
  footerText2: {
    fontSize: hp("2%"),
    color: "#6b6b6b",
  },
});
