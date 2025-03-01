import { StripeProvider } from '@stripe/stripe-react-native';
import { useStripe } from "@stripe/stripe-react-native";
import React, { useEffect, useState } from "react";
import { Alert, Text, SafeAreaView, StyleSheet, View } from "react-native";
import Button from '../components/Button';
import { API_URL, STRIPE_PK } from "../config";
import CartService from '../services/CartService';
import { ItemCart } from '../types/ItemCart';

export default function CheckoutScreen({navigation, route}: any) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState<string>("");

    const { cart } = route.params;

    if ( cart.length <= 0 ) {
        alert('Can\'t checkout empty shopping cart');
        navigation.goBack();
    }

    const userId = 1;
    const amount = cart.reduce((sum: number, item: ItemCart) => {
        return sum + (item.price * item.inCart);
    }, 0);

    const idsNotFlatten = cart.map((item: ItemCart) => {
        const ids = [];
        for ( let i = 0; i < item.inCart; i++ ) {
            ids.push(item.id);
        }
        return ids;
    });
    const itemsId = idsNotFlatten.flat();    
    
    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/payments/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "amount": amount,
                "customer_id": userId
            })
        });

        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            allowsDelayedPaymentMethods: false,
        });

        if (!error) {
            setPaymentIntentId(paymentIntent);
            setLoading(true);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            const paymentIntent = `pi_${paymentIntentId.split("_")[1]}`;
            const response = await fetch(`${API_URL}/payments/check/${paymentIntent}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "items_id": itemsId,
                    "customer_id": userId
                })
            });


            if (response.status == 200) {
                Alert.alert('Success', 'Your order is confirmed!');
                CartService.clearCart();
                navigation.popToTop();
            }
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StripeProvider
                publishableKey={STRIPE_PK}
                merchantIdentifier="merchant.com.example">
                <View style={styles.fill}>
                    <Text style={styles.text}>Your order amount is {amount / 100}€</Text>
                    <Text style={styles.text}>To proceed checkout please click the button below</Text>
                </View>
                
                <Button
                    disabled={!loading}
                    title="Checkout"
                    onPress={openPaymentSheet}
                />
            </StripeProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
  },
  fill: {
    flex: 1,
    marginTop: 30
  }
});