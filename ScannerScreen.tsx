import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { PREFIX_BARCODE } from './config';
import CartService from './services/CartService';
import ApiService from './services/ApiService';

export default function ScannerScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [inputText, setInputText] = useState<undefined|string>(undefined);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({type, data}: { type: string, data: string }) => {
    setScanned(true);
    const supposedId = data.replace(PREFIX_BARCODE, '');
    await fetchItemAndAddToBasket(supposedId);
  };

  const fetchItemAndAddToBasket = async (itemId: string) => {
        if ( !(/\d+/.test(itemId)) ) { 
            alert('Id is not valid !'); 
            return;
        }

        let data;
        try {
          data = await ApiService.getItem(itemId);
        } catch(e) {
          alert(e);
          return;
        }

        if ( !data ) {
          alert('Item not found !');
          return;
        }
        
        const id = data.id;
        await CartService.addToCart(id);
        alert('Item added to cart !');
    };

  return (
    <View style={styles.container}>
        {
            hasPermission ? 
                <BarCodeScanner
                    onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
                    style={styles.barcode}
                />
            : 
                (
                    <View>
                        <TextInput 
                            style={styles.input}
                            onChangeText={setInputText}
                            value={inputText}
                            placeholder="Item ID"
                            keyboardType="numeric"
                        />
                        <Button title='Add Item to basket' onPress={() => {fetchItemAndAddToBasket(inputText!)}} />
                    </View>
                )
        }
      { scanned && <Button title='Tap to scan again' onPress={() => { setScanned(false) } } /> }
      <Button
        title="Go to Shopping Cart"
        onPress={() => navigation.navigate('shoppingCart')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  barcode: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
