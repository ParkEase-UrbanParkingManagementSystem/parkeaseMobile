// OngoingScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import colors from "@/constants/Colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

//hard coded data for ongoing parkings
const ongoingParks = [
    {
        inDate: new Date('2024-07-09'),
        inTime: '21:30',
        location: 'CCC Car Park',
        WardenId: "123",
        WardenName: 'Saman Kumara',
        vehicle: 'Nissan Patrol Y61'
    }
]

const OngoingScreen = () => {
    return (
        <LinearGradient
            colors={[colors.secondary_light, colors.secondary_light]}
            style={{ flex: 1}}
        >
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.onGoing}>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>In Date</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 09 July 2024</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>In Time</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 21: 30</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Location</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: CCC Car Park</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden ID</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: 123</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden Name</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: Saman Kumara</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>vehicle</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: Nissan Patrol Y61</Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>

                    </View>
                </View>
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
        backgroundColor: "#00e673",
        borderRadius: 15,
        padding: 10,
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
        marginLeft: wp("10%"),
    },
    right: {
        // borderStyle: "solid",
        // borderWidth: 1,
        width: wp("50%"),
        alignItems: "flex-start",

    },
    buttonContainer: {

    },
});

export default OngoingScreen;




