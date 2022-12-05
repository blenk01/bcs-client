import { View, StyleSheet } from 'react-native';
import Button from '../components/Button';
import FabShoppingCart from '../components/FabShoppingCart';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
        <Button
            title="Scan a barcode"
            onPress={() => navigation.navigate('scanner')}
        />
        <FabShoppingCart navigation={navigation} />
        <Button
            title="View purchase history"
            onPress={() => navigation.navigate('purchaseHistory')}
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
    paddingHorizontal: 10,
  },
});
