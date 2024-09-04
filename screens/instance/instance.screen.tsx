import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView, TextInput, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import {EXPO_PUBLIC_API_KEY} from '../../config'



const InstanceScreen = () => {
  const { id } = useLocalSearchParams();
  const [details, setDetails] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReviewType, setSelectedReviewType] = useState<'warden' | 'lot'>('warden');
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
 

    

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${EXPO_PUBLIC_API_KEY}/parking/get-instance-details/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token || '',
          },
        });
        const parseRes = await response.json();

        if (response.ok) {
          setDetails(parseRes.data);
          console.log('details:', parseRes.data);
          
          
        } else {
          console.error('Error:', parseRes.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchInstances();
  }, [id]);


  const postWardenReviews = async (review: string, rating: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/reviews/warden`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'token': token || '',
        },
        body: JSON.stringify({
           driver_id : details?.instanceDetails?.driver_id,
           warden_id : details?.instanceDetails?.warden_id,
           rating,
           review,
           
        }),
        });
        const parseRes = await response.json();
        console.log('Review:', parseRes);
    } catch (error) {
        console.error('Error:', error);
    }
    };


  const postParkingReviews = async (review: string, rating: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(details?.instaceDetails?.driver_id)
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/reviews/parking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'token': token || '',
        },
        body: JSON.stringify({
            driver_id : details?.instanceDetails?.driver_id,
            lot_id : details?.instanceDetails?.lot_id,
            rating,
            review,
        }),
        });
        const parseRes = await response.json();
        console.log('Review:', parseRes);
    } catch (error) {
        console.error('Error:', error);
    }
    };



  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Remaining empty stars
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={`full-${i}`} name="star" size={16} color={colors.secondary} />);
    }
  
    if (halfStar) {
      stars.push(<FontAwesome key="half" name="star-half" size={16} color={colors.secondary} />);
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesome key={`empty-${i}`} name="star-o" size={16} color={colors.secondary} />);
    }
  
    return stars;
  };

  const  formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

    const getDay = (date: Date) => date.getDate().toString().padStart(2, '0');
    const getMonthAbbr = (date: Date) => date.toLocaleString('default', { month: 'short' });

  const getElapsedTime = (inTime: string, outTime: string) => {
    let inDate = new Date(inTime);
    let outDate = new Date(outTime);

    // Ensure that the elapsed time is non-negative
    if (inDate > outDate) {
        [inDate, outDate] = [outDate, inDate];
    }

    const elapsedMs = outDate.getTime() - inDate.getTime();
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const remainingMinutes = elapsedMinutes % 60;

    // Handle cases where the elapsed time crosses midnight
    if (elapsedHours < 0) {
        return `${24 + elapsedHours} hrs ${remainingMinutes} mins`;
    }

    return `${elapsedHours} hrs ${remainingMinutes} mins`;
};
  

  const handleReviewSubmit = async () => {
    try {
      if (selectedReviewType === 'warden') {
        await postWardenReviews(review, rating);
      } else if (selectedReviewType === 'lot') {
        await postParkingReviews(review, rating);
      }
      console.log('Review submitted:', { rating, review, selectedReviewType });
      setIsModalVisible(false); // Close modal after submission
      setReview(''); // Clear review input
      setRating(0); // Reset rating
        Alert.alert('Review submitted successfully');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
     
          <ScrollView >
        <Text style={styles.title}>Parking Instance Details</Text>
        <Text style={styles.title2}>{getMonthAbbr(new Date(details?.instanceDetails.in_time))} {getDay(new Date(details?.instanceDetails.in_time))}</Text>
        <View style={styles.parkingDetails}>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Cost:</Text>
            <Text style={styles.highlightedValue}>Rs. {details?.instanceDetails?.cost}/=</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>In Time:</Text>
            <Text style={styles.value}>{ formatTime(details?.instanceDetails?.in_time)}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Out Time:</Text>
            <Text style={styles.value}>{ formatTime(details?.instanceDetails?.out_time)}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}> {getElapsedTime(details?.instanceDetails?.in_time,details?.instanceDetails?.out_time)} </Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Payment Status:</Text>
            <Text style={styles.value}>Paid</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.payment_method}</Text>
          </View>
          <View style={styles.detailsRow}>
            <Text style={styles.label}>Vehicle:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.vehicle_name}</Text>
          </View>
        </View>
        
        <View style={styles.detailsSection}>
          <Text style={styles.subHeader}>Warden Details</Text>
        
          <View style={styles.ratings}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                {details?.averageWardenRating ? getRatingStars(Number(details.averageWardenRating)) : null}
                </View>
                <Text style={styles.ratingNumber}>
                {details?.averageWardenRating
                    ? Number(details.averageWardenRating).toFixed(1)
                    : 'N/A'}
                </Text>
            </View>
            </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.warden_fname} {details?.instanceDetails?.warden_lname}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.warden_contact}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Hometown:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.warden_city}</Text>
          </View>
          <TouchableOpacity style={styles.reviewButton} onPress={() => {
            setSelectedReviewType('warden');
            setIsModalVisible(true);
          }}>
            <Text style={styles.reviewButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.detailsSection}>
          <Text style={styles.subHeader}>Parking Lot Details</Text>

          <View style={styles.ratings}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', marginRight: 5 }}>
                    {details?.averageLotRating ? getRatingStars(Number(details.averageLotRating)) : null}
                    </View>
                    <Text style={styles.ratingNumber}>
                    {details?.averageLotRating
                        ? Number(details.averageLotRating).toFixed(1)
                        : 'N/A'}
                    </Text>
                </View>
                </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Lot Name:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.lot_name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
              {details?.instanceDetails?.addressno}, {details?.instanceDetails?.street1}, {details?.instanceDetails?.street2}, {details?.instanceDetails?.city}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>District:</Text>
            <Text style={styles.value}>{details?.instanceDetails?.district}</Text>
          </View>
          
          <TouchableOpacity style={styles.reviewButton} onPress={() => {
            setSelectedReviewType('lot');
            setIsModalVisible(true);
          }}>
            <Text style={styles.reviewButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        

        <Modal
  isVisible={isModalVisible}
  onBackdropPress={() => setIsModalVisible(false)}
  style={styles.modal}
>
  <KeyboardAvoidingView
    style={styles.modalContent}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Add Review for</Text>
        <Text style={styles.modalTitle2}>
          {selectedReviewType === 'warden'
            ? `${details?.instanceDetails?.warden_fname} ${details?.instanceDetails?.warden_lname}`
            : `${details?.instanceDetails?.lot_name}`}
        </Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <FontAwesome
                name={star <= rating ? 'star' : 'star-o'}
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Write your review here..."
          placeholderTextColor={colors.primary}
          multiline
          numberOfLines={4}
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleReviewSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
</Modal>

      
    </SafeAreaView>
  );
};

export default InstanceScreen;

const styles = StyleSheet.create({

    detailRow: {
        flexDirection: 'row', // Align label and value horizontally
        justifyContent: 'space-between', // Space between label and value
        marginBottom: 12, // Space between rows
      },
      ratings: {
        flexDirection: 'row', // Align rating stars in a row
        alignItems: 'center', // Center align vertically
        marginBottom: 10, // Space below the rating stars
      },

  container: {
    flex: 1,
    padding: 5,
    backgroundColor: colors.secondary_light,
  },
  title: {
    marginTop: 20,
    fontSize: 28,
    fontFamily: 'Raleway_700Bold',
    color: colors.primary,
    marginBottom: 2,
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    fontFamily: 'Raleway_700Bold',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  ratingNumber: {
    fontSize: 14,          // Size of the numeric rating
    color: colors.primary, // Adjust color as needed
    marginRight: 5,        // Space between the number and the stars
    fontWeight: 'bold',    // Make the number stand out
  },
  
  parkingDetails: {
    padding: 20,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 25,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.secondary,
    marginRight: 8,
  },
  value: {
    color: '#333',
    fontSize: 15,
    fontWeight: 'semibold',
  },
  highlightedValue: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 22,
    fontFamily: 'Raleway_700Bold',
    marginBottom: 0,
    color: colors.primary,
  },
  detailsSection: {
    padding: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 25,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  reviewButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 30,
    backgroundColor: colors.secondary,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    marginBottom: 0,
  },
  modalTitle2: {
    fontSize: 24,
    fontFamily: 'Raleway_700Bold',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%',
  },
  textInput: {
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    width: '100%',
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
  },
});
