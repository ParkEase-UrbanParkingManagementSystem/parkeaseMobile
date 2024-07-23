import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    AntDesign,
    Entypo,
    FontAwesome,
    Fontisto,
    Ionicons,
    SimpleLineIcons,
} from "@expo/vector-icons";

interface StarRatingProps {
    maxStars?: number;
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ maxStars = 5, rating }) => {
    return (
        <View style={styles.container}>
            {[...Array(maxStars)].map((_, index) => {
                const starNumber = index + 1;
                return (
                    <FontAwesome
                        key={starNumber}
                        name={starNumber <= rating ? 'star' : 'star-o'}
                        size={20}
                        color={starNumber <= rating ? 'orange' : 'gray'}
                        style={styles.star}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    star: {
        marginHorizontal: 5,
    },
});

export default StarRating;
