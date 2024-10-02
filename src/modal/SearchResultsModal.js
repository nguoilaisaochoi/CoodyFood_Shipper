import React from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const SearchResultsModal = ({ visible, onClose, searchQuery, suggestedProducts }) => {
    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
        </View>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={suggestedProducts}
                                renderItem={renderProduct}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default SearchResultsModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 100, // Adjust this value to position the modal below the search bar
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    productContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    productName: {
        fontSize: 16,
    },
});