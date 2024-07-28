// InfoList.tsx
import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

interface ListItem {
    id: string;
    main: string;
    sub: string;
}

interface InfoListProps {
    data: ListItem[];
}

const InfoList: React.FC<InfoListProps> = ({ data }) => {
    const renderItem = ({ item }: { item: ListItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.boldText}>{item.id}.</Text>
            <View style={styles.bodyContainer}>
                <Text style={styles.boldText}>{item.main}</Text>
                <Text style={styles.text}>{item.sub}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 5,
    },
    bodyContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    boldText: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 16,
        textAlign: 'justify',
    },
    text: {
        fontFamily: 'Nunito_400Regular',
        fontSize: 15,
        textAlign: 'justify',
    },
});

export default InfoList;
