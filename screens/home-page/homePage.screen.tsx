import {View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Button, ScrollView} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors'
import {responsiveWidth} from "react-native-responsive-dimensions";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import IOSMap from "@/components/Map/IOSMap";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ParkingLotSearchModal from "@/components/Modal/ParkingLotSearchModal"
import React, {useEffect, useState} from "react";
import {Marker} from "react-native-maps";

export default function HomePageScreen() {
    // let [fontsLoaded, fontError] = useFonts({
    //     Raleway_700Bold,
    //     Nunito_400Regular,
    //     Nunito_700Bold
    // })
    //
    // if (!fontsLoaded && !fontError) {
    //     return null;
    // }
    let plateNo = "CAQ-1628";

    const [userDetails, setUserDetails] = useState<any>(null);
    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = await AsyncStorage.getItem("token");
            try {
                const response = await fetch(`http://localhost:5001/driver/details`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token || ""
                    }
                });

                const parseRes = await response.json();

                if (response.ok) {
                    setUserDetails(parseRes.data);
                } else {
                    console.error("Can't get the details");
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <LinearGradient
            colors={[colors.primary, colors.primary]}
            style={{flex:1, alignItems: "center", justifyContent: "center"}}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.home_page_top}>
                        <View style={styles.searchBarContainer}>
                            <ParkingLotSearchModal/>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => router.push("/(routes)/profile")}>
                                <Image
                                    source={require('@/assets/images/driver_profile.png')}
                                    style={[styles.icon, {marginRight: 20}]}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => router.push("/(routes)/notifications")}>
                                <Image
                                    source={require('@/assets/images/notification.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                </View>
                <View style={styles.home_page_mid}>
                    <View style={styles.title}>
                        <Text style={{color: colors.secondary_light, fontFamily: "Nunito_700Bold", fontSize: 20, marginLeft: 10}}>
                            Hi, {userDetails?.driver?.fname}
                        </Text>
                        <Text style={{color: colors.secondary_light, fontFamily: "Nunito_700Bold", fontSize: 25, marginLeft: 10}}>
                            Locate Parking Lots Near you
                        </Text>
                    </View>
                    <View style={styles.mapContainer}>
                        <IOSMap/>
                        <TouchableOpacity
                            onPress={() => router.push("/(routes)/QR")}
                            style={styles.currentVehicle}
                        >
                            <View style={styles.QRContainer}>
                                <Image
                                    source={require('@/assets/images/QR_icon.png')}
                                    style={[styles.icon, {marginRight: 20}]}
                                />
                            </View>
                            <View style={styles.plateNoContainer}>
                                <Text style={styles.plateNo}>
                                    {plateNo}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <Text style={{color: colors.secondary_light, fontFamily: "Nunito_700Bold", fontSize: 20, marginLeft: 10}}>
                        Recently visited
                    </Text>
                </View>
                <View style={styles.home_page_bottom}>
                    <View style={styles.ScrollViewContainer}>
                      <ScrollView horizontal>
                        <TouchableOpacity
                            style={styles.parkingLotContainer}
                            onPress={() => router.push("/(routes)/parking-lot")}
                        >
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={require("@/assets/ParkingLots/nugegodaSM_1.jpg")}
                                />
                                <Text style={[styles.status, { color: "red" }]}>
                                    Closed
                                </Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text
                                    style={{fontFamily: "Nunito_700Bold", fontSize: 15, flexShrink: 1,}}
                                >
                                    Nugegoda Super Market
                                </Text>
                                <Text
                                    style={{fontFamily: "Nunito_700Bold", fontSize: 15}}
                                >
                                    5.3 Km</Text>
                                <View style={styles.capacity}>
                                    <Image
                                        style={styles.vehicleIcon}
                                        source={require("@/assets/images/suv_side.png")}
                                    />
                                    <Text>: 500</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.navigateButton}
                                    // onPress={() => router.push("/(routes)/")}
                                >
                                    <Text>Navigate</Text>

                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.parkingLotContainer}
                              onPress={() => router.push("/(routes)/parking-lot")}
                          >
                              <View style={styles.imageContainer}>
                                  <Image
                                      style={styles.image}
                                      source={require("@/assets/ParkingLots/GallFace.jpg")}
                                  />
                                  <Text style={styles.status}>
                                      Open
                                  </Text>
                              </View>
                              <View style={styles.detailsContainer}>
                                  <Text
                                      style={{fontFamily: "Nunito_700Bold", fontSize: 15, flexShrink: 1,}}
                                  >
                                      Galle Face
                                  </Text>
                                  <Text
                                      style={{fontFamily: "Nunito_700Bold", fontSize: 15}}
                                  >
                                      10.3 Km</Text>
                                  <View style={styles.capacity}>
                                      <Image
                                          style={styles.vehicleIcon}
                                          source={require("@/assets/images/suv_side.png")}
                                      />
                                      <Text>: 1500</Text>
                                  </View>
                                  <TouchableOpacity
                                      style={styles.navigateButton}
                                      // onPress={() => router.push("/(routes)/")}
                                  >
                                      <Text>Navigate</Text>

                                  </TouchableOpacity>
                              </View>
                          </TouchableOpacity>
                          <TouchableOpacity
                              style={styles.parkingLotContainer}
                              onPress={() => router.push("/(routes)/parking-lot")}
                          >
                              <View style={styles.imageContainer}>
                                  <Image
                                      style={styles.image}
                                      source={require("@/assets/ParkingLots/RaceCourse.jpg")}
                                  />
                                  <Text style={[styles.status, { color: "red" }]}>
                                      Closed
                                  </Text>
                              </View>
                              <View style={styles.detailsContainer}>
                                  <Text
                                      style={{fontFamily: "Nunito_700Bold", fontSize: 15, flexShrink: 1,}}
                                  >
                                      Race Course Colombo
                                  </Text>
                                  <Text
                                      style={{fontFamily: "Nunito_700Bold", fontSize: 15}}
                                  >
                                      10.3 Km</Text>
                                  <View style={styles.capacity}>
                                      <Image
                                          style={styles.vehicleIcon}
                                          source={require("@/assets/images/suv_side.png")}
                                      />
                                      <Text>: 1500</Text>
                                  </View>
                                  <TouchableOpacity
                                      style={styles.navigateButton}
                                      // onPress={() => router.push("/(routes)/")}
                                  >
                                      <Text>Navigate</Text>

                                  </TouchableOpacity>
                              </View>
                          </TouchableOpacity>
                      </ScrollView>
                    </View>
                    <View style={styles.navBar}>

                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

// styles
export const styles = StyleSheet.create({
    firstContainer: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
    },
    home_page_top: {
        display: "flex",
        flexDirection: "row",
        width: wp("95%"),
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,
        padding: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,

    },
    searchBarContainer: {
        width: wp("60%"),
        marginRight: 10
    },
    home_page_mid: {
        // flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,
        width: wp("100%"),
        height: hp("61%"),
        position: "relative",
    },
    title: {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,

    },
    iconContainer: {

    },
    icon: {
        width: wp("9%"),
        height: hp("4%"),
    },
    mapContainer: {
        width: wp("96%"),
        height: hp("52%"),
        margin: 10,
        position: "relative",
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.white,
    },
    currentVehicle: {
        display: "flex",
        flexDirection: "row",
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: colors.white,
        padding: 10,
        bottom: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
        backgroundColor: colors.secondary,
        opacity: 0.8,
        borderRadius: 10,
        position: "absolute",

    },
    QRContainer : {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.primary,
        width: 40
    },
    plateNoContainer: {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.primary,
    },
    plateNo: {
        fontFamily: "Nunito_700Bold",
        fontSize: 20,
    },
    home_page_bottom: {
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.secondary_light,
        // margin: 5,
        width: wp("100%"),
        marginLeft: "auto",
        marginRight: "auto",
        padding: 5,
    },
    ScrollViewContainer: {
        display: "flex",
        flexDirection: "column",
    },
    parkingLotContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: colors.secondary_light,
        gap: 5,
        width: 230,
        borderRadius: 10,
        marginHorizontal: 5
    },
    imageContainer: {
        display: "flex",
        flexDirection: "column",
        padding: 5,
        width: "45%"
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    status: {
        color: "green",
        fontFamily: "Nunito_700Bold",
        textAlign: "center"
    },
    detailsContainer: {
        margin: 2,
        padding: 2,
        flex: 1,
        flexShrink: 1,
        // borderStyle: "solid",
        // borderWidth: 0.5,
        // borderColor: colors.primary,
        position: "relative",
    },
    capacity: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 5
    },
    vehicleIcon: {
        width: 25,
        height: 25
    },
    navigateButton: {
        position: "absolute",
        bottom: 5,
        right: 5,
        padding: 3,
        width: 80,
        alignItems: "center",
        backgroundColor: colors.primary_light,
        borderRadius: 5,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "blue",
    },
    navBar: {

    },


});