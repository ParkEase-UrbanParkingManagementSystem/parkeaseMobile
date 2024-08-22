import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface ParkingDetails {
  vehicle_name: string;
  vehicle_number: string;
  parkedAt: string;
  vehicleType: string;
  pricePerHour: string;
  in_time: string;
  lot_name: string;
  warden_name: string;
  warden_contact: string;
  lot_city: string;
  warden_fname: string;
  warden_lname: string;
  warden_city: string;
}

export default function ParkedScreen() {
  const [details, setDetails] = useState<ParkingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<'warden' | 'lot'>('warden');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`http://192.168.8.198:5000/parking/parking-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token || ""
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetails(data.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const switchSection = () => {
    setActiveSection(activeSection === 'warden' ? 'lot' : 'warden');
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error.message}</Text>;
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <LinearGradient colors={[colors.secondary_light, colors.secondary_light]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Your {details?.vehicle_name || 'Unknown Vehicle'} </Text>
          <Text style={styles.heading2}>is Parked in</Text>
          <Text style={styles.heading}>{details?.lot_name || 'Unknown Lot'}</Text>
        </View>

        <View style={styles.vehicleDetailsContainer}>
          <Image
            style={styles.vehicleImage}
            source={require('@/assets/images/car_side.png')} 
          />
          <Text style={styles.vehicleName}>{details?.vehicle_name || 'Unknown Vehicle'}</Text>
          <Text style={styles.vehicleNumber}>{details?.vehicle_number || 'Unknown Number'}</Text>
        </View>

        <View style={styles.parkingDetailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.parkingDetailsText}>Parked at:</Text>
            <Text style={styles.parkingLocation}>{formatTime(details?.in_time || '')}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.parkingDetailsText}>Vehicle Type:</Text>
            <Text style={styles.parkingDuration}>{details?.vehicleType || 'Unknown Type'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.parkingDetailsText}>Price per Hour:</Text>
            <Text style={styles.parkingDuration}>{details?.pricePerHour || 'Rs 70/='}</Text>
          </View>
        </View>

        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.detailsButton} onPress={toggleModal}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unparkButton}>
            <Text style={styles.unparkButtonText}>Show QR</Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            
              <Text style={styles.modalTitle}>{activeSection == 'warden'?"Warden": "Parking Lot"} Details</Text>
            {activeSection === 'warden' ? (
                
              <View style={styles.modalContent}>
                
                <Text style={styles.modalText}>Name: {details?.warden_fname} {details?.warden_lname}</Text>
                <Text style={styles.modalText}>Contact: {details?.warden_contact || 'N/A'}</Text>
                <Text style={styles.modalText}>Hometown: {details?.warden_city || 'N/A'}</Text>
              </View>
            ) : (
              <View style={styles.modalContent}>
                
                <Text style={styles.modalText}>Lot Name: {details?.lot_name}</Text>
                <Text style={styles.modalText}>Location: {details?.lot_city}</Text>
                <Text style={styles.modalText}>Price per Hour: {details?.pricePerHour || 'N/A'}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.switchButton} onPress={switchSection}>
              <Text style={styles.switchButtonText}>{activeSection === 'warden' ? 'Show Parking Lot Details' : 'Show Warden Details'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp('5%'),
  },
  headingContainer: {
    marginVertical: hp('3%'),
    alignItems: 'center',
  },
  heading: {
    fontSize: wp('8.5%'),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  heading2: {
    fontSize: wp('5.5%'),
    fontWeight: 'semibold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: hp('0.5%'),
  },
  vehicleDetailsContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  vehicleImage: {
    width: wp('55%'),
    height: hp('22%'),
    resizeMode: 'contain',
    marginBottom: hp('2%'),
  },
  vehicleName: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: colors.primary,
  },
  vehicleNumber: {
    fontSize: wp('6%'),
    color: colors.primary,
    fontWeight: '500',
  },
  parkingDetailsContainer: {
    backgroundColor: colors.primary_light,
    padding: wp('5%'),
    borderRadius: hp('2%'),
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: hp('5%'),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp('1.5%'),
  },
  parkingDetailsText: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: colors.primary,
  },
  parkingLocation: {
    fontSize: wp('5%'),
    color: colors.black,
    textAlign: 'right',
  },
  parkingDuration: {
    fontSize: wp('5%'),
    color: colors.black,
    textAlign: 'right',
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
  },
  detailsButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1%'),
  },
  detailsButtonText: {
    fontSize: wp('5%'),
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  unparkButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1%'),
  },
  unparkButtonText: {
    fontSize: wp('5%'),
    color: colors.white,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: hp('2%'),
    padding: wp('5%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: hp('2%'),
  },
  modalContent: {
    
    marginBottom: hp('3%'),
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalSectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: hp('1%'),
  },
  modalText: {
    textAlign: 'center',
    fontSize: wp('4.5%'),
    color: colors.black,
    marginBottom: hp('1%'),
  },
  switchButton: {
    backgroundColor: colors.secondary,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: hp('1%'),
    marginBottom: hp('2%'),
  },
  switchButtonText: {
    fontSize: wp('5%'),
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: colors.secondary,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: hp('1%'),
  },
  modalCloseButtonText: {
    fontSize: wp('5%'),
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorText: {
    fontSize: wp('5%'),
    color: colors.error,
    textAlign: 'center',
    marginTop: hp('5%'),
  },
});
