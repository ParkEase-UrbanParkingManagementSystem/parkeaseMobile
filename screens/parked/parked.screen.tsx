import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { router } from "expo-router";
import {EXPO_PUBLIC_API_KEY} from '../../config'


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
  type_id: number;
  driver_id: string;
  vehicle_id: string;
  parking_toll_amount: string;
}

export default function ParkedScreen() {
 
  const [details, setDetails] = useState<ParkingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isQRModalVisible, setIsQRModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<'warden' | 'lot'>('warden');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/parking-details`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token || "",
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.message === "No parking details found") {
          setDetails(null); // No parking details
        } else {
          setDetails(data.data);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    console.log(details);

    fetchDetails();
  }, []);

  const toggleDetailsModal = () => {
    setIsDetailsModalVisible(!isDetailsModalVisible);
  };

  const toggleQRModal = () => {
    setIsQRModalVisible(!isQRModalVisible);
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

  if (!details) {
    return (
      <LinearGradient colors={[colors.secondary_light, colors.secondary_light]} style={styles.gradient}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.noDetailsText}>Your vehicle is not currently parked. Please ask the warden to scan your QR code in order to start parking</Text>
        </SafeAreaView>
      </LinearGradient>
    );
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
        <Text style={styles.heading}>Your {details?.vehicle_name || 'Unknown Vehicle'}</Text>
        <Text style={styles.heading2}>is Parked in</Text>
        <Text style={styles.headingLot}>{details?.lot_name || 'Unknown Lot'}</Text>
      </View>

        <View style={styles.vehicleDetailsContainer}>
          <Image
            style={styles.vehicleImage}
            source={require('@/assets/images/home.png')} 
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
            <Text style={styles.parkingDuration}>{details?.type_id === 1 ? "Car" : details?.type_id === 2 ? "Bike" : details?.type_id === 3 ? "Three-Wheeler" : "Large Vehicle"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.parkingDetailsText}>Price per Hour:</Text>
            <Text style={styles.parkingDuration}>{details?.parking_toll_amount || 'Rs 70/='}</Text>
          </View>
        </View>

        <View style={styles.actionButtonContainer}>
          <TouchableOpacity style={styles.detailsButton} onPress={toggleDetailsModal}>
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.unparkButton} onPress={toggleQRModal}>
            <Text style={styles.unparkButtonText}>Show QR</Text>
          </TouchableOpacity>
        </View>

        {/* Details Modal */}
        <Modal isVisible={isDetailsModalVisible} onBackdropPress={toggleDetailsModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{activeSection === 'warden' ? "Warden" : "Parking Lot"} Details</Text>
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
                <Text style={styles.modalText}>Price per Hour: {details?.parking_toll_amount || 'Rs 70/='}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.switchButton} onPress={switchSection}>
              <Text style={styles.switchButtonText}>{activeSection === 'warden' ? 'Show Parking Lot Details' : 'Show Warden Details'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleDetailsModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>

            
          </View>
        </Modal>

        {/* QR Modal */}
        <Modal isVisible={isQRModalVisible} onBackdropPress={toggleQRModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Parking QR Code</Text>
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={`Vehicle: ${details.vehicle_id}, User: ${details.driver_id}`}
                size={wp('60%')}
              />
            </View>
            <Text style={styles.modalTitle2}>Ask your warden to scan this QR to exit your vehicle</Text>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => { router.push("/(routes)/payment/wallet"); toggleQRModal(); }}>
              <Text style={styles.modalCloseButtonText}>Go to Payments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCloseButton} onPress={toggleQRModal}>
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
    marginVertical: hp('4%'),
    alignItems: 'center',
  },
  heading: {
    fontSize: wp('9%'),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: hp('1%'),
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  heading2: {
    fontSize: wp('7%'),
    color: colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('1%'),
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  headingLot: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: hp('1%'),
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  vehicleDetailsContainer: {
    alignItems: 'center',
  },
  vehicleImage: {
    width: wp('80%'),
    height: hp('20%'),
    resizeMode: 'contain',
    marginBottom: hp('2%'),
  },
  vehicleName: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  vehicleNumber: {
    fontSize: wp('6%'),
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  parkingDetailsContainer: {
    marginVertical: hp('3%'),
    alignItems: 'flex-start',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
    marginBottom: hp('2%'),
  },
  parkingDetailsText: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: colors.primary,
  },
  parkingLocation: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: colors.primary,
  },
  parkingDuration: {
    fontSize: wp('5%'),
    fontWeight: '600',
    color: colors.primary,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%'),
  },
  detailsButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('3%'),
  },
  detailsButtonText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  unparkButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('3%'),
  },
  unparkButtonText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: wp('5%'),
  },
  modalTitle: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  modalTitle2: {
    fontSize: wp('5%'),
    fontWeight: '400',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  modalContent: {
    marginBottom: hp('2%'),
  },
  modalText: {
    fontSize: wp('5%'),
    color: colors.primary,
    marginBottom: hp('1%'),
  },
  switchButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  switchButtonText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    marginBottom: hp('2%'),
  },
  modalCloseButtonText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    fontSize: wp('4.5%'),
    color: 'red',
    textAlign: 'center',
  },
  noDetailsText: {
    fontSize: wp('5.5%'),
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginTop: hp('40%'),
  },
  qrCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('3%'),
  },
});
