import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
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

export default function OnboardingScreen() {
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
   colors={["#FEFFCC", "#FEFFCC"]}
   style={{flex:1, alignItems:"center", justifyContent:"center"}}
   >
      <SafeAreaView style={styles.firstContainer}>
        <View>
          <Image
            source={require('@/assets/images/ParkEase_logo.png')}
            style={[styles.logo, styles.shadowProp]}
          />
          <View style={styles.dscpWrapper}>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            Your gateway to
          </Text>
          <Text style={[styles.dscpText, { fontFamily: "Nunito_400Regular" }]}>
            hassle-free parking
          </Text>
        </View>
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => router.push("/(routes)/welcome-intro")}
        >
          <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
            Get Started
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
   </LinearGradient>  
  )
}

// styles
export const styles = StyleSheet.create({
  firstContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: wp("65%"),
    height: hp("30%"),
  },
  shadowProp: {
    shadowColor: '#ffff00',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titleText:{
    fontSize: hp("4%"),
    textAlign: "center",
  },
  dscpWrapper: {
    marginTop: 30,
  },
  dscpText: {
    textAlign: "center",
    color: "#363636",
    fontSize: hp("3%"),
  },
  buttonWrapper: {
    backgroundColor: "#03396c",
    width: wp("92%"),
    paddingVertical: 18,
    borderRadius: 8,
    marginTop: 80,

  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: hp("2.5%"),
  },
  welcomeButtonStyle:{
    backgroundColor: "#2467EC",
    width: responsiveWidth(88),
    height: responsiveHeight(5.5),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  }
});