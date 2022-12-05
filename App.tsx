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
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="scanner" component={ScannerScreen} />
        <Stack.Screen name="shoppingCart" component={ShoppingCartScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
        <Stack.Screen name="purchaseHistory" component={PurchaseHistory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
