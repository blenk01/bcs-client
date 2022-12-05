import * as SecureStore from 'expo-secure-store';
import { CART_KEY } from '../config';

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
    }
};