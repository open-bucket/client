import React, { Component } from 'react';
import Home from '../components/Home';

export default class HomePage extends Component {
  render() {
    const isConsumer = this.props.match.url.indexOf('producers') === -1;

    return (
      <Home isConsumer={isConsumer} match={this.props.match} />
    );
  }
}
