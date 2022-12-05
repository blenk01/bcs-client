import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CartService from './services/CartService';

export default function ShoppingCartScreen({navigation}: any) {

  const [cart, setCart] = useState<{id: string, name: string, price: number, inCart:number}[]>([]);

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
        {cart.map(item => {
            return (
              <View>
                <Text key={item.id}>
                  {item.name} - x{item.inCart} : {item.inCart * item.price}$
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
        
        <Button title='Payer' onPress={async () => navigation.navigate('checkout', { cart: await CartService.getItems() })}  />
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
