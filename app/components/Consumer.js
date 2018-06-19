import * as React from 'react';
import { Table } from 'antd';

export default class Consumer extends React.Component {
  render() {
    const dataSource = [{
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    }, {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }];

    return (
      <div>
        <h2>consumer {this.props.match.params.id}</h2>
        <Table columns={columns} dataSource={dataSource} />
      </div>);
  }
}
