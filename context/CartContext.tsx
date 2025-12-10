import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItemType {
    product: Product;
    quantity: number;
}

interface CartContextType {
    cartItems: CartItemType[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    incrementQuantity: (productId: number) => void;
    decrementQuantity: (productId: number) => void;
    clearCart: () => void;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        saveCart(cartItems);
    }, [cartItems]);

    const loadCart = async () => {
        try {
            const storedCart = await AsyncStorage.getItem('cart');
            if (storedCart) {
                setCartItems(JSON.parse(storedCart));
            }
        } catch (error) {
            console.error('Failed to load cart', error);
        }
    };

    const saveCart = async (items: CartItemType[]) => {
        try {
            await AsyncStorage.setItem('cart', JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save cart', error);
        }
    };

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    };

    const incrementQuantity = (productId: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const decrementQuantity = (productId: number) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.product.id === productId);
            if (existing && existing.quantity === 1) {
                return prev.filter((item) => item.product.id !== productId);
            }
            return prev.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                incrementQuantity,
                decrementQuantity,
                clearCart,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
