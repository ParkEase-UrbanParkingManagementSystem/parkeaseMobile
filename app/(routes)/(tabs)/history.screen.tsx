// HistoryScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import colors from "@/constants/Colors";
import {LinearGradient} from "expo-linear-gradient";
import {router} from "expo-router";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {
    useFonts,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
} from "@expo-google-fonts/nunito";

// hard coded data for past parkings
const parkingData = [
    {
        date: new Date('2024-07-09'),
        location: 'CCC Car Park',
        inTime: '14:23',
        outTime: '15:50',
        cost: '12.50',
        vehicle: 'Nissan Patrol Y61'
    },
    {
        date: new Date('2024-07-10'),
        location: 'Liberty Plaza',
        inTime: '12:00',
        outTime: '14:00',
        cost: '10.00',
        vehicle: 'Toyota Corolla'
    },
    {
        date: new Date('2024-07-11'),
        location: 'Majestic City',
        inTime: '09:00',
        outTime: '10:30',
        cost: '8.00',
        vehicle: 'Honda Civic'
    },
    {
        date: new Date('2024-07-12'),
        location: 'Crescat Boulevard',
        inTime: '16:00',
        outTime: '18:00',
        cost: '15.00',
        vehicle: 'BMW X5'
    },
    {
        date: new Date('2024-07-13'),
        location: 'ODEL',
        inTime: '11:00',
        outTime: '13:30',
        cost: '11.00',
        vehicle: 'Audi A4'
    },
    {
        date: new Date('2024-07-14'),
        location: 'Park Street Mews',
        inTime: '10:00',
        outTime: '12:00',
        cost: '9.50',
        vehicle: 'Mercedes-Benz C-Class'
    },
    {
        date: new Date('2024-07-14'),
        location: 'Park Street Mews',
        inTime: '10:00',
        outTime: '12:00',
        cost: '9.50',
        vehicle: 'Mercedes-Benz C-Class'
    },
    {
        date: new Date('2024-07-14'),
        location: 'Park Street Mews',
        inTime: '10:00',
        outTime: '12:00',
        cost: '9.50',
        vehicle: 'Mercedes-Benz C-Class'
    },
    {
        date: new Date('2024-07-14'),
        location: 'Park Street Mews',
        inTime: '10:00',
        outTime: '12:00',
        cost: '9.50',
        vehicle: 'Mercedes-Benz C-Class'
    }
];

// methods for data processing
const getDay = (date: Date) => date.getDate().toString().padStart(2, '0');
const getMonthAbbr = (date: Date) => date.toLocaleString('default', { month: 'short' });
const getElapsedTime = (inTime: string, outTime: string) => {
    const [inHours, inMinutes] = inTime.split(':').map(Number);
    const [outHours, outMinutes] = outTime.split(':').map(Number);

    let elapsedHours = outHours - inHours;
    let elapsedMinutes = outMinutes - inMinutes;

    if (elapsedMinutes < 0) {
        elapsedMinutes += 60;
        elapsedHours -= 1;
    }

    return `${elapsedHours} hrs ${elapsedMinutes} mins`;
};



const HistoryScreen = () => {
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
            style={{ flex: 1}}
        >
            <ScrollView style={styles.activityScrollView} contentContainerStyle={{alignItems: "center",}}>
                {parkingData.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.parking}
                        // onPress={() => router.push("/(routes)/past-parking")}
                    >
                        <View style={styles.day}>
                            <Text style={styles.date}>{getDay(item.date)}</Text>
                            <Text style={styles.month}>{getMonthAbbr(item.date)}</Text>
                        </View>
                        <View style={styles.details}>
                            {/*location*/}
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/ParkingLocation.png")}
                                />
                                <Text style={styles.detail}>{item.location}</Text>
                            </View>
                            {/*time duration*/}
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/duration.png")}
                                />
                                <Text style={styles.detail}>{`${item.inTime} - ${item.outTime} = ${getElapsedTime(item.inTime, item.outTime)}`}</Text>
                            </View>
                            {/*cost*/}
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/cost.png")}
                                />
                                <Text style={styles.detail}>{item.cost} LKR</Text>
                            </View>
                            {/*vehicle*/}
                            <View style={styles.row}>
                                <Image
                                    style={styles.icon}
                                    source={require("@/assets/images/vehicle.png")}
                                />
                                <Text style={styles.detail}>{item.vehicle}</Text>
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
        padding: 5,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    parking: {
        // borderStyle: "solid",
        // borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        backgroundColor: colors.secondary_light2,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 5,
        width: wp("90%"),

        shadowColor: "#1a2131",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity:  0.21,
        shadowRadius: 7.68,
        elevation: 10

    },
    day: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "27%",
    },
    date: {
        fontFamily: "Nunito_700Bold", fontSize: 60
    },
    month: {
        fontFamily: "Nunito_700Bold", fontSize: 50
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
        gap: 10,
    },
    icon: {
        width: 25,
        height: 25,
    },
    detail: {
        fontFamily: "Nunito_600SemiBold", fontSize: 15
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
});

export default HistoryScreen;
