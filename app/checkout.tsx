import { useCart } from '@/context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Checkout() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const { cartItems, totalPrice, clearCart } = useCart();
    const router = useRouter();

    const handleCheckout = async () => {
        if (!name || !address || !phone) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: cartItems,
            total: totalPrice,
            shippingDetails: { name, address, phone },
        };

        try {
            const existingOrders = await AsyncStorage.getItem('orders');
            const orders = existingOrders ? JSON.parse(existingOrders) : [];
            orders.push(order);
            await AsyncStorage.setItem('orders', JSON.stringify(orders));

            clearCart();
            Alert.alert('Success', 'Order placed successfully!', [
                { text: 'OK', onPress: () => router.replace('/orders') }
            ]);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to place order');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <Text style={styles.summaryText}>Items: {cartItems.length}</Text>
                <Text style={styles.summaryTotal}>Total: ₹{totalPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="John Doe"
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={address}
                    onChangeText={setAddress}
                    placeholder="123 Main St, City, Country"
                    multiline
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+1 234 567 8900"
                    keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.button} onPress={handleCheckout}>
                    <Text style={styles.buttonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        flexGrow: 1,
    },
    summary: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
    },
    summaryTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2f95dc',
        marginTop: 5,
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#2f95dc',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
