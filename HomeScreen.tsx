import { View, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
        <Button
            title="Scan a barcode"
            onPress={() => navigation.navigate('scanner')}
        />
        <Button
            title="Go to Shopping Cart"
            onPress={() => navigation.navigate('shoppingCart')}
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
