import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutScreen from './CheckoutScreen';
import {STRIPE_PK} from './config';
import ScannerScreen from './ScannerScreen';
import ShoppingCartScreen from './ShoppingCartScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="scanner" component={ScannerScreen} />
        <Stack.Screen name="shoppingCart" component={ShoppingCartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
