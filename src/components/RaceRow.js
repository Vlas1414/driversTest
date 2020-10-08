import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
export const RaceRow = ({race}) => {
  const openWiki = async () => {
    await Linking.openURL(race.url);
  };
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{race.season}</Text>
      <Text style={styles.text}>{race.round}</Text>
      <Text style={styles.text}>{race.raceName}</Text>
      <Text style={styles.text}>{race.Circuit.Location.country}</Text>
      <View style={styles.buttonBox}>
        <TouchableNativeFeedback onPress={openWiki}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Report</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  text: {
    margin: 0,
    fontSize: 15,
    width: 75,
    overflow: 'hidden',
    textAlign: 'center',
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
