import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import {responsiveWidth} from "react-native-responsive-dimensions";

import colors from "../../constants/Colors"

export default function Button({
                                   title,
                                   onPress,
                               }: {
    title: string;
    onPress: () => void;
}) {
    const { width } = Dimensions.get("window");

    return (
        <TouchableOpacity
            style={[
                styles.buttonContainer,
                {
                    width: width * 1 - 150,
                    height: 40,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                },
            ]}
            onPress={() => onPress()}
        >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: colors.primary,
        width: responsiveWidth(88),
        height: responsiveWidth(2.5),
        borderRadius: 5,
        marginHorizontal: 5,
    },
});
