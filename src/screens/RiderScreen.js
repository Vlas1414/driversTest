import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

export const RiderScreen = ({route}) => {
  const riderId = route.params.driverId;
  const rider = useSelector(
    (state) => state.rider.list.filter((e) => e.driverId === riderId)[0],
  );
  const openWiki = async () => {
    await Linking.openURL(rider.url);
  };

  return (
    <View style={styles.box}>
      <Text style={styles.title}>Driver id: {rider.driverId}</Text>
      <View style={styles.textBox}>
        <Text style={styles.title}>Wiki: </Text>
        <View style={styles.btnBox}>
          <TouchableNativeFeedback onPress={openWiki}>
            <Text style={styles.btnText}>Open link</Text>
          </TouchableNativeFeedback>
        </View>
      </View>
      <Text style={styles.title}>Given name: {rider.givenName}</Text>
      <Text style={styles.title}>Family name: {rider.familyName}</Text>
      <Text style={styles.title}>Date of birth: {rider.dateOfBirth}</Text>
      <Text style={styles.title}>Nationality: {rider.nationality}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  textBox: {
    flexDirection: 'row',
  },
  btnBox: {
    backgroundColor: 'gray',
    borderRadius: 5,
    height: 30,
    overflow: 'hidden',
  },
  btnText: {
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
