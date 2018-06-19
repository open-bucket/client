import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;


export default class SideBar extends React.Component {
  render() {
    const menuItems = this.props.menus.map((value) =>
      <Menu.Item key={value.id}><Link to={value.link}>{value.text}</Link></Menu.Item>);

    return (
      <Sider>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {menuItems}
        </Menu>
      </Sider>
    );
  }
}
