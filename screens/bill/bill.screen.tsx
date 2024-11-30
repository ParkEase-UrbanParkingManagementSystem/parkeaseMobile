import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import colors from "../../constants/Colors";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_API_KEY } from "../../config";

export default function ProfileScreen() {
  const [details, setDetails] = useState<any>(null);
  const { id } = useLocalSearchParams();

  const [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const formatDateOnly = (isoDate) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  const formatTimeOnly = (isoDate) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const calculateDuration = (inTime, outTime) => {
    if (!inTime || !outTime) return 'N/A';
  
    const start = new Date(inTime);
    const end = new Date(outTime);
  
    const durationInMs = end - start;
    const durationInMinutes = Math.floor(durationInMs / (1000 * 60));
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
  
    // For rounding up the hours
    const roundedHours = minutes > 0 ? hours + 1 : hours;
  
    return {
      formatted: `${hours} hours ${minutes} minutes`,
      roundedHours: `${roundedHours} hours`,
    };
  };
  
  // Usage example
  const duration = calculateDuration(
    details?.data?.instanceDetails?.in_time,
    details?.data?.instanceDetails?.out_time
  );

  // Ensure hooks are used in the same order
  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(
          `${EXPO_PUBLIC_API_KEY}/parking/get-instance-details/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token: token || "",
            },
          }
        );
        const parseRes = await response.json();

        if (response.ok) {
          setDetails(parseRes);
          
        } else {
          console.error("Error:", parseRes.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    console.log("Menna machan detailsssssssss",details);

    fetchInstances();
  }, [id]);

  if (!fontsLoaded || fontError) {
    return null;
  }
  return (
    <LinearGradient
        colors={[colors.primary_light, colors.secondary_light]}
        style={{flex:1}}
    >
        <SafeAreaView style={styles.firstContainer}>
            <View style={styles.bill}>
                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/checked.png')}
                        style={{width: 60, height: 60}}
                    />
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>Parking Completed</Text>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20, color: colors.success}}>{details?.data?.instanceDetails?.cost}</Text>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 24}}>{details?.data?.instanceDetails?.lot_name}</Text>
                    <View style={styles.dashedLine} />
                </View>
                <View style={styles.vehicle}>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 20}}>{details?.data?.instanceDetails?.vehicle_name}</Text>
                    <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>{details?.data?.instanceDetails?. licenseplate}</Text>
                </View>
                <View style={styles.duration}>
                <View style={styles.row}>
  <View style={styles.left}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>Parking Date</Text>
  </View>
  <View style={styles.right}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>
      : {formatDateOnly(details?.data?.instanceDetails?.in_time)}
    </Text>
  </View>
</View>
<View style={styles.row}>
  <View style={styles.left}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>In Time</Text>
  </View>
  <View style={styles.right}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>
      : {formatTimeOnly(details?.data?.instanceDetails?.in_time)}
    </Text>
  </View>
</View>
<View style={styles.row}>
  <View style={styles.left}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>Out Time</Text>
  </View>
  <View style={styles.right}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>
      : {formatTimeOnly(details?.data?.instanceDetails?.out_time)}
    </Text>
  </View>
</View>
<View style={styles.row}>
  <View style={styles.left}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>Duration</Text>
  </View>
  <View style={styles.right}>
    <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>
      : {duration.formatted}
    </Text>
  </View>
</View>

                    <View style={styles.dashedLine} />
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden ID</Text>
                        </View>
                        <View style={styles.right}>
                        <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>
                        : {`W${details?.data?.instanceDetails?.warden_id?.substring(0, 4).toUpperCase()}`}
                        </Text>
                        </View>

                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Warden Name</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {details?.data?.instanceDetails?. warden_fname} {details?.data?.instanceDetails?. warden_lname}</Text>
                        </View>
                    </View>
                    <View style={styles.dashedLine} />
                </View>
                <View style={styles.charge}>


                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Vehicle Type</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>:  
                                
                             {details?.data?.instanceDetails?. type_id == 1 ? ' Car' : details?.data?.instanceDetails?. type_id == 2 ? ' Bike' : details?.data?.instanceDetails?. type_id == 3 ? ' ThreeWheeler' : ' Large Vehicle'}

                            </Text>
                        </View>
                       
                    </View>


                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Type ID</Text>
                        </View>
                        <View style={styles.right}>
                        <Text style={{ fontFamily: "Nunito_600SemiBold", fontSize: 15 }}>
                             : {details?.data?.instanceDetails?.type_id}
                        </Text>

                        </View>
                       
                    </View>

                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Per Hour Fee</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: LKR 70</Text>
                            
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Rounded Hours</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>: {duration.roundedHours}</Text>
                            
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.left}>
                            <Text style={{fontFamily: "Nunito_600SemiBold", fontSize: 15}}>Total</Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={{fontFamily: "Nunito_700Bold", fontSize: 15}}>: {details?.data?.instanceDetails?.cost}</Text>
                        </View>
                    </View>
                </View>
            </View>
                <View style={styles.currentPaymentMethod}>
                    <Image
                        source={require('@/assets/images/visa.png')}
                        style={{width: 25, height: 25}}
                    />
                    <Text>Debit Card ••••1022</Text>
                    <TouchableOpacity
                        onPress={() => router.push("/(routes)/payment/paymentMethods")}
                        style={{marginLeft: 20}}
                    >
                        <Image
                            source={require('@/assets/images/next.png')}
                            style={{width: 15, height: 15}}
                        />
                    </TouchableOpacity>
                </View>
               
        </SafeAreaView>
    </LinearGradient>
)
}

// styles
export const styles = StyleSheet.create({
firstContainer: {
    flex: 1,
    alignItems: "center",
},
bill: {
    width: wp("90%"),
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center", // Ensures the component is centered
    paddingHorizontal: 20, // Reduce padding to avoid excessive spacing
    paddingVertical: 40, // Optional for vertical padding
    marginTop: hp("8%"), // Only margin-top instead of general margin
    marginBottom: hp("4%"), // Only margin-bottom instead of general margin
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
},

header:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
},
dashedLine: {
    width: '100%', // Adjust width as needed
    height: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 1, // Optional: to prevent rounding corners on the dashes
    marginVertical: 10,
},
vehicle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
},
duration: {
    display: "flex",
    flexDirection: "column",
},
row: {
    // borderStyle: "solid",
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 2
},
left: {
    // borderStyle: "solid",
    // borderWidth: 1,
    width: wp("30%"),
    alignItems: "flex-start",
    marginLeft: wp("16%"),
},
right: {
    // borderStyle: "solid",
    // borderWidth: 1,
    width: wp("50%"),
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 50,

},
charge: {
    display: "flex",
    flexDirection: "column",
},
bottomContainer: {

},
currentPaymentMethod: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    margin: 10,
    padding: 10,
    borderRadius: 15,

},
actionButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginTop: 10,
    width: wp("90%"),
    paddingHorizontal: 10,
},

});
