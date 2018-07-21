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
    const { getProducers } = this.props;
    getProducers();
  }

  handleItemSelected = ({ key }) => {
    const { producers, setSelectedProducer } = this.props;
    setSelectedProducer({ selectedProducer: producers.find(c => `${c.id}` === key) });
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
      setSelectedProducer,
      // selectedProducer,
      isVisibleCreateProducerForm,
      setIsVisibleCreateProducerForm } = this.props;
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
