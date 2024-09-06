import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileIcon = ({ userName }) => {
  // Get the first letter of the username
  const firstLetter = userName ? userName.charAt(0).toUpperCase() : '?';

  return (
    <View style={styles.profileIcon}>
      <Text style={styles.profileText}>{firstLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileIcon: {
    backgroundColor: '#000', // Background color of the icon
    borderRadius: 50,            // Makes it a circle
    width: 40,                   // Width of the icon
    height: 40,                  // Height of the icon
    justifyContent: 'center',    // Center the letter horizontally
    alignItems: 'center',        // Center the letter vertically
  },
  profileText: {
    color: '#FFB403',               // Text color (white)
    fontSize: 30,                // Font size of the letter
    fontWeight: 'bold',          // Bold letter
  },
});

export default ProfileIcon;
