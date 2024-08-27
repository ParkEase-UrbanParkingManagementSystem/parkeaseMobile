import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { VehicleContext } from '../../../utils/vehicleContext'; // Import VehicleContext

export default function ChooseVehicleScreen() {
  const { selectedVehicle, setSelectedVehicle } = useContext(VehicleContext); // Use VehicleContext
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

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
      }
    };

    return <Image style={styles.vehicleIcon} source={getImageSource(vehicleType)} />;
  };

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token); // Debugging token

      try {
        const response = await fetch(`http://192.168.8.198:5000/vehicle`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token || '', // Ensuring token is included correctly
          },
        });

        console.log('Response status:', response.status); // Debugging response status
        const parseRes = await response.json();
        console.log('Parsed response:', parseRes); // Debugging parsed response

        if (response.ok) {
          setVehicles(parseRes.data);
          console.log('Vehicle details set in state:', parseRes.data); // Confirm state update
        } else {
          console.error('Error fetching details:', parseRes.message);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log('Fetch error:', error.message);
        } else {
          console.log('An unexpected error occurred');
        }
      }
    };

    fetchVehicleDetails();
  }, []);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    router.push('/(routes)/home-page');
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={[colors.secondary_light, colors.secondary_light]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.firstContainer}>
        <Text style={styles.heading}>Your Vehicles</Text>
        
        {selectedVehicle ? (
          <>
            <View style={styles.PlateNoContainer}>
              <Text style={styles.plateNo}>{selectedVehicle.vehicle_number}</Text>
            </View>
            <View style={styles.vehicleNameContainer}>
              <Text style={styles.vehicleName}>{selectedVehicle.name}</Text>
            </View>
            <View style={styles.vehicleImageContainer}>
              <Image 
                style={styles.vehicleImage} 
                source={
                  selectedVehicle.type_id === 1 
                    ? require('@/assets/images/car_side.png') 
                    : selectedVehicle.type_id === 2 
                    ? require('@/assets/images/bike_side.png') 
                    : selectedVehicle.type_id === 3 
                    ? require('@/assets/images/tuktuk_side.png') 
                    : require('@/assets/images/car_side.png') // default image if type_id doesn't match
                } 
              />
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
            {vehicles &&
              vehicles.map((vehicle, index) => (
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
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={styles.addVehicleButtonContainer}
            onPress={() => router.push('/(routes)/add-vehicle')}
          >
            <Text style={styles.addVehicleText}>Add Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButtonContainer}
            onPress={() => router.push('/(routes)/home-page')}
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
