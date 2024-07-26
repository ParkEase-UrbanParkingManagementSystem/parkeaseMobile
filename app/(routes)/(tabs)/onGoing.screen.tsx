// OngoingScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/Colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {router} from "expo-router";

//hard coded data for ongoing parkings
const ongoingParks = [
    {
        inDate: new Date('2024-07-09'),
        inTime: '21:30',
        location: 'CCC Car Park',
        WardenId: "123",
        WardenName: 'Saman Kumara',
        vehicleName: 'Nissan Patrol Y61',
        vehicleNo: "CAQ-1628",
    },
    {
        inDate: new Date('2024-07-09'),
        inTime: '10:30',
        location: 'Liberty plaza Car Park',
        WardenId: "678",
        WardenName: 'Nipul Yansith',
        vehicleName: 'Nissan Leaf',
        vehicleNo: "CAL-3001",
    }
]
// methods for processing data
const getFormattedDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

const OngoingScreen = () => {
    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1}}
        >
            <ScrollView style={{ flex: 1 }}>
                {ongoingParks.map((park, index) => (
                    <View style={styles.onGoing} key={index}>
                        <Image
                            source={require('@/assets/images/pocketWatch.gif')}
                            style={styles.icon}
                        />
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>In Date</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {getFormattedDate(park.inDate)}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>In Time</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {park.inTime}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Location</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {park.location}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden ID</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {park.WardenId}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden Name</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {park.WardenName}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Vehicle Name</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {park.vehicleName}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.left}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>License No</Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {park.vehicleNo}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                // onPress={() => router.back()}
                                style={{backgroundColor: colors.error, padding:5, borderRadius: 5}}
                            >
                                <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14}}>Report Issue</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push("/(routes)/QR")}
                                style={{backgroundColor: colors.primary, padding:5, borderRadius: 5}}
                            >
                                <Text style={{fontFamily: "Nunito_700Bold", fontSize: 14, color: colors.secondary_light}}>Pay and Leave</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    onGoing: {
        // borderStyle: "solid",
        // borderWidth: 1,

        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        // backgroundColor: "#00e673",
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 10,
        position: 'relative',
    },
    icon: {
        width: 25,
        height: 25,
        position: 'absolute',
        right: 20,
        top: 8,
    },
    row: {
        // borderStyle: "solid",
        // borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    left: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("30%"),
        alignItems: "flex-start",
        marginLeft: wp("16%"),
    },
    right: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("50%"),
        alignItems: "flex-start",

    },
    buttonContainer: {
        // borderStyle: "solid",
        // borderWidth: 1,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 25,
        marginTop: 10,
    },
});

export default OngoingScreen;




