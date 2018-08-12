import * as React from 'react';
import { Tag, Tooltip, Radio } from 'antd';
import { CONSUMER_TIERS } from '@open-bucket/daemon/dist/enums';

const tierToColor = (tier) => ({
  [CONSUMER_TIERS.BASIC]: 'green',
  [CONSUMER_TIERS.PLUS]: 'gold',
  [CONSUMER_TIERS.PREMIUM]: 'purple'
}[tier]);

export default class Tier extends React.Component {
  render() {
    const { tier, onTierChange } = this.props;

    return (
      <Radio.Group value={tier} onChange={onTierChange}>
        <Tooltip title="0.001 ETH/month">
          <Radio.Button value={CONSUMER_TIERS.BASIC}>
          Basic
          </Radio.Button>
        </Tooltip>
        <Tooltip title="0.015 ETH/month">
          <Radio.Button value={CONSUMER_TIERS.PLUS}>
          Plus
          </Radio.Button>
        </Tooltip>
        <Tooltip title="0.03 ETH/month">
          <Radio.Button value={CONSUMER_TIERS.PREMIUM}>
          Premium
          </Radio.Button>
        </Tooltip>
      </Radio.Group>
    );
  }
}
