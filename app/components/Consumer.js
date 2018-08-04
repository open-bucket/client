import * as React from 'react';
import { Layout } from 'antd';
import ConsumerContentPage from '../containers/ConsumerContentPage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import CreateConsumerForm from './CreateConsumerForm';

const { Header, Content } = Layout;

function consumerToMenu({ id, name }) {
  return {
    key: id,
    text: name,
    link: `/consumers/${id}`
  };
}

export default class Consumer extends React.Component {
  componentWillMount = () => {
    const { getConsumers } = this.props;
    getConsumers();
  }

  handleItemSelected = ({ key }) => {
    const { setSelectedConsumerId } = this.props;
    setSelectedConsumerId({ selectedConsumerId: key });
  }

  saveCreateConsumerFormRef = (formRef) => {
    this.createConsumerFormRef = formRef;
  }

  handleCreateConsumerSubmit = (e) => {
    e.preventDefault();
    const { form } = this.createConsumerFormRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { name, tier } = values;
        const { createConsumer } = this.props;
        createConsumer({ name, tier });
        form.resetFields();
      }
    });
  }

  handleReloadClick = () => {
    const { getConsumers } = this.props;
    getConsumers();
  }

  render() {
    const { consumers,
      setSelectedConsumerId,
      username,
      match,
      isVisibleCreateConsumerForm,
      setVisibleCreateConsumerForm } = this.props;
    const { id } = match.params;
    let selectedKeys = [];
    if (id) {
      selectedKeys = [id];
      setSelectedConsumerId({ selectedConsumerId: id });
    } else {
      setSelectedConsumerId({ selectedConsumerId: undefined });
    }

    return (
      <Layout>
        <Header>
          <NavBar isConsumer={true} username={username} />
        </Header>
        <Content>
          <CreateConsumerForm
            wrappedComponentRef={this.saveCreateConsumerFormRef}
            visible={isVisibleCreateConsumerForm}
            onCancel={() => setVisibleCreateConsumerForm({ isVisibleCreateConsumerForm: false })}
            onSubmit={this.handleCreateConsumerSubmit}
          />
          <Layout hasSider={true}>
            <SideBar
              menus={consumers.map(consumerToMenu)}
              title="Consumers"
              onAdd={() => setVisibleCreateConsumerForm({ isVisibleCreateConsumerForm: true })}
              onReload={this.handleReloadClick}
              onItemSelected={this.handleItemSelected}
              selectedKeys={selectedKeys}
              onRefresh={this.handleRefreshClick}
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
