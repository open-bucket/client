import * as React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import ProducerContentPage from '../containers/ProducerContentPage';
import AddProducerPage from '../containers/AddProducerPage';
import NavBar from './NavBar';
import SideBar from './SideBar';

const { Header, Content } = Layout;

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
          <NavBar isConsumer={false} />
        </Header>
        <Content>
          <Layout>
            <SideBar menus={sideMenus} title="Producers" />
            <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content>
                <Switch>
                  <Route path={`${this.props.match.url}/add-consumer`} component={AddProducerPage} />
                  <Route path={`${this.props.match.url}/:id`} component={ProducerContentPage} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
