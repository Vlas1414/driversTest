import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';
import {RaceRow} from '../components/RaceRow';
import {FailLoading} from '../components/FailLoading';

import {useDispatch, useSelector} from 'react-redux';
import {loadRaces} from '../store/rider/riderAction';

export const RacesScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const riderId = route.params.driverId;
  const races = useSelector((state) => state.rider.races);
  const rider = useSelector(
    (state) => state.rider.list.filter((e) => e.driverId === riderId)[0],
  );
  const loadingStatus = useSelector((state) => state.rider.loadingStatus);
  const totalRaces = useSelector((state) => state.rider.totalRaces);
  const [currentPageRaces, setCurrentPageRaces] = useState(0);

  const nextPage = () => {
    setCurrentPageRaces((prev) => (prev + 20 <= totalRaces ? prev + 20 : prev));
  };
  const prevPage = () => {
    setCurrentPageRaces((prev) => (prev - 20 >= 0 ? prev - 20 : prev));
  };
  useEffect(() => {
    dispatch(loadRaces(rider.driverId, currentPageRaces));
    if (totalRaces > 20) {
      navigation.setOptions({
        headerTitle: () => (
          <Text style={{fontWeight: '700', fontSize: 13, marginLeft: -25}}>
            {rider.familyName} races {currentPageRaces}-{currentPageRaces + 20}{' '}
            ({totalRaces})
          </Text>
        ),
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
    } else {
      navigation.setOptions({
        headerTitle: `${rider.familyName} races`,
      });
    }
  }, [currentPageRaces, totalRaces]);
  let content = <ActivityIndicator size="large" color="gray" />;
  switch (loadingStatus) {
    case 'ready':
      content = (
        <View>
          <View style={styles.headerBox}>
            <Text style={styles.text}>Season</Text>
            <Text style={styles.text}>Round</Text>
            <Text style={styles.text}>Race Name</Text>
            <Text style={styles.text}>Country</Text>
            <Text style={styles.text}>Info</Text>
          </View>
          <FlatList
            keyExtractor={(item) => item.raceName + item.season}
            data={races}
            contentContainerStyle={styles.row}
            renderItem={({item}) => <RaceRow race={item} />}
          />
        </View>
      );
      break;
    case 'fail':
      content = (
        <FailLoading
          load={() => dispatch(loadRaces(rider.driverId, currentPageRaces))}
        />
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
  headerBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    margin: 5,
  },
  text: {
    fontSize: 15,
    width: 75,
    fontWeight: '700',
    textAlign: 'center',
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
