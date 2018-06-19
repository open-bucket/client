import * as React from 'react';
import { Layout } from 'antd';
import ConsumerContentPage from '../containers/ConsumerContentPage';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';

const { Header, Content, Sider } = Layout;

const sideMenus = [
  {
    id: '1',
    text: 'Consumer 1',
    link: '/consumers/1'
  },
  {
    id: '2',
    text: 'Consumer 2',
    link: '/consumers/2'
  },
  {
    id: '3',
    text: 'Consumer 3',
    link: '/consumers/3'
  }
];
export default class Consumer extends React.Component {
  render() {
    return (
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content>
          <Layout>
            <SideBar menus={sideMenus} />
            <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content>
                <Route path={`${this.props.match.url}/:id`} component={ConsumerContentPage} />
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
