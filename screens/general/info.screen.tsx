import {View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from "react";

interface ListItem {
    id: string;
    main: string;
    sub: string;
}

export default function InfoScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    const data: ListItem[] = [
        { id: '1', main: 'Choose parking', sub: 'Real-time data and insights on parking availability all around you.' },
        { id: '2', main: 'Easy payments', sub: 'Secure and transparent payment options for a fraud-free parking experience.' },
        { id: '3', main: 'Stellar experience', sub: 'Seamless integration of QR codes for easy access and payment.' },
    ];
    const renderItem = ({ item }: { item: ListItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.boldText}>{item.id}.</Text>
            <View style={styles.bodyContainer}>
                <Text style={styles.boldText}>{item.main}</Text>
                <Text style={styles.text}>{item.sub}</Text>
            </View>
        </View>
    );

    return (
        <LinearGradient
            colors={[colors.white, colors.white]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <ScrollView style={styles.scrollView}>
                    {/*section 1*/}
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 23,}}>Find, pay, and park with ease</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Discover the future of parking with ParkEase, where convenience meets technology. Say goodbye to the hassle of searching for parking spots and dealing with outdated payment methods.
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*section 2*/}
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 23,}}>About Us</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Maximize earnings and simplify operations.
                                    Our cutting-edge technology provides real-time data, efficient management tools, and user-friendly interfaces that make parking management effortless.
                                    Our innovative system is designed to streamline your parking experience with a host of user-friendly features:

                                    ParkEase shows you available parking spots based on your location, helping you find the perfect spot quickly and easily.
                                    Enjoy peace of mind with our secure payment system, making parking transactions hassle-free and safe.
                                    Earn ParkPoints for every successful parking transaction and redeem them for various benefits and discounts within our system.
                                    Our intuitive mobile application makes it easy to navigate and use all the features ParkEase has to offer.

                                    ParkEase is committed to making urban parking stress-free and efficient.
                                    Join us today and transform the way you park!
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*section 3*/}
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 23,}}>How it works</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    With ParkEase, the entire process from locating a parking spot to finalizing payments is streamlined, making parking stress-free for both drivers and parking wardens involved.
                                </Text>
                                <FlatList
                                    data={data}
                                    renderItem={renderItem}
                                    keyExtractor={(item) => item.id}
                                    contentContainerStyle={styles.listContainer}
                                />
                            </View>
                        </View>
                    </View>
                    {/*section 4*/}
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 23,}}>ParkPoints: Earn Rewards with Every Parking</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>
                                    Every successful parking transaction you complete through our mobile application earns you ParkPoints.
                                    Start earning today and enjoy exclusive perks designed to make your parking experience better than ever.
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/*section 5*/}
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 23,}}>ParkEase Parking Management System Terms and Conditions</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textContainer}>
                                <Text style={styles.boldText}>
                                    Acceptance of Terms
                                </Text>
                                <Text style={styles.text}>
                                    By using the ParkEase as an Urban Parking Management System, you agree to comply with and be bound by the following terms and conditions.
                                    {'\n'}{'\n'}
                                    Users must create an account to access certain features of ParkEase. You are responsible for maintaining the confidentiality of your account information and password.
                                    {'\n'}{'\n'}
                                    You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                                    {'\n'}{'\n'}
                                    ParkEase provides real-time information on parking availability through our Web and Mobile Applications.
                                    All parking transactions are subject to availability and may be cancelled or modified at the discretion of ParkEase.
                                    {'\n'}{'\n'}
                                    Users are required to pay for parking transactions through the ParkEase mobile application. All payments are secure and processed through our designated payment gateway.
                                    {'\n'}{'\n'}
                                    ParkEase reserves the right to change fees or introduce new fees at any time, well within the determined standards and the users will be provided with notice.
                                    {'\n'}{'\n'}
                                    Users earn ParkPoints for every successful parking transaction completed through the ParkEase mobile application.
                                    {'\n'}{'\n'}
                                    ParkPoints can be accumulated and redeemed for various benefits and discounts within the ParkEase system.
                                    {'\n'}{'\n'}
                                    ParkPoints have no cash value and cannot be exchanged for cash. ParkEase reserves the right to modify or terminate the ParkPoints Rewards Program at any time.
                                    {'\n'}{'\n'}
                                    Users agree to use ParkEase for lawful purposes only and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use of the system.
                                    {'\n'}{'\n'}
                                    Users are prohibited from using ParkEase to engage in any fraudulent, abusive, or otherwise illegal activity.
                                    {'\n'}{'\n'}
                                    ParkEase provides the parking management system on an "as is" and "as available" basis. We do not guarantee that the service will be uninterrupted or error-free.
                                    {'\n'}{'\n'}
                                    ParkEase is not liable for any loss or damage arising from the use of the system, including but not limited to loss of data, profit, or business interruption.
                                    {'\n'}{'\n'}
                                    ParkEase reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website.
                                    Your continued use of ParkEase after any modifications to the terms indicates your acceptance of the new terms.
                                    {'\n'}{'\n'}
                                    ParkEase may terminate or suspend your account and access to the system at any time, without notice and for any reason, including but not limited to breach of these terms and conditions.
                                    {'\n'}{'\n'}
                                    It is important that you agree to accept our terms and conditions if you wish to proceed to start using the services delivered by ParkEase.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
    },
    scrollView: {
        // borderStyle: "solid",
        // borderWidth: 1,
    },
    section: {
        // borderStyle: "solid",
        // borderWidth: 1,
        padding: 10,
        width: "100%",
    },
    header: {
        // borderStyle: "solid",
        // borderWidth: 1,
    },
    body: {
        // borderStyle: "solid",
        // borderWidth: 1,
        display: "flex",
        flexDirection: "row",
    },
    textContainer: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: "100%",
    },
    text: {
        fontFamily: "Nunito_400Regular",
        fontSize: 15,
        textAlign: "justify"
    },
    listContainer: {
        padding: 20,
    },
    itemContainer: {
        // borderStyle: "solid",
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 5,
    },
    itemNumber: {
        marginRight: 10,
        fontWeight: 'bold',
    },
    bodyContainer: {
        // borderStyle: "solid",
        // borderWidth: 1,
        display: "flex",
        flexDirection: "column",
    },
    boldText: {
        fontFamily: "Nunito_700Bold",
        fontSize: 16,
        textAlign: "justify"
    },

})
