import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
export const RiderRow = ({familyName, givenName, namePress, ridePress}) => {
  return (
    <View style={styles.box}>
      <TouchableNativeFeedback onPress={namePress} style={styles.nameBox}>
        <Text style={styles.rider}>{givenName}</Text>
        <Text style={styles.rider}>{familyName}</Text>
      </TouchableNativeFeedback>
      <View style={styles.buttonBox}>
        <TouchableNativeFeedback onPress={ridePress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Races</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  nameBox: {
    flexDirection: 'row',
  },
  rider: {
    margin: 10,
    marginRight: 0,
    fontSize: 20,
  },
  buttonBox: {
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
