import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutScreen from './CheckoutScreen';
import {STRIPE_PK} from './config';
import ScannerScreen from './ScannerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    /*<StripeProvider
      publishableKey={STRIPE_PK}
      merchantIdentifier="merchant.com.example"
    >
      <CheckoutScreen />
    </StripeProvider>*/
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="scanner" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
