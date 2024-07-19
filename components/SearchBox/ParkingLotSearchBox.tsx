import React, { useState } from 'react';
import {View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {router} from "expo-router";

interface ParkingLotSearchBoxProps {
    data: string[];
    isModalVisible: boolean;
    setIsModalVisible: (visible: boolean) => void;
}

const ParkingLotSearchBox: React.FC<ParkingLotSearchBoxProps> = ({ data, isModalVisible, setIsModalVisible }) => {
    const [query, setQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<string[]>(data);

    const handleSearch = (text: string) => {
        setQuery(text);
        if (text) {
            const newData = data.filter(item => {
                const itemData = item.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
        } else {
            setFilteredData(data);
        }
    };
    const handlePress = () => {{
        router.push('/(routes)/parking-lot');
        setIsModalVisible(false)
    }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Search..."
                value={query}
                onChangeText={text => handleSearch(text)}
            />
            <FlatList
                data={filteredData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    itemText: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ParkingLotSearchBox;
