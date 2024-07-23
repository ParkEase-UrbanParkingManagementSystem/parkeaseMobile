import React, { useEffect, useRef, useState } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const images = [
    require('@/assets/ParkingLots/nugegodaSM_1.jpg'),
    require('@/assets/ParkingLots/nugegodaSM_2.jpg'),
    require('@/assets/ParkingLots/nugegodaSM_3.jpg'),
];

const { width } = Dimensions.get('window');

const AutoScrollingImages: React.FC = () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = (prevIndex + 1) % images.length;
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
                }
                return nextIndex;
            });
        }, 2000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageScrollView}
        >
            {images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                    <Image source={image} style={styles.parkingLotImage} />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageScrollView: {
        flexDirection: 'row',
        margin: 5,
        borderRadius: 10,
    },
    imageContainer: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parkingLotImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default AutoScrollingImages;