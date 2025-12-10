import { Product } from '@/context/CartContext';
import { Image } from 'expo-image';
import { Href, Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}` as Href} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: product.image }} style={styles.image} contentFit="contain" />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>
                        {product.title}
                    </Text>
                    <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    info: {
        width: '100%',
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2f95dc',
    },
});
