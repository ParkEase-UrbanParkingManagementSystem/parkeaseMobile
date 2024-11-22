import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Modal, ScrollView } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import IOSMap from "@/components/Map/IOSMap";
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { VehicleContext } from '@/utils/vehicleContext';
import ParkingLotSearchModal from "@/components/Modal/ParkingLotSearchModal";

import {EXPO_PUBLIC_API_KEY} from '../../config';
import ProfileIcon from "../../components/ProfileIcon/ProfileIcon";


import { useAuth } from "@clerk/clerk-expo";


export default function HomePageScreen() {
    const { selectedVehicle } = useContext(VehicleContext);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [recentVisits, setRecentVisits] = useState<any[]>([]);
    const [driverStatus, setDriverStatus] = useState<any>(null);
    
    const plateNo = selectedVehicle?.vehicle_number;
    

    useEffect(() => {
        const fetchRecentVisits = async () => {
            const token = await AsyncStorage.getItem("token");
    
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/get-recent-parking-lots-home`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token || ""
                    }
                });
                
                const parseRes = await response.json();
                console.log(parseRes.data);
    
    
                if (response.ok) {
                    setRecentVisits(parseRes.data);
                    
                } else {
                    console.error("Error fetching recent visits:", parseRes.message);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log("Fetch error:", error.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        };
    
        const fetchUserDetails = async () => {
            const token = await AsyncStorage.getItem("token");
    
            try {
                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/driver/details`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token || ""
                    }
                });
    
                const parseRes = await response.json();
    
                if (response.ok) {
                    setUserDetails(parseRes.data);
                } else {
                    console.error("Error fetching details:", parseRes.message);
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.log("Fetch error:", error.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        };

        const fetchDriverStatus = async () => {
            const token = await AsyncStorage.getItem("token");

            try {
                
                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/get-parking-status`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token || ""
                    }
                });

                const parseRes = await response.json();
                console.log(parseRes);

                if (response.ok) {
                    // console.log("Meka thamai machan",parseRes);
                    setDriverStatus(parseRes.data);
                } else {
                    console.error("Error fetching driver status:", parseRes.message);
                }

            } catch (error) {
                if (error instanceof Error) {
                    console.log("Fetch error:", error.message);
                } else {
                    console.log("An unexpected error occurred");
                }
            }
        }

    
        fetchRecentVisits();  // Call the fetchRecentVisits function
        fetchUserDetails();   // Call the fetchUserDetails function
        fetchDriverStatus();  // Call the fetchDriverStatus function
    }, []);

    const { signOut } = useAuth();
    const handleSignOut = () => {
        signOut();
        router.push("/(routes)/login");
    };
    

    const handleShowQR = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleNavigation = () => {
        if (driverStatus === "parked") {
            router.push("/(routes)/parked");
        } else if (driverStatus === "payment") {
            router.push("/(routes)/payment/wallet");
        }
    };

    return (
        <LinearGradient
            colors={[colors.primary, colors.primary]}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <SafeAreaView style={styles.firstContainer}>
                <View style={styles.home_page_top}>
                    <View style={styles.parkEaseLogoContainer}>
                        {/* Assuming ParkingLotSearchModal is a functional component */}
                        <Image
                                source={require('@/assets/images/Group 177.png')}
                                style={{ width: 190, height: 50, marginLeft: 3 }}
                            />
                    </View>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                            onPress={handleSignOut}
                        >
                            <Image
                                source={require('@/assets/images/notification.png')}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => router.push("/(routes)/profile")}>

                        <ProfileIcon userName={userDetails?.fname} />

                        </TouchableOpacity>
                    </View>
                    
                    
                </View>
                <View style={styles.home_page_mid}>
                    <View style={styles.title}>
                        <Text style={{ color: colors.secondary_light, fontFamily: "Nunito_700Bold", fontSize: 20, marginLeft: 10 }}>
                            Hi, {userDetails?.fname}
                        </Text>
                        <View style={styles.searchBarContainer}>
                            <ParkingLotSearchModal />
                        </View>
                    </View>
                    <View style={styles.mapContainer}>
                        <IOSMap />
                        <TouchableOpacity
                                    onPress={
                                        driverStatus === "available" && !selectedVehicle
                                            ? () => router.push('/(routes)/choose-vehicle')
                                            : driverStatus === "available" && selectedVehicle
                                            ? handleShowQR
                                            : handleNavigation
                                    }
                                    style={styles.currentVehicle}
                                >
                                    {driverStatus === "available" && selectedVehicle ? (
                                        <View style={styles.QRContainer}>
                                            <Image
                                                source={require('@/assets/images/QR_icon.png')}
                                                style={[styles.icon, { marginBottom: 10 }]}
                                            />
                                            <View style={styles.plateNoContainer}>
                                                <Text style={styles.plateNo}>{plateNo}</Text>
                                            </View>
                                        </View>
                                    ) : driverStatus === "available" && !selectedVehicle ? (
                                        <View style={styles.messageContainer}>
                                            <Image
                                                source={require('@/assets/images/vehicle.png')}
                                                style={styles.smallIconCar}
                                            />
                                            <Text style={styles.messageText}>Please select a vehicle</Text>
                                        </View>
                                    ) : driverStatus === "parked" ? (
                                        <View style={styles.messageContainer}>
                                            <Image
                                                source={require('@/assets/images/home.png')}
                                                style={styles.smallIcon}
                                            />
                                            <Text style={styles.messageText}>Go to the parking screen.</Text>
                                        </View>
                                    ) : driverStatus === "payment" ? (
                                        <View style={styles.messageContainer}>
                                            <Image
                                                source={require('@/assets/images/cash.png')}
                                                style={styles.smallIcon}
                                            />
                                            <Text style={styles.messageText}>Go to the payment screen</Text>
                                        </View>
                                    ) : null}
                                </TouchableOpacity>



                    </View>
                </View>
                {/* <TouchableOpacity onPress={() => { router.push("/(routes)/payment/wallet"); }}>
                    <Text>Go to Payments</Text>
                </TouchableOpacity> */}
                <View>
                    <Text style={{ color: colors.secondary_light, fontFamily: "Nunito_700Bold", fontSize: 20, marginLeft: 10 }}>
                        Recently visited
                    </Text>
                </View>
                <View style={styles.home_page_bottom}>
    <View style={styles.ScrollViewContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    {recentVisits.map((visit, index) => (
        <TouchableOpacity
            key={index}
            style={styles.parkingLotContainer}
            onPress={() => router.push({
                pathname: "/(routes)/parking-lot",
                params: { id: visit.lot_id },
            })}
        >
            <View style={styles.imageContainer}>
                {visit.images && visit.images.length > 0 ? (
                    <Image
                        style={styles.image}
                        source={{ uri: `${EXPO_PUBLIC_API_KEY}/${visit.images[0].replace(/\\/g, "/")}` }} // Corrected image path formatting
                    />
                ) : (
                    <Text>No Image Available</Text>
                )}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={{ fontFamily: "Nunito_700Bold", fontSize: 15, flexShrink: 1 }}>
                    {visit.lot_name}
                </Text>
                <View style={styles.capacity}>
                    <Image
                        style={styles.vehicleIcon}
                        source={require("@/assets/images/suv_side.png")}
                    />
                    <Text>: {visit.car_capacity}</Text>
                </View>
                <View style={styles.capacity}>
                    <Image
                        style={styles.vehicleIcon}
                        source={require("@/assets/images/bike_side.png")}
                    />
                    <Text>: {visit.bike_capacity}</Text>
                </View>
                <View style={[styles.statusContainer, { backgroundColor: visit.status === 'active' ? colors.success : 'red' }]}>
                    <Text style={styles.status}>
                        {visit.status === 'active' ? 'Open' : 'Closed'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    ))}
</ScrollView>

    </View>
</View>

            </SafeAreaView>

            {/* Modal for QR code */}
            <Modal
    visible={isModalVisible}
    animationType="fade"
    transparent={true}
    onRequestClose={handleCloseModal}
>
    <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <View style={styles.vehicleInfoContainer}>
                <Text style={styles.vehicleInfoText}>
                    Vehicle: {selectedVehicle?.name}
                </Text>
                <Text style={styles.vehicleInfoText}>
                    Plate No: {selectedVehicle?.vehicle_number}
                </Text>
            </View>
            <View style={styles.qrCodeContainer}>
                <QRCode
                    value={`Vehicle: ${selectedVehicle?.vehicle_id}, User: ${userDetails?.driver_id}`}
                    size={wp('60%')}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    router.push("/(routes)/parked");
                    handleCloseModal();
                }}
                style={styles.parkedButton}
            >
                <Text style={styles.parkedButtonText}>Parked</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    home_page_top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#fff', // Background color for the top section
        borderBottomWidth: 1, // Optional for a border at the bottom
        borderBottomColor: '#ddd', // Color of the border
    },
    parkEaseLogoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
       marginLeft:5, // Spacing between icons
    },
    icon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: wp('5%'),
        borderRadius: wp('5%'),
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'), // Adjust width as needed
        maxHeight: hp('60%'), // Adjust height as needed
    },

    
    vehicleInfoContainer: {
        marginBottom: hp('2%'), // Space between vehicle info and QR code
        alignItems: 'center',
    },
    vehicleInfoText: {
        fontFamily: 'Nunito_700Bold',
        fontSize: wp('6%'),
        color: colors.primary,
        textAlign: 'center',
    },
    qrCodeContainer: {
        width: wp('60%'),
        height: wp('60%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    parkedButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    parkedButtonText: {
        color: 'white',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
    qrContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    searchBarContainer: {
        width: wp("60%"),
        marginRight: 10,
        marginTop:8,
        marginLeft:8
    },
    home_page_mid: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: wp("100%"),
        height: hp("61%"),
        position: "relative",
    },
    title: {},
    
    mapContainer: {
        width: wp("96%"),
        height: hp("52%"),
        margin: 10,
        position: "relative",
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
     messageContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    smallIcon: {
        width: 100,
        height: 80,
    },

    smallIconCar: {
        width: 40,
        height: 30,
    },
    messageText: {
        display: "flex",
        flexDirection: "row",
        fontSize: 16,
        fontWeight: "600",
        color: '#333',
        textAlign: 'center',
    },
    QRContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        // backgroundColor: '#f9f9f9',
        borderRadius: 12,
        flexDirection: 'column',
    },
    plateNoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    plateNo: {
        fontFamily: "Nunito_700Bold",
        fontSize: 20,
    },

    
    
    home_page_bottom: {
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
        width: 260,
        borderRadius: 10,
        marginHorizontal: 5
    },
    imageContainer: {
        flex:2,
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
    statusContainer: {
        borderRadius: 5,
        padding: 2,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
    status: {
        color: "white",
        fontFamily: "Nunito_700Bold",
        fontSize: 12,
        textAlign: "center",
    },
    detailsContainer: {
        margin: 2,
        padding: 2,
        flex: 3,
        flexShrink: 1,
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
    
   
    modalTitle: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    
    
});
