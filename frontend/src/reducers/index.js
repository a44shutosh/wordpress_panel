import { combineReducers } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native
import environment from '../reducers/environment';

const config = {
  key: 'root',
  blacklist: ['router'],
  storage,
}


const rootReducer = persistCombineReducers(config, {
    environment
})
export default rootReducer;