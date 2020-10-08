import {LOAD_RIDERS, CHANGE_STATUS_LOADING, LOAD_RACES} from '../types';

const initialState = {
  list: [],
  races: [],
  totalRiders: null,
  totalRaces: null,
  loadingStatus: 'loading',
};
export const riderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_RIDERS:
      return {
        ...state,
        list: action.list,
        totalRiders: action.totalRiders,
        loadingStatus: 'ready',
      };
    case CHANGE_STATUS_LOADING:
      return {
        ...state,
        loadingStatus: action.status,
      };
    case LOAD_RACES:
      return {
        ...state,
        races: action.races,
        totalRaces: action.totalRaces,
        loadingStatus: 'ready',
      };
    default:
      return state;
  }
};
