import * as SecureStore from 'expo-secure-store';
import { CART_KEY } from '../config';
import { ItemCart } from '../types/ItemCart';
import ApiService from './ApiService';

let cart: { [key: string]: number } = {};

(async () => {
    const storedCart = await SecureStore.getItemAsync(CART_KEY);
    if ( storedCart && storedCart !== '' ) cart = JSON.parse(storedCart);
})();

const saveCart = () => {
    return SecureStore.setItemAsync(CART_KEY, JSON.stringify(cart));
}

export default {
    addToCart: (itemId: string) => {
        if ( cart[itemId] ) cart[itemId]++;
        else { cart[itemId] = 1 }
        return saveCart();
    },
    decreaseQuantity: (itemId: string) => {
        if ( cart[itemId] ) cart[itemId]--;
        if ( cart[itemId] <= 0 ) delete cart[itemId];
        return saveCart();
    },
    clearCart: () => {
        cart = {};
        return saveCart();
    },
    getItems: async () => {
        const items: ItemCart[] = [];
        for ( const itemId in cart ) {
            const item: {id: string, name: string, price: number} = await ApiService.getItem(itemId);
            if ( item ) {
                const itemData: ItemCart = {
                    ...item,
                    inCart: cart[itemId]
                };
                items.push(itemData);
            }
        }

        return items;
    }
};