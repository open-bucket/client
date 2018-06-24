import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import consumer from './consumer';
import consumerContent from './consumerContent';
import auth from './auth';

const rootReducer = combineReducers({
  counter,
  router,
  consumer,
  consumerContent,
  auth
});

export default rootReducer;
