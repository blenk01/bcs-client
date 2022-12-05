import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckoutScreen from './CheckoutScreen';
import ScannerScreen from './ScannerScreen';
import ShoppingCartScreen from './ShoppingCartScreen';
import HomeScreen from './HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="scanner" component={ScannerScreen} />
        <Stack.Screen name="shoppingCart" component={ShoppingCartScreen} />
        <Stack.Screen name="checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
