import { StripeProvider } from '@stripe/stripe-react-native';
import CheckoutScreen from './CheckoutScreen';
import {STRIPE_PK} from './config';

export default function App() {
  return (
    <StripeProvider
      publishableKey={STRIPE_PK}
      merchantIdentifier="merchant.com.example"
    >
      <CheckoutScreen />
    </StripeProvider>
  );
}
