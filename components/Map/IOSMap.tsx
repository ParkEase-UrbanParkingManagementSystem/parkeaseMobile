import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const INITIAL_REGION = {
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

interface LocationState {
    coords: {
        latitude: number;
        longitude: number;
    };
}

export default function IOSMap() {
    const [location, setLocation] = useState<LocationState | null>(null);
    const [address, setAddress] = useState<string>('');

    Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            console.log("Location:");
            console.log(currentLocation);
        };
        getPermissions();
    }, []);

    const geocode = async () => {
        try {
            const geocodedLocation = await Location.geocodeAsync(address);
            console.log("Geocoded Address:");
            console.log(geocodedLocation);
        } catch (error) {
            console.error("Error geocoding address:", error);
        }
    };

    const reverseGeocode = async () => {
        if (location) {
            try {
                const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                    longitude: location.coords.longitude,
                    latitude: location.coords.latitude
                });
                console.log("Reverse Geocoded:");
                console.log(reverseGeocodedAddress);
            } catch (error) {
                console.error("Error reverse geocoding location:", error);
            }
        } else {
            console.log("Location not available");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {location ? (
                <MapView
                    style={styles.map}
                    region={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                    />
                </MapView>
            ) : (
                <View style={styles.map} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        width: "100%",
        height: "50%", // Adjust height as needed
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
