import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Layout } from 'antd';
import { Route, Switch } from 'react-router-dom';
import * as ConsumerActions from '../actions/consumer';
import ConsumerContentPage from '../containers/ConsumerContentPage';
import AddConsumerPage from '../containers/AddConsumerPage';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const { Header, Content } = Layout;

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
class Consumer extends React.Component {
  componentDidMount = () => {
    const { getConsumer } = this.props;
    getConsumer();
  }

  handleAdd = () => {
    this.props.history.push(`${this.props.match.url}/add-consumer`);
  }

  render() {
    return (
      <Layout>
        <Header>
          <NavBar isConsumer={true} />
        </Header>
        <Content>
          <Layout>
            <SideBar menus={sideMenus} title="Consumers" onAdd={this.handleAdd} />
            <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content>
                <Switch>
                  <Route path={`${this.props.match.url}/add-consumer`} component={AddConsumerPage} />
                  <Route path={`${this.props.match.url}/:id`} component={ConsumerContentPage} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    consumers: state.consumer.consumers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConsumerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Consumer);
