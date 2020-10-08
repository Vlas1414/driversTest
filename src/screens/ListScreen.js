import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';
import {FailLoading} from '../components/FailLoading';

import {useDispatch, useSelector} from 'react-redux';
import {RiderRow} from '../components/RiderRow';
import {loadRiders} from '../store/rider/riderAction';

export const ListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const riders = useSelector((state) => state.rider.list);
  const totalRiders = useSelector((state) => state.rider.totalRiders);
  const loadingStatus = useSelector((state) => state.rider.loadingStatus);
  const [currentPageRiders, setCurrentPageRiders] = useState(0);

  const nextPage = () => {
    setCurrentPageRiders((prev) =>
      prev + 20 <= totalRiders ? prev + 20 : prev,
    );
  };
  const prevPage = () => {
    setCurrentPageRiders((prev) => (prev - 20 >= 0 ? prev - 20 : prev));
  };
  useEffect(() => {
    dispatch(loadRiders(currentPageRiders));
    navigation.setOptions({
      headerTitle: `Riders ${currentPageRiders}-${
        currentPageRiders + 20
      } (${totalRiders})`,
      headerRight: () => (
        <View style={styles.boxHeaderBtns}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('gray', true)}
            onPress={prevPage}>
            <Text style={styles.headerBtn}>Previous</Text>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('gray', true)}
            onPress={nextPage}>
            <Text style={styles.headerBtn}>Next</Text>
          </TouchableNativeFeedback>
        </View>
      ),
    });
  }, [currentPageRiders, totalRiders]);
  const namePress = (driverId) => {
    navigation.navigate('Rider', {
      driverId,
    });
  };
  const ridePress = (driverId) => {
    navigation.navigate('Races', {
      driverId,
    });
  };
  let content = <ActivityIndicator size="large" color="gray" />;
  switch (loadingStatus) {
    case 'ready':
      content = (
        <FlatList
          keyExtractor={(item) => item.driverId}
          data={riders}
          contentContainerStyle={styles.row}
          renderItem={({item}) => (
            <RiderRow
              familyName={item.familyName}
              givenName={item.givenName}
              namePress={() => namePress(item.driverId)}
              ridePress={() => ridePress(item.driverId)}
            />
          )}
        />
      );
      break;
    case 'fail':
      content = (
        <FailLoading load={() => dispatch(loadRiders(currentPageRiders))} />
      );
      break;
  }
  return <View style={styles.box}>{content}</View>;
};

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  row: {
    margin: 5,
  },
  boxHeaderBtns: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerBtn: {
    marginHorizontal: 5,
    textAlignVertical: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,

    //shadow ios
    shadowColor: '#000',
    shadowRadius: 0.03,
    shadowOffset: {width: 2, height: 2},
    //shadow android
    elevation: 3,
    backgroundColor: '#fff',
  },
});
