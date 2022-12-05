import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Button(props: {onPress: any, title: string, disabled?: boolean}) {
  const { onPress, title, disabled = false } = props;
  return (
     <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.3}
        onPress={onPress}
        style={styles.button}>
            <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginBottom: 1,
    marginTop: 1,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});