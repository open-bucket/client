import * as React from 'react';
import { Layout } from 'antd';
import ProducerContentPage from '../containers/ProducerContentPage';
import NavBar from './NavBar';
import SideBar from './SideBar';
import CreateProducerForm from './CreateProducerForm';

const { Header, Content } = Layout;

function producerToMenu({ id, name }) {
  return {
    key: id,
    text: name,
    link: `/producers/${id}`
  };
}
export default class Producer extends React.Component {
  componentWillMount = () => {
    this.handleReloadClick();
  }

  handleReloadClick = () => {
    const { getProducers } = this.props;
    getProducers();
  }

  saveCreateProducerFormRef = (formRef) => {
    this.createProducerFormRef = formRef;
  }

  handleClickAddProducer = () => {
    const { setIsVisibleCreateProducerForm } = this.props;
    setIsVisibleCreateProducerForm({ isVisibleCreateProducerForm: true });
  }

  handleCreateProducerSubmit = (e) => {
    e.preventDefault();
    const { form } = this.createProducerFormRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { name, spacePath, spaceLimit } = values;
        const { createProducer } = this.props;
        createProducer({ name, spacePath, spaceLimit: `${spaceLimit} GB` });
        form.resetFields();
      }
    });
  }

  render() {
    const { producers,
      match,
      setSelectedProducerId,
      isVisibleCreateProducerForm,
      setIsVisibleCreateProducerForm,
      username } = this.props;
    const { id: selectedProducerId } = match.params;

    let selectedKeys = [];
    if (selectedProducerId) {
      selectedKeys = [selectedProducerId];
      setSelectedProducerId({ selectedProducerId });
    } else {
      setSelectedProducerId({ setSelectedProducerId });
    }

    return (
      <Layout>
        <Header>
          <NavBar isConsumer={false} username={username} />
        </Header>
        <Content>
          <CreateProducerForm
            wrappedComponentRef={this.saveCreateProducerFormRef}
            visible={isVisibleCreateProducerForm}
            onCancel={() => setIsVisibleCreateProducerForm({ isVisibleCreateProducerForm: false })}
            onSubmit={this.handleCreateProducerSubmit}
          />
          <Layout>
            <SideBar
              menus={producers.map(producerToMenu)}
              title="Producers"
              onAdd={this.handleClickAddProducer}
              onReload={this.handleReloadClick}
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
