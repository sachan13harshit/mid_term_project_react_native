import { CartItemType, useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

    return (
        <View style={styles.container}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.product.title}
                </Text>
                <Text style={styles.price}>₹{item.product.price.toFixed(2)}</Text>
                <View style={styles.controls}>
                    <TouchableOpacity
                        onPress={() => decrementQuantity(item.product.id)}
                        style={styles.button}
                    >
                        <Ionicons name="remove" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => incrementQuantity(item.product.id)}
                        style={styles.button}
                    >
                        <Ionicons name="add" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => removeFromCart(item.product.id)}
                style={styles.removeButton}
            >
                <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2f95dc',
        marginBottom: 8,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
    },
    quantity: {
        marginHorizontal: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    removeButton: {
        padding: 10,
    },
});
