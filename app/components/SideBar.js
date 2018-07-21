import * as React from 'react';
import { Layout, Menu, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;


export default class SideBar extends React.Component {
  render() {
    const { menus, title, handleAdd, onItemSelected, selectedKeys } = this.props;
    const menuItems = menus.map((value) =>
      <Menu.Item key={value.key}><Link to={value.link}>{value.text}</Link></Menu.Item>);
    return (
      <Sider breakpoint="md" collapsedWidth="0" style={{ background: '#fff', paddingTop: '4px' }}>
        <Row type="flex" align="middle">
          <div style={{ fontSize: 'larger', padding: '8px' }}>{title}</div>
          <div style={{ display: 'inline', margin: 'auto' }} />
          <Button size="small" shape="circle" icon="reload" onClick={this.handleAdd} />
          <Button size="small" shape="circle" icon="plus" style={{ marginLeft: '4px' }} onClick={handleAdd} />
        </Row>
        <Menu
          mode="inline"
          style={{ height: '100%' }}
          onSelect={onItemSelected}
          defaultSelectedKeys={selectedKeys}
        >
          {menuItems}
        </Menu>
      </Sider>
    );
  }
}
