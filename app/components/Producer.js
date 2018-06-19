import * as React from 'react';
import { Layout } from 'antd';
import ProducerContentPage from '../containers/ProducerContentPage';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SideBar from './SideBar';

const { Header, Content, Sider } = Layout;

const sideMenus = [
  {
    id: '1',
    text: 'Producer 1',
    link: '/producers/1'
  },
  {
    id: '2',
    text: 'Producer 2',
    link: '/producers/2'
  },
  {
    id: '3',
    text: 'Producer 3',
    link: '/producers/3'
  }
];
export default class Producer extends React.Component {
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
                <Route path={`${this.props.match.url}/:id`} component={ProducerContentPage} />
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
