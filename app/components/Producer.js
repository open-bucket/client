import * as React from 'react';
import { Layout, Modal, Row, InputNumber, Input } from 'antd';
import { Route, Switch } from 'react-router-dom';
import ProducerContentPage from '../containers/ProducerContentPage';
import NavBar from './NavBar';
import SideBar from './SideBar';

const { Header, Content } = Layout;

function producerToMenu({ id, name }) {
  return {
    key: id,
    text: name,
    link: `/producers/${id}`
  };
}

const defaultCreateProducerField = {
  name: undefined,
  spacePath: undefined,
  spaceLimit: '5GB'
};

export default class Producer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillMount = () => {
    const { getProducers } = this.props;
    getProducers();
  }

  handleClickAddProducer = () => this.setState({
    visible: true,
    ...defaultCreateProducerField
  })

  handleCreateProducerSubmit = () => {
    const { createProducer } = this.props;
    const { name, spacePath, spaceLimit } = this.state;
    createProducer({ name, spacePath, spaceLimit });
    this.setState({
      visible: false
    });
  }

  handleItemSelected = ({ key }) => {
    const { producers, setSelectedProducer } = this.props;
    setSelectedProducer({ selectedProducer: producers.find(c => `${c.id}` === key) });
  }
  render() {
    const { producers, match, setSelectedProducer, selectedProducer } = this.props;
    const { id } = match.params;

    let selectedKeys = [];
    if (id) {
      selectedKeys = [match.params.id];
      setSelectedProducer({ selectedProducer: producers.find(c => `${c.id}` === match.params.id) });
    } else {
      setSelectedProducer({ selectedProducer: undefined });
    }

    return (
      <Layout>
        <Header>
          <NavBar isConsumer={false} />
        </Header>
        <Content>
          <Modal
            title="Create Producer"
            closable={false}
            visible={this.state.visible}
            onOk={this.handleCreateProducerSubmit}
            onCancel={() => this.setState({ visible: false })}
          >
            <Row type="flex" justify="center" align="middle">
              <Input placeholder="Please input name of producer!" onChange={(e) => this.setState({ name: e.target.value })} />
            </Row>
            <Row type="flex" justify="center" align="middle" style={{ marginTop: '8px' }}>
              <Input placeholder="Please input path to storage!" onChange={(e) => this.setState({ spacePath: e.target.value })} />
            </Row>
            <Row type="flex" justify="center" align="middle" style={{ marginTop: '8px' }}>
              <InputNumber
                defaultValue={5}
                min={0}
                formatter={value => `${value} GB`}
                onChange={(spaceLimit) => this.setState({ spaceLimit })}
              />
            </Row>
          </Modal>
          <Layout>
            <SideBar
              menus={producers.map(producerToMenu)}
              title="Producers"
              handleAdd={this.handleClickAddProducer}
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
                <ProducerContentPage />
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    );
  }
}
