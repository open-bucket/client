import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';
import { Layout, Modal, Input, Radio, Row } from 'antd';
import { CONSUMER_TIERS } from '@open-bucket/daemon/dist/enums';
import * as ConsumerActions from '../actions/consumer';
import * as ConsumerContentActions from '../actions/consumerContent';
import ConsumerContentPage from '../containers/ConsumerContentPage';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';

const { Header, Content } = Layout;

function consumerToMenu({ id, name }) {
  return {
    key: id,
    text: name,
    link: `/consumers/${id}`
  };
}
const defaultCreateConsumerField = {
  name: undefined,
  tier: CONSUMER_TIERS.BASIC
};

class Consumer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillMount = () => {
    const { getConsumers } = this.props;
    getConsumers();
  }

  handleItemSelected = ({ key }) => {
    const { consumers, setSelectedConsumer } = this.props;
    setSelectedConsumer({ selectedConsumer: consumers.find(c => `${c.id}` === key) });
  }

  handleClickAddConsumer = () => this.setState({
    visible: true,
    ...defaultCreateConsumerField
  })


  handleCreateConsumerSubmit = () => {
    const { createConsumer } = this.props;
    const { name, tier } = this.state;
    createConsumer({ name, tier });
    this.setState({
      visible: false
    });
  }

  render() {
    const { consumers, setSelectedConsumer, username, match } = this.props;
    const { id } = match.params;
    let selectedKeys = [];
    if (id) {
      selectedKeys = [match.params.id];
      setSelectedConsumer({ selectedConsumer: consumers.find(c => `${c.id}` === match.params.id) });
    } else {
      setSelectedConsumer({ selectedConsumer: undefined });
    }

    return (
      <Layout>
        <Header>
          <NavBar isConsumer={true} username={username} />
        </Header>
        <Content>
          <Modal
            title="Create Consumer"
            closable={false}
            visible={this.state.visible}
            onOk={this.handleCreateConsumerSubmit}
            onCancel={() => this.setState({ visible: false })}
          >
            <Row type="flex" justify="center" align="middle">
              <Input placeholder="Please input name of consumer!" onChange={(e) => this.setState({ name: e.target.value })} />
            </Row>
            <Row type="flex" justify="center" align="middle" style={{ marginTop: '8px' }}>
              <Radio.Group
                defaultValue={CONSUMER_TIERS.BASIC}
                onChange={(e) => this.setState({ tier: e.target.value })}
              >
                <Radio.Button value={CONSUMER_TIERS.BASIC}>BASIC</Radio.Button>
                <Radio.Button value={CONSUMER_TIERS.PLUS}>PLUS</Radio.Button>
                <Radio.Button value={CONSUMER_TIERS.PREMIUM}>PREMIUM</Radio.Button>
              </Radio.Group>
            </Row>
          </Modal>
          <Layout>
            <SideBar
              menus={consumers.map(consumerToMenu)}
              title="Consumers"
              handleAdd={this.handleClickAddConsumer}
              onItemSelected={this.handleItemSelected}
              selectedKeys={selectedKeys}
            />
            <Layout style={{ padding: '0 24px 24px', background: '#fff' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content>
                <ConsumerContentPage />
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
    selectedConsumer: state.consumerContent.selectedConsumer,
    username: state.auth.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ConsumerActions,
    setSelectedConsumer: ConsumerContentActions.setSelectedConsumer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Consumer);
