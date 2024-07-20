import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import colors from "@/constants/Colors";

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
    const [region, setRegion] = useState<Region>(INITIAL_REGION);
    const mapRef = useRef<MapView | null>(null);

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
            if (currentLocation) {
                setRegion({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        };
        getPermissions();
    }, []);

    const centerMapOnLocation = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
            });
        }
    };

    const zoomIn = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...region,
                latitudeDelta: region.latitudeDelta / 2,
                longitudeDelta: region.longitudeDelta / 2,
            });
        }
    };

    const zoomOut = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                ...region,
                latitudeDelta: region.latitudeDelta * 2,
                longitudeDelta: region.longitudeDelta * 2,
            });
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={INITIAL_REGION}
                    region={region}
                    onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                >
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="You are here"
                        />
                    )}
                </MapView>
                <TouchableOpacity style={styles.centerButton} onPress={centerMapOnLocation}>
                    <Image
                        source={require('@/assets/images/location_target.png')}
                        style={{width:25, height:25}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
                    <Image
                        source={require('@/assets/images/zoomOut.png')}
                        style={{width:20, height:20}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.zoomButton, {bottom: 100}]} onPress={zoomIn}>
                    <Image
                        source={require('@/assets/images/zoomIn.png')}
                        style={{width:25, height:25}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: "92%",
        left: -3,
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
        overflow: "hidden",
    },
    centerButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: colors.primary_light,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    zoomButton: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: colors.primary_light,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
});
