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
          {/* Slot Prices Section */}
          <View style={styles.slotPricesContainer}>
            {slotPrices.length > 0 ? (
              slotPrices.map((price, index) => (
                <View key={index} style={styles.slotPrice}>
                  <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 18 }}>
                    {price.type_name}: Rs. {price.amount_per_vehicle}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ fontFamily: 'Nunito_400Regular', fontSize: 16 }}>No slot prices available</Text>
            )}
          </View>
          {/* Capacities Section */}
          <View style={styles.capacities}>
            <View style={styles.cap}>
              <Image style={styles.vehicleIcon} source={require('@/assets/images/car_side.png')} />
              <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 18, color: 'green' }}> : 200</Text>
              <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 18, color: 'black' }}>/250</Text>
            </View>
            <View style={styles.cap}>
              <Image style={styles.vehicleIcon} source={require('@/assets/images/bike_side.png')} />
              <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 18, color: 'green' }}> : 200</Text>
              <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 18, color: 'black' }}>/250</Text>
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
                    //:TODO resolve this issue
                    <Text style={{ fontFamily: 'Nunito_700Bold', fontSize: 14 }}>{review.driver_fname} {review.driver_lname}</Text>
                    <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 12 }}>{formatDate(review.created_at)}</Text>
                  </View>
                  <View style={styles.body}>
                    <Text style={{ fontFamily: 'Nunito_400Regular', marginBottom: 5, marginTop: 10, fontSize: 16 }}>{review.review}</Text>
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
    gap: 10,
    width: wp('100%'),
    height: wp('80%'),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  slotPricesContainer: {
    marginBottom: 5,
    alignItems: 'center',
    width: wp('90%'),
  },
  slotPrice: {
    marginBottom: 10,
  },
  capacities: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap', // Added to handle overflow
  },
  cap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('1%'),
    marginBottom: 10, // Added margin for spacing between rows
  },
  vehicleIcon: {
    width: 32,
    height: 32,
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
