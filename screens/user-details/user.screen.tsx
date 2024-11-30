import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_API_KEY } from '../../config';
import colors from '../../constants/Colors';
import { LinearGradient } from "expo-linear-gradient";

interface UserDetails {
  fname: string;
  lname: string;
  nic: string;
  gender: string;
  isparked: boolean;
  email: string;
  addressno: string;
  street_1: string;
  street_2: string;
  city: string;
  province: string;
  contact: string;
}

export default function UserDetailsScreen() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/driver/details`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });

      const parseRes = await response.json();

      if (response.ok) {
        setUserDetails(parseRes.data);
      } else {
        setError('Failed to fetch user details');
      }
    } catch (error) {
      setError('An error occurred while fetching user details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={[colors.secondary, colors.primary]} 
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#00f" />
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient
        colors={[colors.primary_light, colors.secondary_light]} 
        style={styles.container}
      >
        <Text style={styles.errorText}>{error}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.secondary_light2, colors.primary_light]} 
      style={styles.container}
    >
       <View style={styles.headerContainer}>
                <Text style={styles.title}>Driver Profile</Text>
            </View>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
         

          {userDetails && (
            <View style={styles.card}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{userDetails.fname} {userDetails.lname}</Text>
                <Text style={styles.label}>Gender:</Text>
                <Text style={styles.value}>{userDetails.gender}</Text>
                <Text style={styles.label}>NIC:</Text>
                <Text style={styles.value}>{userDetails.nic}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Address</Text>
                <Text style={styles.value}>{userDetails.addressno}, {userDetails.street_1}</Text>
                <Text style={styles.value}>{userDetails.street_2}</Text>
                <Text style={styles.value}>{userDetails.city}, {userDetails.province}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userDetails.email}</Text>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{userDetails.contact}</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Parking Status</Text>
                <Text style={styles.value}>{userDetails.isparked ? 'Parked' : 'Not Parked'}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

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

  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make sure the gradient takes full space
  },
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitle: {
    marginTop:5,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
