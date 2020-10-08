import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export const FailLoading = ({load}) => {
  return (
    <View>
      <Text style={styles.text}>Something went wrong</Text>
      <Button title="Try again" onPress={load} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});
