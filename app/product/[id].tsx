import { Product, useCart } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductDetails() {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { addToCart, cartItems, incrementQuantity, decrementQuantity } = useCart();
    const router = useRouter();

    const cartItem = product ? cartItems.find(item => item.product.id === product.id) : undefined;

    useEffect(() => {
        if (id) {
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then((response) => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2f95dc" />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Product not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.title }} />
            <ScrollView contentContainerStyle={styles.scroll}>
                <Image source={{ uri: product.image }} style={styles.image} contentFit="contain" />
                <View style={styles.info}>
                    <Text style={styles.title}>{product.title}</Text>
                    <Text style={styles.category}>{product.category}</Text>
                    <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                {cartItem ? (
                    <View style={styles.controls}>
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => decrementQuantity(product.id)}
                        >
                            <Ionicons name="remove" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{cartItem.quantity}</Text>
                        <TouchableOpacity
                            style={styles.controlButton}
                            onPress={() => incrementQuantity(product.id)}
                        >
                            <Ionicons name="add" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => addToCart(product)}
                    >
                        <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scroll: {
        padding: 20,
        paddingBottom: 100,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
    info: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2f95dc',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    button: {
        backgroundColor: '#2f95dc',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 5,
    },
    controlButton: {
        backgroundColor: '#2f95dc',
        padding: 10,
        borderRadius: 8,
        width: 50,
        alignItems: 'center',
    },
    quantity: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
