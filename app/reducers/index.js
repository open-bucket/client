import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import consumer from './consumer';
import consumerContent from './consumerContent';
import auth from './auth';
import producer from './producer';
import producerContent from './producerContent';
import contract from './contract';

const rootReducer = combineReducers({
  counter,
  router,
  consumer,
  consumerContent,
  auth,
  producer,
  producerContent,
  contract
});

export default rootReducer;
