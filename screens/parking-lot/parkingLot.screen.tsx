import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import React, { useEffect, useRef, useState } from 'react';
import StarRating from '@/components/rating/StarRating';
import AutoScroller from '@/components/ScrollView/AutoScroller';

export default function parkingLotScreen() {
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_400Regular,
        Nunito_700Bold
    })

    if (!fontsLoaded && !fontError) {
        return null;
    }
    // function to format date
    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    interface review {
        name: string;
        rating: number;
        text: string;
        date: Date;
    }
    // hard coded data for reviews
    let reviews: review[] = [
        {
            name: "Saman Rathnayake",
            rating: 2,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
            date: new Date('2024-07-20'),

        },
        {
            name: "Chethiya Wanigarathne",
            rating: 3,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
            date: new Date('2024-04-12'),

        },
        {
            name: "Inuka Weerasekara",
            rating: 4,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
            date: new Date('2024-04-12'),

        },
        {
            name: "Nipul Vithanage",
            rating: 5,
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
            date: new Date('2024-04-12'),

        },
    ]
    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light ]}
            style={{flex:1}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.topContainer}>
                        {/*<ScrollView horizontal style={styles.imageScrollView}>*/}
                        {/*    <View style={styles.imageContainer}>*/}
                        {/*        <Image*/}
                        {/*            style={styles.parkingLotImage}*/}
                        {/*            source={require("@/assets/ParkingLots/nugegodaSM_1.jpg")}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.imageContainer}>*/}
                        {/*        <Image*/}
                        {/*            style={styles.parkingLotImage}*/}
                        {/*            source={require("@/assets/ParkingLots/nugegodaSM_2.jpg")}*/}
                        {/*        />*/}
                        {/*    </View>*/}
                        {/*</ScrollView>*/}
                    <AutoScroller/>
                    <View style={styles.status}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 12, color: "red"}}>Closed</Text>
                    </View>
                    <View style={styles.name}>
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 25}}>Nugegoda Super Market</Text>
                    </View>
                    <View style={styles.des}>
                        <Text style={{fontFamily: "Nunito_400Regular", fontSize: 14, textAlign: "center"}}>
                            A large urban vehicle park managed by Nugegoda Super Market
                        </Text>
                    </View>
                </View>
                <View style={styles.MidContainer}>
                    <View style={styles.capacities}>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/bicycle_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/bike_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/bus_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                    </View>
                    <View style={styles.capacities}>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/car_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/lorry_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                        <View style={styles.cap}>
                            <Image
                                style={styles.vehicleIcon}
                                source={require("@/assets/images/tuktuk_side.png")}
                            />
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "green"}}> : 200</Text>
                            <Text style={{fontFamily: "Raleway_700Bold", fontSize: 18, color: "black"}}>/250</Text>
                        </View>
                    </View>
                    <ScrollView style={styles.reviewsScrollView}>
                        {reviews.map((review, index) => (
                            <View key={index} style={styles.review}>
                                <View style={styles.header}>
                                    <Text style={{ fontFamily: "Nunito_700Bold" }}>{review.name}</Text>
                                    <Text style={{ fontFamily: "Raleway_700Bold" }}>{formatDate(review.date)}</Text>
                                </View>
                                <View style={styles.body}>
                                    <Text style={{ fontFamily: "Nunito_400Regular", marginBottom: 5}}>{review.text}</Text>
                                    <StarRating rating={review.rating} />
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.BottomContainer}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{backgroundColor: colors.secondary, padding:5, borderRadius: 5}}
                    >
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14}}>Back to Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // onPress={() => router.back()}
                        style={{backgroundColor: colors.primary, padding:5, borderRadius: 5}}
                    >
                        <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14, color: colors.white}}>Navigate</Text>
                    </TouchableOpacity>
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
        justifyContent: "flex-start",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 30,
    },
    topContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: wp("100%"),
        height: wp("100%"),
        position: "absolute",
        top: 55,
    },
    status: {

    },
    name: {

    },
    des: {
    },
    MidContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",

        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.primary,

        marginTop: 430,
        gap: 10
    },
    capacities: {
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.primary,

        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: wp("100%"),
    },
    cap: {
        display: "flex",
        flexDirection: "row",
        maxWidth: "auto",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("1%"),

        // borderRightWidth: 1,
        // borderRightColor: "gray",

    },
    vehicleIcon: {
        width: 40,
        height: 40
    },
    reviewsScrollView: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.primary,
        padding: 10,
        height: 250,
        backgroundColor: colors.primary_light,
        margin: 2,
        borderRadius: 5,
    },
    review: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: colors.primary,
        marginBottom: 8,
        padding: 5,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 5,
        marginLeft: 8
    },
    body: {
        paddingHorizontal: 10,
    },
    BottomContainer: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        bottom: 40,
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.primary,
        width: wp("100%"),
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: wp("15%"),
    },
});