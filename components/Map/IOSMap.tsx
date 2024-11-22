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
let ParkingLots = [
    {
        name: "Nugegoda",
        location: {
            latitude: 6.872777253164691,
            longitude: 79.89135348411646
        },
        description: "SuperMarket Car Park"
    },
    {
        name: "Kalubowila",
        location: {
            latitude: 6.867031894696935,
            longitude: 79.88456442065245
        },
        description: "Hospital Car Park"
    },
    {
        name: "University of Colombo",
        location: {
            latitude: 6.903074945382166,
            longitude: 79.86031733323625
        },
        description: "Campus Car Park"
    },
    {
        name: "Colombo Rowing Club",
        location: {
            latitude: 6.930664698385529,
            longitude: 79.84783440497031
        },
        description: "CRC Car Park"
    },
    {
        name: "Galle Face Green",
        location: {
            latitude: 6.927079,
            longitude: 79.845301
        },
        description: "Galle Face Green Parking"
    },
    {
        name: "Liberty Plaza",
        location: {
            latitude: 6.910887,
            longitude: 79.852550
        },
        description: "Liberty Plaza Car Park"
    },
    {
        name: "Crescat Boulevard",
        location: {
            latitude: 6.920959,
            longitude: 79.849600
        },
        description: "Crescat Boulevard Parking"
    },
    {
        name: "Independence Square",
        location: {
            latitude: 6.916326,
            longitude: 79.869043
        },
        description: "Independence Square Car Park"
    },
    {
        name: "National Museum",
        location: {
            latitude: 6.927078,
            longitude: 79.861243
        },
        description: "National Museum Parking"
    },
    {
        name: "Viharamahadevi Park",
        location: {
            latitude: 6.919193,
            longitude: 79.860635
        },
        description: "Viharamahadevi Park Car Park"
    },
    {
        name: "Bally's Casino",
        location: {
            latitude: 6.931167,
            longitude: 79.844510
        },
        description: "Bally's Casino Parking"
    },
    {
        name: "Shangri-La Hotel",
        location: {
            latitude: 6.930051,
            longitude: 79.844560
        },
        description: "Shangri-La Hotel Parking"
    },
    {
        name: "Fort Railway Station",
        location: {
            latitude: 6.934456,
            longitude: 79.850729
        },
        description: "Fort Railway Station Car Park"
    },
    {
        name: "Pettah Market",
        location: {
            latitude: 6.939781,
            longitude: 79.855730
        },
        description: "Pettah Market Parking"
    },
    {
        name: "Dutch Hospital Shopping Precinct",
        location: {
            latitude: 6.932491,
            longitude: 79.841573
        },
        description: "Dutch Hospital Car Park"
    },
    {
        name: "Old Parliament Building",
        location: {
            latitude: 6.934114,
            longitude: 79.843102
        },
        description: "Old Parliament Parking"
    },
    {
        name: "Beira Lake",
        location: {
            latitude: 6.925256,
            longitude: 79.851559
        },
        description: "Beira Lake Car Park"
    },
    {
        name: "Colombo City Centre",
        location: {
            latitude: 6.918116,
            longitude: 79.852499
        },
        description: "Colombo City Centre Parking"
    },
    {
        name: "Gangaramaya Temple",
        location: {
            latitude: 6.914845,
            longitude: 79.856827
        },
        description: "Gangaramaya Temple Car Park"
    },
    {
        name: "Majestic City",
        location: {
            latitude: 6.894344,
            longitude: 79.855093
        },
        description: "Majestic City Parking"
    },
    {
        name: "Sri Lanka Cricket",
        location: {
            latitude: 6.911477,
            longitude: 79.863556
        },
        description: "Sri Lanka Cricket Car Park"
    },
    {
        name: "Colombo Lighthouse",
        location: {
            latitude: 6.935220,
            longitude: 79.842232
        },
        description: "Colombo Lighthouse Parking"
    },
    {
        name: "St. Lucia's Cathedral",
        location: {
            latitude: 6.950245,
            longitude: 79.862389
        },
        description: "St. Lucia's Cathedral Car Park"
    },
    {
        name: "Jami Ul-Alfar Mosque",
        location: {
            latitude: 6.939998,
            longitude: 79.853373
        },
        description: "Jami Ul-Alfar Mosque Parking"
    },
    {
        name: "Cinnamon Grand Colombo",
        location: {
            latitude: 6.917425,
            longitude: 79.848418
        },
        description: "Cinnamon Grand Car Park"
    },
    {
        name: "WTC Colombo",
        location: {
            latitude: 6.933158,
            longitude: 79.841198
        },
        description: "WTC Colombo Parking"
    },
    {
        name: "Hilton Colombo",
        location: {
            latitude: 6.933198,
            longitude: 79.844117
        },
        description: "Hilton Colombo Car Park"
    },
    {
        name: "Grand Oriental Hotel",
        location: {
            latitude: 6.934829,
            longitude: 79.844471
        },
        description: "Grand Oriental Hotel Parking"
    },
    {
        name: "Port City Colombo",
        location: {
            latitude: 6.940341,
            longitude: 79.842753
        },
        description: "Port City Colombo Car Park"
    },
    {
        name: "Colombo Port Maritime Museum",
        location: {
            latitude: 6.941262,
            longitude: 79.842370
        },
        description: "Colombo Port Maritime Museum Parking"
    },
    {
        name: "Sambodhi Chaithya",
        location: {
            latitude: 6.936317,
            longitude: 79.844659
        },
        description: "Sambodhi Chaithya Car Park"
    },
    {
        name: "Slave Island Railway Station",
        location: {
            latitude: 6.926309,
            longitude: 79.853130
        },
        description: "Slave Island Railway Station Parking"
    },
    {
        name: "National Zoological Gardens",
        location: {
            latitude: 6.935480,
            longitude: 79.851979
        },
        description: "National Zoological Gardens Car Park"
    },
    {
        name: "Sirimavo Bandaranaike Memorial Exhibition Centre",
        location: {
            latitude: 6.935479,
            longitude: 79.864146
        },
        description: "Sirimavo Bandaranaike Memorial Car Park"
    }
]
const showParkingLots = () => {
    return ParkingLots.map((item, index) => {
        return (
            <Marker
                key={index}
                coordinate={item.location}
                title={item.name}
                description={item.description}
            />
        )
    });
};

export default function IOSMap() {
    const [location, setLocation] = useState<LocationState | null>(null);
    const [address, setAddress] = useState<string>('');
    const [region, setRegion] = useState<Region>(INITIAL_REGION);
    const mapRef = useRef<MapView | null>(null);

    // Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");

    useEffect(() => {
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Please grant location permissions");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
            // console.log("Location:");
            // console.log(currentLocation);
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
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: colors.white
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
