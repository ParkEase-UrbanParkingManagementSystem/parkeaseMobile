import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { VehicleContext } from '../../../utils/vehicleContext';

export default function ChooseVehicleScreen() {
  const { selectedVehicle, setSelectedVehicle } = useContext(VehicleContext);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY;

  interface Vehicle {
    type_id: number;
    name: string;
    vehicle_number: string;
  }

  interface VehicleImageProps {
    vehicleType: number;
  }

  const VehicleImage: React.FC<VehicleImageProps> = ({ vehicleType }) => {
    const getImageSource = (vehicleType: number) => {
      switch (vehicleType) {
        case 1:
          return require('@/assets/images/car_side.png');
        case 2:
          return require('@/assets/images/bike_side.png');
        case 3:
          return require('@/assets/images/tuktuk_side.png');
        case 4:
          return require('@/assets/images/bus_side.png');
        default:
          return require('@/assets/images/car_side.png');
      }
    };

    return <Image style={styles.vehicleIcon} source={getImageSource(vehicleType)} />;
  };

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      setIsLoading(true);
      setError(null);
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(`${EXPO_PUBLIC_API_KEY}/vehicle`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token || '',
          },
        });

        const parseRes = await response.json();

        if (response.ok) {
          if (parseRes.data && parseRes.data.length > 0) {
            setVehicles(parseRes.data);
          } else {
            setError('No vehicles found. Please add a vehicle.');
          }
        } else {
          setError(parseRes.message || 'An error occurred while fetching vehicles.');
        }
      } catch (error) {
        setError('Network error. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleDetails();
  }, []);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    // router.push('/(routes)/home-page');
  };

  const handleAddVehicle = () => {
    router.push('/(routes)/add-vehicle');
  };

  const handleContinue = () => {
    if (!selectedVehicle) {
      Alert.alert('No Vehicle Selected', 'Please select a vehicle before continuing.');
    } else {
      router.push('/(routes)/home-page');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={[colors.secondary_light2, colors.primary_light]} style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
                <Text style={styles.title}>Your Vehicles</Text>
            </View>
      
      <SafeAreaView style={styles.firstContainer}>
      
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Image
              source={require('@/assets/images/home.png')}
              style={styles.errorImage}
            />
            <Text style={styles.errorTitle}>Oops! No Vehicles Found</Text>
            <Text style={styles.errorText}>
              Looks like you haven't added a vehicle yet. Add one to start enjoying the benefits of ParkEase!
            </Text>
            {/* <TouchableOpacity style={styles.addButton} onPress={onAddVehicle}>
              <Text style={styles.addButtonText}>Add a Vehicle</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <>
            {selectedVehicle ? (
              <>
                <View style={styles.PlateNoContainer}>
                  <Text style={styles.plateNo}>{selectedVehicle.vehicle_number}</Text>
                </View>
                <View style={styles.vehicleNameContainer}>
                  <Text style={styles.vehicleName}>{selectedVehicle.name}</Text>
                </View>
                <View style={styles.vehicleImageContainer}>
                  <VehicleImage vehicleType={selectedVehicle.type_id} />
                </View>
              </>
            ) : (
              <View style={styles.noVehicleContainer}>
                <Text style={styles.noVehicleText}>No vehicle selected. Please select a vehicle.</Text>
                <Image 
                  style={styles.unavailableImage} 
                  source={require('@/assets/images/car_side.png')} 
                />
              </View>
            )}

            <Text style={styles.listTopic}>Vehicle List</Text>
            <View style={styles.vehicleSelectorContainer}>
              <ScrollView style={styles.vehicleSelector}>
                {vehicles.map((vehicle, index) => (
                  <View key={index} style={styles.vehicleContainer}>
                    <View style={styles.vehicleIconContainer}>
                      <VehicleImage vehicleType={vehicle.type_id} />
                    </View>
                    <View style={styles.vehicleDetailsContainer}>
                      <Text style={styles.vehicleRegNo}>{vehicle.name}</Text>
                      <Text style={styles.vehicleName_2}>{vehicle.vehicle_number}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.selectButton}
                      onPress={() => handleSelectVehicle(vehicle)}
                    >
                      <Text style={{ color: colors.white }}>Select</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}
        
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={styles.addVehicleButtonContainer}
            onPress={handleAddVehicle}
          >
            <Text style={styles.addVehicleText}>Add Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButtonContainer}
            onPress={handleContinue}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// Updated styles
export const styles = StyleSheet.create({

  headerContainer: {
    backgroundColor: colors.primary,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
},
title: {
    marginTop: 50,
    fontFamily: "Nunito_700Bold",
    fontSize: 24,
    color: 'white',
},
  firstContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  heading: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: hp('3%'),
    textAlign: 'center',
  },
  PlateNoContainer: {
    marginBottom: hp('1%'),
    alignItems: 'center',
  },
  plateNo: {
    marginTop:20,
    color: colors.black,
    fontSize: wp('7%'),
    fontWeight: '800',
  },
  vehicleNameContainer: {
    marginBottom: hp('0%'),
    alignItems: 'center',
  },
  vehicleName: {
    color: colors.primary,
    fontSize: wp('7%'),
    fontWeight: '500',
  },
  vehicleImageContainer: {
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: colors.secondary_light,
    borderRadius: wp('4%'),
    margin: wp('4%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  errorImage: {
    width: wp('60%'),
    height: wp('40%'),
    marginBottom: hp('2%'),
  },
  errorTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: hp('1%'),
    fontFamily: 'Raleway_700Bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: wp('4%'),
    color: colors.text,
    textAlign: 'center',
    marginBottom: hp('2%'),
    fontFamily: 'Nunito_400Regular',
    lineHeight: hp('3%'),
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('3%'),
    marginTop: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  addButtonText: {
    color: colors.secondary_light,
    fontSize: wp('5%'),
    fontWeight: 'bold',
    fontFamily: 'Raleway_700Bold',
    textAlign: 'center',
  },
  vehicleImage: {
    width: wp('50%'),
    height: hp('20%'),
    resizeMode: 'contain',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  addVehicleButtonContainer: {
    borderRadius: hp('1%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.secondary,
  },
  addVehicleText: {
    color: colors.primary,
    fontSize: wp('5%'),
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonContainer: {
    borderRadius: hp('1%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.secondary,
  },
  continueText: {
    color: colors.primary,
    fontSize: wp('5%'),
    fontWeight: '600',
    textAlign: 'center',
  },
  vehicleSelectorContainer: {
    width: '100%',
    height: hp('35%'),
    backgroundColor: colors.primary_light,
    padding: 10,
    borderRadius: hp('2%'),
    marginBottom: hp('2%'),
  },
  vehicleSelector: {
    flex: 1,
    flexDirection: 'column',
  },
  vehicleContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.secondary_light,
    borderRadius: hp('2%'),
    marginBottom: 10,
  },
  vehicleIconContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleIcon: {
    width: wp('20%'),
    height: hp('10%'),
    resizeMode: 'contain',
  },
  vehicleDetailsContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  vehicleRegNo: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  vehicleName_2: {
    fontSize: wp('4.5%'),
    color: colors.primary,
  },
  selectButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  noVehicleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noVehicleText: {
    fontSize: wp('5%'),
    color: '#333',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  unavailableImage: {
    width: wp('50%'),
    height: hp('20%'),
    resizeMode: 'contain',
  },
  listTopic: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
});
