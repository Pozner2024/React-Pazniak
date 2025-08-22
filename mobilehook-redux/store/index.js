import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import clientsReducer from './clientsSlice';

const rootReducer = combineReducers({
  clients: clientsReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
