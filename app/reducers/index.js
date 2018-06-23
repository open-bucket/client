import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import consumer from './consumer';

const rootReducer = combineReducers({
  counter,
  router,
  consumer
});

export default rootReducer;
