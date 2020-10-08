import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {riderReducer} from './rider/riderReducer';

const rootReducer = combineReducers({
  rider: riderReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
