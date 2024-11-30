import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import MapView, { Marker, Region } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
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

interface ParkingLot {
    lot_id: string;
    name: string;
    latitude: number;
    longitude: number;
    addressno: string;
    street1: string;
    street2: string;
    city: string;
    district: string;
}

export default function IOSMap() {
    const [location, setLocation] = useState<LocationState | null>(null);
    const [region, setRegion] = useState<Region>(INITIAL_REGION);
    const [lotDetails, setLotDetails] = useState<ParkingLot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError("Location permission not granted");
                return;
            }

            try {
                let currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
                if (currentLocation) {
                    setRegion({
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }
            } catch (err) {
                setError("Failed to get current location");
            }
        };
        getPermissions();
    }, []);

    useEffect(() => {
        const fetchLotDetails = async () => {
            setIsLoading(true);
            setError(null);
            const token = await AsyncStorage.getItem("token");
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_API_KEY}/parking/get-parking-lots-map`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        token: token || ""
                    }
                });
    
                const parseRes = await response.json();
    
                if (response.ok) {
                    console.log("Wade poddak shape")
                    setLotDetails(parseRes);
                    console.log("Lot Details:", parseRes);
                } else {
                    setError("Failed to fetch parking lot details");
                }
            } catch (error) {
                setError("An unexpected error occurred");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchLotDetails();
    }, []);

    console.log("Lot Details" , lotDetails);

    const showParkingLots = () => {
        if (!lotDetails || lotDetails.length === 0) return null;

        return lotDetails.map((item) => (
            <Marker
                onPress={() => {
                    if (selectedMarker === item.lot_id) {
                        // If the marker is clicked again, navigate to the details page
                        router.push({
                            pathname: "/(routes)/parking-lot",
                            params: { id: item.lot_id },
                        });
                    } else {
                        // Otherwise, set this marker as selected to show the name and description
                        setSelectedMarker(item.lot_id);
                    }
                }}
                key={item.lot_id}
                coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude)
                }}
                title={item.name}
                description={`${item.addressno}, ${item.street1}, ${item.city}`}
            />
        ));
    };

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

    if (isLoading) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text>Loading parking lots...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

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
                    {showParkingLots()}
                    {location && (
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="You are here"
                            pinColor="blue"
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
        height: "100%",
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
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

