import React, { Component } from 'react';
import { Link, Router, Route } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import AccountMenu from './AccountMenu';
import Consumer from './Consumer';
import Producer from './Producer';

import styles from './Home.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Home extends Component {
  render() {
    const items = [1, 2, 3];
    let menuItems;
    if (this.props.isConsumer) {
      menuItems = items.map(i => <Menu.Item key={i}><Link to={`${this.props.match.url}/${i}`}>Consumer {i}</Link></Menu.Item>);
    } else {
      menuItems = items.map(i => <Menu.Item key={i}><Link to={`${this.props.match.url}/${i}`}>Producer {i}</Link></Menu.Item>);
    }

    return (
      <Layout>
        <Header />
        <Content>
          <Layout>
            <Sider>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                {menuItems}
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content>
                <Route path={`${this.props.match.url}/:id`} component={this.props.isConsumer ? Consumer : Producer} />
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
