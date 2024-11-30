import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import colors from '../../constants/Colors';
import { EXPO_PUBLIC_API_KEY } from '../../config';

interface Notification {
  id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationsScreen() {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const markAsRead = async (id: string) => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/notifications/mark-read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, is_read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${EXPO_PUBLIC_API_KEY}/notifications/mark-read-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, is_read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await fetch(`${EXPO_PUBLIC_API_KEY}/notifications/get-notifications`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.error('Invalid data format: expected an array');
          setNotifications([]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={[colors.secondary_light2, colors.primary_light]} style={styles.container}>
      
      <View style={styles.headerContainer}>
                <Text style={styles.title}>Notifications</Text>
            </View>
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          
          {notifications.some(n => !n.is_read) && (
            <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <TouchableOpacity 
                key={notification.id} 
                onPress={() => !notification.is_read && markAsRead(notification.id)}
                style={[
                  styles.notificationCard,
                  !notification.is_read && styles.unreadCard
                ]}
              >
                <View style={styles.notificationContent}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  <Text style={styles.notificationMessage}>{notification.message}</Text>
                  <Text style={styles.notificationDate}>
                    {formatDate(notification.created_at)}
                  </Text>
                </View>
                {!notification.is_read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications yet</Text>
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
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: hp('6%'),
  },
  headerText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 24,
    color: '#000',
  },
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontFamily: 'Nunito_400Regular',
    color: colors.primary,
    fontSize: 14,
  },
  scrollViewContent: {
    padding: 16,
    paddingTop: 8,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: '#f0f9ff',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  notificationMessage: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationDate: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp('20%'),
  },
  emptyText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    color: '#666',
  },
});

