import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { Link, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Cart() {
    const { cartItems, totalPrice } = useCart();
    const router = useRouter();

    if (cartItems.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <Link href="/" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Go Shopping</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.product.id.toString()}
                contentContainerStyle={styles.list}
            />
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => router.push('/checkout')}
                >
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 20,
        marginBottom: 20,
        color: '#888',
        fontWeight: '500',
    },
    list: {
        padding: 15,
        paddingBottom: 120,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        paddingBottom: 30,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalPrice: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2f95dc',
    },
    checkoutButton: {
        backgroundColor: '#2f95dc',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#2f95dc',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    button: {
        backgroundColor: '#2f95dc',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
