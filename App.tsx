import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutScreen from './screens/CheckoutScreen';
import ScannerScreen from './screens/ScannerScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import HomeScreen from './screens/HomeScreen';
import PurchaseHistory from './screens/PurchaseHistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="scanner" component={ScannerScreen} options={{ title: 'Scanner' }} />
        <Stack.Screen name="shoppingCart" component={ShoppingCartScreen} options={{ title: 'Shopping cart' }} />
        <Stack.Screen name="checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
        <Stack.Screen name="purchaseHistory" component={PurchaseHistory} options={{ title: 'Your purchases' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
