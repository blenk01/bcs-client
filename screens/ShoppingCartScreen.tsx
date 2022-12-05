import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Button from '../components/Button';
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
        <View style={styles.itemsContainer}>
          {cart.map((item: ItemCart) => {
              return (
                <View key={item.id} style={styles.itemContainer}>
                  <Text style={styles.itemText}>
                    {item.name} - x{item.inCart} : {(item.inCart * item.price)/100}€
                  </Text>
                  
                  <View style={styles.itemButtonsContainer}>
                    <Button title="-" onPress={ () => {
                      CartService.decreaseQuantity(item.id);
                      updateCart();
                    } } />
                    <Button title="+" onPress={ () => {
                      CartService.addToCart(item.id);
                      updateCart();
                    } } />
                  </View>
                </View>
              );
          })}
        </View>
        <Button title='Pay' onPress={async () => navigation.navigate('checkout', { cart: await CartService.getItems() })}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  itemsContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'space-around',
    borderRadius: 10
  },
  itemText: {
    color: 'white',
    alignSelf: 'center',
    paddingLeft: 10
  },
  itemButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
