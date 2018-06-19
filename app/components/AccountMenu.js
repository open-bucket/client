import * as React from 'react';
import { Menu, Dropdown, Button, Icon, message, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const menu = (
  <Menu>
    <Menu.Item key="1">Setting</Menu.Item>
    <Menu.Item key="2">Account</Menu.Item>
    <Menu.Item key="3"><Link to="/login">Logout</Link></Menu.Item>
  </Menu>
);

export default class AccountMenu extends React.Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <div>
          <span>this.props.name </span>
          <Avatar>{this.props.avatar}</Avatar>
        </div>
      </Dropdown>
    );
  }
}
