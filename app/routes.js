import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import ConsumerPage from './containers/ConsumerPage';
import ProducerPage from './containers/ProducerPage';

export default () => (
  <App>
    <Switch>
      <Route path="/consumers/:id?" component={ConsumerPage} />
      <Route path="/producers" component={ProducerPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/" component={LoginPage} />
    </Switch>
  </App>
);
