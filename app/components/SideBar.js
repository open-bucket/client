import * as React from 'react';
import { Layout, Menu, Row, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;


export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedKeys: [] };
  }

  handleAdd = () => {
    this.setState({ selectedKeys: [] });
    this.props.onAdd();
  }

  onClick= ({ key }) => {
    this.setState({ selectedKeys: [key] });
  }

  render() {
    const menuItems = this.props.menus.map((value) =>
      <Menu.Item key={value.id}><Link to={value.link}>{value.text}</Link></Menu.Item>);
    return (
      <Sider style={{ background: '#fff', paddingTop: '4px' }}>
        <Row type="flex" align="middle">
          <div style={{ fontSize: 'larger', padding: '8px' }}>{this.props.title}</div>
          <div style={{ display: 'inline', margin: 'auto' }} />
          <Button size="small" shape="circle" icon="reload" onClick={this.handleAdd} />
          <Button size="small" shape="circle" icon="plus" style={{ marginLeft: '4px' }} onClick={this.handleAdd} />
        </Row>
        <Menu
          mode="inline"
          selectedKeys={this.state.selectedKeys}
          style={{ height: '100%' }}
          onClick={this.onClick}
        >
          {menuItems}
        </Menu>
      </Sider>
    );
  }
}
