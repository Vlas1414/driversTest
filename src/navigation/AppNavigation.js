import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {ListScreen} from '../screens/ListScreen';
import {RiderScreen} from '../screens/RiderScreen';
import {RacesScreen} from '../screens/RacesScreen';

const MainNavigator = createStackNavigator();
function MyMainNavigator() {
  return (
    <MainNavigator.Navigator initialRouteName="List">
      <MainNavigator.Screen name="List" component={ListScreen} />
      <MainNavigator.Screen name="Rider" component={RiderScreen} />
      <MainNavigator.Screen name="Races" component={RacesScreen} />
    </MainNavigator.Navigator>
  );
}
export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <MyMainNavigator />
    </NavigationContainer>
  );
};
