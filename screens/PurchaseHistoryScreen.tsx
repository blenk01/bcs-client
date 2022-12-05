import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/Button';
import ApiService from '../services/ApiService';

type itemType = {name: string, price: number, count: number};

export default function PurchaseHistory({ navigation }: any) {
    const customerId = 1;
    const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);

    useEffect(() => {
        ApiService.getPurchaseHistory(customerId).then(data => {
            const paymentsItems = [];
            for ( const payment of data ) {
                const combinedItems: {[id: number] : itemType} = {};
                for ( const jsonObject of payment.purchased_items ) {
                    const purchasedItem = jsonObject.item;
                    if ( combinedItems[purchasedItem.id] ) combinedItems[purchasedItem.id]['count']++;
                    else combinedItems[purchasedItem.id] = {
                        name: purchasedItem.name,
                        price: purchasedItem.price,
                        count: 1,
                    };
                }

                const items: itemType[] = [];
                for(const id in combinedItems) {
                    items.push(combinedItems[id]);
                }
                paymentsItems.push(items);
            }

            setPurchaseHistory(paymentsItems);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.purchasesContainer}>
                {purchaseHistory.map((paymentsItems, index) => {
                    return  (
                        <View key={index} style={styles.purchaseContainer}>
                            {paymentsItems.map((item: itemType, index: number) => {
                                return (
                                    <Text key={index} style={styles.purchaseText}>{item.name} - {item.price/100}€/p - x{item.count} - {(item.price * item.count)/100}€</Text>  
                                );
                            })}
                        </View>
                    );
                })}
            </View>
            <Button
                title="Go back"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  purchasesContainer: {
    flex: 1,
  },
  purchaseContainer: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  purchaseText: {
    color: 'white',
    textAlign: 'center',
  }
});
