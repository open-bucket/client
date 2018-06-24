import * as React from 'react';
import { Tag, Tooltip } from 'antd';

export default class Tier extends React.Component {
  render() {
    const { tier } = this.props;
    switch (tier) {
      case 'BASIC':
        return (
          <Tooltip title="0.001 ETH/month">
            <Tag color="green">BASIC</Tag>
          </Tooltip>);
      case 'PLUS':
        return (
          <Tooltip title="0.015 ETH/month">
            <Tag color="gold">PLUS</Tag>
          </Tooltip>);
      case 'PREMIUM':
        return (
          <Tooltip title="0.03 ETH/month">
            <Tag color="purple">PREMIUM</Tag>
          </Tooltip>);
      default:
        break;
    }
  }
}
