import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import ApiService from './services/ApiService';

export default function PurchaseHistory({ navigation }: any) {
    const customerId = 1;
    const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);

    useEffect(() => {
        ApiService.getPurchaseHistory(customerId).then(data => {
            const paymentsItems = [];
            for ( const payment of data ) {
                const combinedItems: {[id: number] : {name: string, price: number, count: number}} = {};
                for ( const jsonObject of payment.purchased_items ) {
                    const purchasedItem = jsonObject.item;
                    if ( combinedItems[purchasedItem.id] ) combinedItems[purchasedItem.id]['count']++;
                    else combinedItems[purchasedItem.id] = {
                        name: purchasedItem.name,
                        price: purchasedItem.price,
                        count: 1,
                    };
                }

                const items: {name: string, price: number, count: number}[] = [];
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
            {purchaseHistory.map(paymentsItems => {
                return  (
                    <View>
                    {paymentsItems.map(item => {
                        return (
                          <Text>{item.name} - {item.price/100}€/p - x{item.count} - {(item.price * item.count)/100}€</Text>  
                        );
                    })}
                    <Text>--</Text>
                    </View>
                );
            })}
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
    justifyContent: 'center',
  },
});
