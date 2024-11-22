// HistoryScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import colors from '@/constants/Colors';
import { LinearGradient } from "expo-linear-gradient";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    useFonts,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
} from "@expo-google-fonts/nunito";
import { router, useFocusEffect } from "expo-router";

import {EXPO_PUBLIC_API_KEY} from '../../config'



// Helper functions
const getDay = (date: Date) => date.getDate().toString().padStart(2, '0');
const getMonthAbbr = (date: Date) => date.toLocaleString('default', { month: 'short' });

const getElapsedTime = (inTime: string, outTime: string) => {
    let inDate = new Date(inTime);
    let outDate = new Date(outTime);

    // Ensure that the elapsed time is non-negative
    if (inDate > outDate) {
        [inDate, outDate] = [outDate, inDate];
    }

    const elapsedMs = outDate.getTime() - inDate.getTime();
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const remainingMinutes = elapsedMinutes % 60;

    // Handle cases where the elapsed time crosses midnight
    if (elapsedHours < 0) {
        return `${24 + elapsedHours} hrs ${remainingMinutes} mins`;
    }

    return `${elapsedHours} hrs ${remainingMinutes} mins`;
};

interface Instance {
  instance_id: string;
  in_time: string;
  out_time: string;
  lot_name: string;
  city: string;
  cost: number;
  vehicle_name: string;
}

const RecentsScreen = () => {
    const [instances, setInstances] = useState<Instance[]>([]);
    

    

    useEffect(() => {
        const fetchInstances = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/get-recent-parking-instances`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token || ""
                    }
                });
                const parseRes = await response.json();

                if (response.ok) {
                    setInstances(parseRes.data);
                    console.log("Instances:", instances);
                } else {
                    console.error("Error: ", parseRes.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchInstances();
    }, []);

    let [fontsLoaded, fontError] = useFonts({
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_400Regular,
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.activityScrollView} contentContainerStyle={{ alignItems: "center" }}>
                {instances.map((item, index) => (
                    <TouchableOpacity

                        key={index}
                        style={styles.parking}
                        onPress={() => router.push({ pathname: "/(routes)/instance", params: { id: item.instance_id } })}

                    >
                        <View style={styles.day}>
                            <Text style={styles.lotName}>{item.lot_name}</Text>
                            <Text style={styles.date}>{getDay(new Date(item.in_time))}</Text>
                            <Text style={styles.month}>{getMonthAbbr(new Date(item.in_time))}</Text>
                        </View>
                        <View style={styles.details}>
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/ParkingLocation.png")}
                                />
                                <Text style={styles.detail}>{item.city}</Text>
                            </View>
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/duration.png")}
                                />
                                <Text style={styles.detail}>{`${getElapsedTime(item.in_time, item.out_time)}`}</Text>
                            </View>
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/cost.png")}
                                />
                                <Text style={styles.detail}>{item.cost} LKR</Text>
                            </View>
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/vehicle.png")}
                                />
                                <Text style={styles.detail}>{item.vehicle_name}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    activityScrollView: {
        flex: 1,
        padding: 10,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    parking: {
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        backgroundColor: colors.secondary_light2,
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        width: wp("90%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 7,
    },
    day: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "30%",
        paddingRight: 10,
        borderRightColor: colors.secondary_light2,
        borderRightWidth: 1,
    },
    lotName: {
        fontFamily: "Nunito_700Bold",
        fontSize: 18,
        textAlign: 'center',
        color: colors.primary,
    },
    date: {
        fontFamily: "Nunito_700Bold",
        fontSize: 28,
        color: colors.primary,
    },
    month: {
        fontFamily: "Nunito_600SemiBold",
        fontSize: 18,
        color: colors.primary,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 15,
        gap: 12,
    },
    icon: {
        width: 25,
        height: 25,
    },
    detail: {
        fontFamily: "Nunito_600SemiBold",
        fontSize: 16,
        color: colors.text,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 12,
    },
});

export default RecentsScreen;
