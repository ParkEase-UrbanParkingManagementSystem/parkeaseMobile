import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import colors from '../../constants/Colors'
import React from "react";
import InfoList from '@/components/FlatList/InfoList'

interface ListItem {
  id: string;
  main: string;
  sub: string;
}

const InfoScreen = () => {
  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const data: ListItem[] = [
    { id: '1', main: 'Choose parking', sub: 'Real-time data and insights on parking availability all around you.' },
    { id: '2', main: 'Easy payments', sub: 'Secure and transparent payment options for a fraud-free parking experience.' },
    { id: '3', main: 'Stellar experience', sub: 'Seamless integration of QR codes for easy access and payment.' },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 23 }}>
          {item.title}
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.content}</Text>
        </View>
      </View>
    </View>
  );

  const sections = [
    {
      title: 'Find, pay, and park with ease',
      content:
        'Discover the future of parking with ParkEase, where convenience meets technology. Say goodbye to the hassle of searching for parking spots and dealing with outdated payment methods.',
    },
    {
      title: 'About Us',
      content:
        'Maximize earnings and simplify operations. Our cutting-edge technology provides real-time data, efficient management tools, and user-friendly interfaces that make parking management effortless...',
    },
    {
      title: 'How it works',
      content:
        'With ParkEase, the entire process from locating a parking spot to finalizing payments is streamlined, making parking stress-free for both drivers and parking wardens involved.',
    },
    {
      title: 'ParkPoints: Earn Rewards with Every Parking',
      content:
        'Every successful parking transaction you complete through our mobile application earns you ParkPoints. Start earning today and enjoy exclusive perks designed to make your parking experience better than ever.',
    },
    {
      title: 'ParkEase Parking Management System Terms and Conditions',
      content:
        'Acceptance of Terms: By using the ParkEase as an Urban Parking Management System, you agree to comply with and be bound by the following terms and conditions...',
    },
  ];

  return (
    <LinearGradient colors={[colors.white, colors.white]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.firstContainer}>
      <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 23, textAlign: 'center', marginTop:18, marginBottom:20 }}>
    Privacy & Policy
</Text>
        <FlatList
          data={sections}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.section}>
              <View style={styles.header}>
                <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 23 }}>
                  Find, pay, and park with ease
                </Text>
              </View>
              <View style={styles.body}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>
                    Discover the future of parking with ParkEase, where
                    convenience meets technology. Say goodbye to the hassle of
                    searching for parking spots and dealing with outdated payment
                    methods.
                  </Text>
                </View>
              </View>
            </View>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginBottom: 30,
    },
    header: {
        marginBottom: 12,
    },
    headerText: {
        fontFamily: "Nunito_700Bold",
        fontSize: 26,
        color: colors.primary,
        textAlign: "left",
        lineHeight: 32,
    },
    body: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 10,
    },
    textContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    text: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        color: colors.textSecondary,
        textAlign: "justify",
        lineHeight: 24,
    },
    boldText: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 17,
        color: colors.primary,
        marginBottom: 15,
    },
    sectionTitle: {
        fontFamily: "Nunito_700Bold",
        fontSize: 24,
        color: colors.primary,
        marginBottom: 15,
        letterSpacing: 0.5,
    },
    listItemContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        marginBottom: 10,
    },
    listItemMain: {
        fontFamily: "Raleway_700Bold",
        fontSize: 19,
        color: colors.primary,
        lineHeight: 26,
    },
    listItemSub: {
        fontFamily: "Nunito_400Regular",
        fontSize: 15,
        color: colors.textSecondary,
        marginTop: 6,
        lineHeight: 22,
    },
    footerText: {
        fontFamily: "Nunito_400Regular",
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 20,
        lineHeight: 20,
    },
    sectionSpacing: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: colors.lightGray,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cardHeader: {
        fontFamily: "Nunito_700Bold",
        fontSize: 18,
        color: colors.primary,
        marginBottom: 10,
    },
    cardContent: {
        fontFamily: "Nunito_400Regular",
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
});


export default InfoScreen;
