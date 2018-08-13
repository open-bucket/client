import * as React from 'react';
import { Tag, Tooltip, Radio } from 'antd';
import { CONSUMER_TIERS } from '@open-bucket/daemon/dist/enums';

export default class Tier extends React.Component {
  render() {
    const { tier, onTierChange } = this.props;

    return (
      <Radio.Group value={tier} onChange={onTierChange}>
        <Tooltip title={(
          <div>
         Store: 0.03 USD/GB/month<br />
         Download: 0.05 USD/GB<br />
         Speed: Medium
          </div>
        )}
        >
          <Radio.Button value={CONSUMER_TIERS.BASIC}>
          Basic
          </Radio.Button>
        </Tooltip>
        <Tooltip title={(
          <div>
         Store: 0.075 USD/GB/month<br />
         Download: 0.05 USD/GB<br />
         Speed: Fast
          </div>
        )}
        >
          <Radio.Button value={CONSUMER_TIERS.PLUS}>
          Plus
          </Radio.Button>
        </Tooltip>
        <Tooltip title={(
          <div>
         Store: 0.15 USD/GB/month<br />
         Download: 0.05 USD/GB<br />
         Speed: Very Fast
          </div>
        )}
        >
          <Radio.Button value={CONSUMER_TIERS.PREMIUM}>
          Premium
          </Radio.Button>
        </Tooltip>
      </Radio.Group>
    );
  }
}
