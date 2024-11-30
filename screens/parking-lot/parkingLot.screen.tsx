import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, Modal, Linking } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import StarRating from '@/components/rating/StarRating';
import AutoScroller from '@/components/ScrollView/AutoScroller';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { EXPO_PUBLIC_API_KEY } from '../../config';

interface Review {
  driver_fname: string;
  driver_lname: string;
  rating: number;
  review: string;
  created_at: string;
}

interface SlotPrice {
  type_name: string;
  amount_per_vehicle: string;
}

export default function ParkingLotScreen() {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });
  const [parkingLotData, setParkingLotData] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [slotPrices, setSlotPrices] = useState<SlotPrice[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchParkingLotDetails = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parkinglots/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token || '',
          },
        });
        const data = await response.json();
        setParkingLotData(data.data);

        const reviewsWithDates = (data.data.reviews || []).map((review: any) => ({
          ...review,
          created_at: new Date(review.created_at),
        }));
        setReviews(reviewsWithDates);

        setSlotPrices(data.data.slotPrices || []);

        console.log('Data:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchParkingLotDetails();
  }, [id]);

  if (!fontsLoaded) {
    return null;
  }

  console.log("Menna dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa",parkingLotData?.lot?.latitude, "Menna dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  console.log("Menna dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa",parkingLotData?.lot?.longitude, "Menna dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

  const openGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error("Failed to open Google Maps", err));
  };

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (!dateObj.getTime()) return 'Unknown date';

    const day = dateObj.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <LinearGradient colors={[colors.secondary_light, colors.primary_light]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.topContainer}>
            <AutoScroller />
            <View style={styles.status}>
              <Text style={[styles.statusText, { color: parkingLotData?.lot?.status === 'active' ? 'green' : 'red' }]}>
                {parkingLotData?.lot?.status === 'active' ? 'Open' : 'Closed'}
              </Text>
            </View>
            <View style={styles.name}>
              <Text style={styles.nameText}>
                {parkingLotData?.lot?.name || 'Parking Lot Name'}
              </Text>
            </View>
            <View style={styles.des}>
              <Text style={styles.desText}>
                {parkingLotData?.lot?.description || 'Description of the parking lot'}
              </Text>
            </View>
          </View>

          <View style={styles.midContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Slot Prices</Text>
              <View style={styles.slotPricesContainer}>
                {slotPrices.length > 0 ? (
                  slotPrices.map((price, index) => (
                    <View key={index} style={styles.slotPrice}>
                      <Text style={styles.slotPriceText}>
                        {price.type_name}: Rs. {price.amount_per_vehicle}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noPricesText}>No slot prices available</Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Capacities</Text>
              <View style={styles.capacitiesContainer}>
                <View style={styles.cap}>
                  <Image style={styles.vehicleIcon} source={require('@/assets/images/car_side.png')} />
                  <Text style={parkingLotData?.lot?.car_available > 10 ? styles.availableText : styles.notAvailableText}>{!parkingLotData?.lot?.car_available ? parkingLotData?.lot?.car_capacity : parkingLotData?.lot?.car_available}</Text>
                  <Text style={styles.capacityTotal}>/{parkingLotData?.lot?.car_capacity}</Text>
                </View>
                <View style={styles.cap}>
                  <Image style={styles.vehicleIcon} source={require('@/assets/images/bike_side.png')} />
                  <Text style={parkingLotData?.lot?.bike_available > 10 ? styles.availableText : styles.notAvailableText}>{!parkingLotData?.lot?.bike_available ? parkingLotData?.lot?.bike_capacity : parkingLotData?.lot?.bike_available}</Text>
                  <Text style={styles.capacityTotal}> / {parkingLotData?.lot?.bike_capacity}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.reviewsSection}>
            <Text style={styles.reviewsHeader}>Reviews & Ratings</Text>

                <View style={styles.containerBtn}>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.viewReviewsButton}>
              <Text style={styles.viewReviewsButtonText}>View Reviews</Text>
            </TouchableOpacity>
            <TouchableOpacity
      onPress={() => openGoogleMaps(parkingLotData?.lot?.latitude, parkingLotData?.lot?.longitude)} // Replace with your latitude and longitude
      style={styles.viewReviewsButton2}
    >
      <Text style={styles.viewReviewsButtonText}>Get Directions</Text>
    </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reviews</Text>
            <ScrollView style={styles.reviewsScrollView}>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <View key={index} style={styles.review}>
                    <View style={styles.reviewHeader}>
                      <Text style={styles.reviewerName}>{review.driver_fname} {review.driver_lname}</Text>
                      <Text style={styles.reviewDate}>{formatDate(review.created_at)}</Text>
                    </View>
                    <View style={styles.reviewBody}>
                      <Text style={styles.reviewText}>{review.review}</Text>
                      <StarRating rating={review.rating} />
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noReviewsText}>No reviews available</Text>
              )}
            </ScrollView>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  availableText: {
    color: 'green',
    fontWeight: 'bold',
  },
  notAvailableText: {
    color: 'red',
    fontWeight: 'bold',
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    height: wp('100%'),
    marginTop: 55,
  },
  status: {
    marginBottom: 10,
  },
  statusText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  },
  name: {
    marginBottom: 10,
  },
  nameText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 25,
    textAlign: 'center',
  },
  des: {
    marginBottom: 20,
  },
  desText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    padding: 5,
    textAlign: 'center',
  },
  midContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  section: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15, // Softer border radius
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  sectionHeader: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 20,
    marginBottom: 15, // Increased spacing
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    textAlign: 'center',
  },
  slotPricesContainer: {
    marginBottom: 20,
  },
  slotPrice: {
    marginBottom: 10,
  },
  slotPriceText: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 14,
    color: '#333',
  },
  noPricesText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  capacitiesContainer: {
    alignItems: 'center',
  },
  cap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  vehicleIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  capacityAvailable: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 18,
    color: 'green',
  },
  capacityTotal: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 18,
    color: '#333',
  },
  reviewsSection: {
    padding: 20,
    alignItems: 'center',
  },
  reviewsHeader: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 22,
    marginBottom: 15,
  },
  viewReviewsButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewReviewsButton2: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  viewReviewsButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background dim
    padding: 20, // Added padding
  },
  containerBtn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 25,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 20, // Softer corners
    padding: 25, // More padding for content
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10, // More shadow for better elevation
    elevation: 10, // Better visual separation
  },
  modalTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary_dark, // Stronger color
  },
  reviewsScrollView: {
    maxHeight: hp('50%'),
  },
  review: {
    backgroundColor: colors.secondary_light,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  reviewerName: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: '#333', // Darker text
  },
  reviewDate: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 12,
    color: '#666',
  },
  reviewBody: {
    marginTop: 5,
  },
  reviewText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    marginBottom: 10,
  },
  noReviewsText: {
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    color: '#666',
  },
  closeButton: {
    backgroundColor: colors.primary,
    padding: 15, // More padding for a better button feel
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
});


