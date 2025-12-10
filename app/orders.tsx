import { CartItemType } from '@/context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface Order {
    id: string;
    date: string;
    items: CartItemType[];
    total: number;
    shippingDetails: {
        name: string;
        address: string;
        phone: string;
    };
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const storedOrders = await AsyncStorage.getItem('orders');
            if (storedOrders) {
                setOrders(JSON.parse(storedOrders).reverse()); // Show newest first
            }
        } catch (error) {
            console.error(error);
        }
    };

    const renderOrderItem = ({ item }: { item: Order }) => (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
                <Text style={styles.total}>₹{item.total.toFixed(2)}</Text>
            </View>
            <Text style={styles.orderId}>Order ID: {item.id}</Text>
            <View style={styles.items}>
                {item.items.map((cartItem, index) => (
                    <Text key={index} style={styles.itemText} numberOfLines={1}>
                        {cartItem.quantity}x {cartItem.product.title}
                    </Text>
                ))}
            </View>
            <View style={styles.shipping}>
                <Text style={styles.shippingLabel}>Shipped to:</Text>
                <Text style={styles.shippingText}>{item.shippingDetails.name}</Text>
                <Text style={styles.shippingText}>{item.shippingDetails.address}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.center}>
                        <Text style={styles.emptyText}>No orders found</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    list: {
        padding: 15,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2f95dc',
    },
    orderId: {
        fontSize: 12,
        color: '#999',
        marginBottom: 10,
    },
    items: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemText: {
        fontSize: 14,
        marginBottom: 2,
    },
    shipping: {
        marginTop: 5,
    },
    shippingLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        marginBottom: 2,
    },
    shippingText: {
        fontSize: 14,
        color: '#333',
    },
});
