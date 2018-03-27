// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter" data-tid="counter">to Counter</Link>
          <Button type="primary">Test Button with Ant Design</Button>
        </div>
      </div>
    );
  }
}
