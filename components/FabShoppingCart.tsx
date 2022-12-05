import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function FabShoppingCart(props: {navigation: any}) {
    const {navigation} = props;
  return (
    <TouchableOpacity
        activeOpacity={0.3}
        onPress={() => navigation.navigate('shoppingCart')}
        style={styles.touchableOpacityStyle}>
            <View style={styles.floatingButtonStyle}>
                <Entypo name="shopping-cart" size={35} color="white" />
            </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    display: 'flex',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: "center"
  },
});