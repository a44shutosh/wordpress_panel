import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import { persistStore } from 'redux-persist'


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
      let store         = createStoreWithMiddleware(rootReducer, initialState);
      let persistor     = persistStore(store);
      return {store, persistor};
}

