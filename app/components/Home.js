// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div data-tid="container">
          <h2>Home</h2>
          <Button type="primary">hehehe</Button>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
