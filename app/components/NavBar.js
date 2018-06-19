import * as React from 'react';
import { Menu, Row, Col, Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const menu = (
  <Menu>
    <Menu.Item key="1">Setting</Menu.Item>
    <Menu.Item key="2">Account</Menu.Item>
    <Menu.Item key="3"><Link to="/login">Logout</Link></Menu.Item>
  </Menu>
);

export default class NavBar extends React.Component {
  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            selectedKeys={[this.props.isConsumer ? '0' : '1']}
          >
            <Menu.Item key="0"><Link to="/consumers">Consumers</Link></Menu.Item>
            <Menu.Item key="1"><Link to="/producers">Producers</Link></Menu.Item>
            {/* <Row >

        </Row> */}
          </Menu>
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click']}>
            <div>
              <span style={{ color: '#fff' }}> this.props.name </span>
              <Avatar>{this.props.avatar}</Avatar>
            </div>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}
