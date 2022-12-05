import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CartService from '../services/CartService';
import { ItemCart } from '../types/ItemCart';

export default function ShoppingCartScreen({navigation}: any) {

  const [cart, setCart] = useState<ItemCart[]>([]);

  const updateCart = () => {
    CartService.getItems().then(cart => {
      setCart(cart);
    });
  }

  useEffect(() => {
    updateCart();
  }, []);
  
  return (
    <View style={styles.container}>
        {cart.map((item: ItemCart) => {
            return (
              <View key={item.id}>
                <Text>
                  {item.name} - x{item.inCart} : {(item.inCart * item.price)/100}€
                </Text>
                
                <Button title="-" onPress={ () => {
                  CartService.decreaseQuantity(item.id);
                  updateCart();
                } } />
                <Button title="+" onPress={ () => {
                  CartService.addToCart(item.id);
                  updateCart();
                } } />
              </View>
            );
        })}
        
        <Button title='Pay' onPress={async () => navigation.navigate('checkout', { cart: await CartService.getItems() })}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
