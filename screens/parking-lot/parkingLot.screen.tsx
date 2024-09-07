import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import colors from '../../constants/Colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import StarRating from '@/components/rating/StarRating';
import AutoScroller from '@/components/ScrollView/AutoScroller';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {EXPO_PUBLIC_API_KEY} from '../../config'



interface Review {
  name: string;
  rating: number;
  text: string;
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


  const { id } = useLocalSearchParams();

  const EXPO_PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY

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

        // Parse and set reviews with dates
        const reviewsWithDates = (data.data.reviews || []).map((review: any) => ({
          ...review,
          created_at: new Date(review.created_at),
        }));
        setReviews(reviewsWithDates);

        // Set slot prices
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

  const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (!dateObj.getTime()) return 'Unknown date'; // Check if date is valid

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
    <LinearGradient colors={[colors.secondary_light, colors.secondary_light]} style={{ flex: 1 }}>
      <SafeAreaView style={styles.firstContainer}>
        <View style={styles.topContainer}>
          <AutoScroller />
          <View style={styles.status}>
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 16, color: parkingLotData?.lot?.status === 'active' ? 'green' : 'red' }}>
              {parkingLotData?.lot?.status === 'active' ? 'Open' : 'Closed'}
            </Text>
          </View>
          <View style={styles.name}>
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 25 }}>
              {parkingLotData?.lot?.name || 'Parking Lot Name'}
            </Text>
          </View>
          <View style={styles.des}>
            <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 16, padding: 5, textAlign: 'center' }}>
              {parkingLotData?.lot?.description || 'Description of the parking lot'}
            </Text>
          </View>
        </View>
        <View style={styles.MidContainer}>

<View style={styles.middleContainer}>

          {/* Slot Prices Section */}
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
          {/* Capacities Section */}
          <View style={styles.section}>
        <Text style={styles.sectionHeader}>Capacities</Text>
        <View style={styles.capacitiesContainer}>
          <View style={styles.cap}>
            <Image style={styles.vehicleIcon} source={require('@/assets/images/car_side.png')} />
            <Text style={styles.capacityAvailable}>200</Text>
            <Text style={styles.capacityTotal}>/250</Text>
          </View>
          <View style={styles.cap}>
            <Image style={styles.vehicleIcon} source={require('@/assets/images/bike_side.png')} />
            <Text style={styles.capacityAvailable}>150</Text>
            <Text style={styles.capacityTotal}>/200</Text>
          </View>
        </View>
      </View>

          </View>
        
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 18, marginBottom: 2 }}>
              Reviews & Ratings
            </Text>
          </View>
          <ScrollView style={styles.reviewsScrollView}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <View key={index} style={styles.review}>
                  <View style={styles.header}>

                    <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 14 }}>{review?.driver_fname} {review?.driver_lname}</Text>

              
                    <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 12 }}>{formatDate(review.created_at)}</Text>
                  </View>
                  <View style={styles.body}>
                    <Text style={{ fontFamily: 'Nunito_400Regular', marginBottom: 5, marginTop: 10, fontSize: 16 }}>{review?.review}</Text>
                    <StarRating rating={review.rating} />
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ textAlign: 'center', fontFamily: 'Nunito_400Regular', fontSize: 16 }}>No reviews available</Text>
            )}
          </ScrollView>
        </View>
        {/* <View style={styles.BottomContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ backgroundColor: colors.secondary, padding: 5, borderRadius: 5 }}
          >
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 14 }}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: colors.primary, padding: 5, borderRadius: 5 }}
          >
            <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 14, color: colors.white }}>Navigate</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </LinearGradient>
  );
}

// styles
const styles = StyleSheet.create({
  firstContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    height: wp('100%'),
    position: 'absolute',
    top: 55,
  },
  status: {},
  name: {},
  des: {},
  MidContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 410,
    gap: 15,
    width: wp('100%'),
    height: wp('80%'),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    
  },

  section: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',  // Vertically centers the items inside the container
    alignItems: 'center',       // Horizontally centers the items inside the container
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginLeft:10,
    marginRight:10,
  },
  sectionHeader: {
    fontFamily: 'Raleway_700Bold',
    fontSize: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
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
  },
  
  capacities: {
    flex: 1,                   // Take equal width as slot prices section
    justifyContent: 'center',   // Center the items vertically
    alignItems: 'center',     // Align capacities to the right
  },

  middleContainer: {
    
    flexDirection: 'row',      // Align the slot prices and capacities side by side
    justifyContent: 'space-between', // Space between the two sections
    // Align the sections vertically in the middle
                // Add some padding for spacing
  },

  capacitiesContainer: {
    flexDirection: 'column',
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

  cap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('1%'),
    marginBottom: 10, // Added margin for spacing between rows
  },
  vehicleIcon: {
    width: 32,
    height: 32,
    marginRight: 5
  },
  reviewsScrollView: {
    padding: 10,
    height: 300,
    backgroundColor: colors.primary_light,
    margin: 2,
    borderRadius: 5,
    maxHeight: 180,
  },
  review: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 8,
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: wp('90%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    marginLeft: 8,
  },
  body: {
    paddingHorizontal: 10,
  },
  BottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('15%'),
  },
});
