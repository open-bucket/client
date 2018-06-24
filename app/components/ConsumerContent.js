import * as React from 'react';
import { Table, Row, Col, Button, Tag, Tooltip } from 'antd';
import Tier from '../components/Tier';

export default class ConsumerContent extends React.Component {
  render() {
    const dataSource = [{
      key: '1',
      name: 'Mike',
      status: '3/3',
      size: '10 GB'
    }, {
      key: '2',
      name: 'John',
      status: '3/3',
      size: '10 GB'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    }];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };

    const { id, address, tier } = this.props;

    return (
      <div>
        <Row>
          <h1>Consumer {id}</h1>
        </Row>
        <Row type="flex" justify="space-between" gutter={8}>
          <Col>
            <h2>Files</h2>
          </Col>
          <Col>
            <Button shape="circle" icon="delete" />
            <Button shape="circle" icon="download" style={{ marginLeft: '4px' }} />
            <Button shape="circle" icon="plus" style={{ marginLeft: '4px' }} />
          </Col>
        </Row>
        <Row>
          <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
        </Row>
        <Row>
          <h2>Payment</h2>
        </Row>
        <Row type="flex" justify="start">
          <Col span={4}>
            <h3>Address:</h3>
          </Col>
          <Col span={6}>
            {address}
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span={4}>
            <h3>Balance:</h3>
          </Col>
          <Col>
        10000 ETH
            <Button shape="circle" icon="plus" size="small" style={{ marginLeft: '4px' }} />
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span={4}>
            <h3>Tier:</h3>
          </Col>
          <Col>
            <Tier tier={tier} />
            <Button shape="circle" icon="up" size="small" />
          </Col>
        </Row>
        <Row type="flex" justify="start" align="middle" gutter={8}>
          <Col>
            <h2 style={{ marginBottom: '0' }}>Configs</h2>
          </Col>
          <Col>
            <Button shape="circle" size="small" icon="edit" />
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col span={4}>
            <h3>Space:</h3>
          </Col>
          <Col>
            <span>C://</span>
          </Col>
        </Row>
      </div>
    );
  }
}
