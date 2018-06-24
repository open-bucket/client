import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Layout } from 'antd';
import * as ConsumerActions from '../actions/consumer';
import ConsumerContentPage from '../containers/ConsumerContentPage';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const { Header, Content } = Layout;

function consumerToMenu({ id }) {
  return {
    key: id,
    text: `Consumer ${id}`,
    link: `/consumers/${id}`
  };
}

class Consumer extends React.Component {
  componentDidMount = () => {
    const { getConsumers } = this.props;
    getConsumers();
  }

  handleItemSelected = ({ key }) => {
    const { consumers, setSelectedConsumer } = this.props;
    setSelectedConsumer({ selectedConsumer: consumers.find(c => `${c.id}` === key) });
  }

  render() {
    const { consumers, createConsumer, selectedConsumer, username } = this.props;
    return (
      <Layout>
        <Header>
          <NavBar isConsumer={true} username={username} />
        </Header>
        <Content>
          <Layout>
            <SideBar
              menus={consumers.map(consumerToMenu)}
              title="Consumers"
              handleAdd={createConsumer}
              onItemSelected={this.handleItemSelected}
            />
            <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content>
                {selectedConsumer ? (<ConsumerContentPage />) :
                  (<span >Please select a consumer</span>)}
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
    consumers: state.consumer.consumers,
    selectedConsumer: state.consumer.selectedConsumer,
    username: state.auth.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConsumerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Consumer);
