import {LOAD_RIDERS, CHANGE_STATUS_LOADING, LOAD_RACES} from '../types';
import {Http} from '../../http';
import {Alert} from 'react-native';

export const loadRiders = (offset) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_STATUS_LOADING,
      status: 'loading',
    });
    const request = await Http.get('drivers', 20, offset);
    const list = request.MRData.DriverTable.Drivers;
    dispatch({
      type: LOAD_RIDERS,
      list,
      totalRiders: request.MRData.total,
    });
  } catch (ex) {
    console.log('Error http request: ', ex);
    if (ex.message === 'Network request failed') {
      await Alert.alert('Error ', 'No network access');
    }
    dispatch({
      type: CHANGE_STATUS_LOADING,
      status: 'fail',
    });
  }
};
export const loadRaces = (riderId, currentPageRaces) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_STATUS_LOADING,
      status: 'loading',
    });
    const request = await Http.get(
      `drivers/${riderId}/races`,
      20,
      currentPageRaces,
    );
    const races = request.MRData.RaceTable.Races;
    dispatch({
      type: LOAD_RACES,
      races,
      totalRaces: request.MRData.total,
    });
  } catch (ex) {
    console.log('Error http request: ', ex);
    if (ex.message === 'Network request failed') {
      await Alert.alert('Error ', 'No network access');
    }
    dispatch({
      type: CHANGE_STATUS_LOADING,
      status: 'fail',
    });
  }
};
