import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Image, Modal, FlatList } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import colors from '../../constants/Colors';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_KEY } from '../../config';

export default function WalletScreen({ walletAmount: initialAmount = 100 }) {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [walletAmount, setWalletAmount] = useState(initialAmount);
  const [topUpHistory, setTopUpHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);


function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}/${month}/${day}`;
}
  
  const fetchWalletBalance = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/driver/getWalletBalance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      setWalletAmount(Number(data.data?.available_amount) || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopUpHistory = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/driver/topup-history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      const data = await response.json();
      setTopUpHistory(data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const openTopUpHistoryModal = async () => {
    await fetchTopUpHistory(); // Fetch history when modal opens
    setIsModalVisible(true); // Show modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close modal
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  console.log(topUpHistory)

  return (
    <LinearGradient colors={["#FFD981", "#D1D2D5"]} style={styles.gradientBackground}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My PayPark Wallet</Text>
      </View>

      <SafeAreaView style={styles.container}>
        {/* Header */}

        {/* Information Section */}
        <Text style={[styles.infoText, { fontFamily: "Nunito_500Regular" }]}>
          PayPark Wallet is an easy and convenient way to pay for your parking fees. Simply top up your wallet and enjoy a hassle-free parking experience.
        </Text>

        {/* PayPark Image */}
        <Image source={require("../../assets/images/paypark.png")} style={styles.payparkImage} />

        {/* Wallet Balance */}
        <View style={styles.walletWrapper}>
          <Text style={[styles.walletAmount, { fontFamily: "Nunito_700Bold" }]}>
            Rs. {walletAmount?.toFixed(2)}/=
          </Text>
          <Text style={[styles.walletLabel, { fontFamily: "Nunito_400Regular" }]}>
            Available Balance
          </Text>
        </View>

        {/* Top Up Button */}
        <TouchableOpacity style={styles.topUpButton} onPress={() => router.push("/")}>
          <LinearGradient colors={["#1A2131", "#1A2131"]} style={styles.topUpButtonGradient}>
            <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
              Top Up Now
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.topUpButton2} onPress={openTopUpHistoryModal}>
          <LinearGradient colors={["#FFB403", "#FFB403"]} style={styles.topUpButtonGradient2}>
            <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
              View Top Up History
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Modal for Top Up History */}
        <Modal visible={isModalVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Top Up History</Text>
          <FlatList
            data={topUpHistory}
            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>
                  Rs. {item?.amount}
                </Text>
                <Text style={styles.historyText}>
                  {formatDate(item?.date)} at {item?.time}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>


        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { fontFamily: "Nunito_400Regular" }]}>
            Accepted payment methods:
          </Text>
          {/* Payment Icons */}
          <View style={styles.paymentIcons}>
            <Image source={require("../../assets/images/visa.png")} style={styles.icon} />
            <Image source={require("../../assets/images/amex.png")} style={styles.icon} />
            <Image source={require("../../assets/images/mastercard.png")} style={styles.icon} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
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
    marginBottom: 3, // Reduced margin to accommodate the image
    paddingHorizontal: 20,
    lineHeight: 24,
    fontWeight: "600",
  },
  payparkImage: {
    width: wp("40%"),
    height: hp("20%"),
    resizeMode: "contain",
    marginBottom: 3, // Added space after the image
  },
  walletWrapper: {
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
    marginBottom: 40,
  },
  walletAmount: {
    fontSize: hp("4%"),
    color: "#1E2952",
    marginBottom: 10,
  },
  walletLabel: {
    fontSize: hp("2.5%"),
    color: "#6b6b6b",
  },
  topUpButton: {
    width: wp("75%"),
    marginBottom: 10,
  },
  topUpButton2: {
    width: wp("75%"),
    marginBottom: 10,
  },
  headerContainer: {
    backgroundColor: colors.primary,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 30,
  },
  title: {
    marginTop: 50,
    fontFamily: "Nunito_700Bold",
    fontSize: 24,
    color: 'white',
  },
  topUpButtonGradient: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  topUpButtonGradient2: {
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  
  
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6b6b6b",
  },
  paymentIcons: {
    flexDirection: "row",
    marginTop: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: "#1E2952",
    marginBottom: 20,
    textAlign: "center",
  },
  historyItem: {
    width: "100%",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  historyText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Nunito_400Regular",
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: "#FFB403",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Nunito_700Bold",
  },
});
