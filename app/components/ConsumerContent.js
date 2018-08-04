import * as React from 'react';
import { Table, Row, Col, Button, Input } from 'antd';
import { CONSUMER_STATES } from '@open-bucket/daemon/dist/enums';
import * as R from 'ramda';
import downloadsFolder from 'downloads-folder';
import ActiveConsumerForm from './ActiveConsumerForm';
import Tier from '../components/Tier';
import FileAction from './FileAction';

export default class ConsumerContent extends React.Component {
  handleEditName = () => {
    const { name } = this.props.selectedConsumer;
    const { setIsEditingName } = this.props;

    this.setState({ newName: name });
    setIsEditingName(true);
  }

  handleNewNameChange = (e) => {
    const { value } = e.target;

    this.setState({ newName: value });
  }

  handleSaveName = () => {
    const { updateConsumer, selectedConsumer } = this.props;
    updateConsumer({ ...selectedConsumer, name: this.state.newName });
  }

  handleUpload = () => {
    this.fileUploader.click();
  }

  handleFileSelected = (e) => {
    const { upload } = this.props;
    const { id } = this.props.selectedConsumer;
    e.stopPropagation();
    e.preventDefault();
    const file = e.target.files[0];
    upload({ filePath: file.path, consumerId: id });
  }

  saveActiveFormRef = (formRef) => {
    this.activeFormRef = formRef;
  }

  handleActiveButtonClick = () => {
    const { state } = this.props.selectedConsumer;
    if (state === CONSUMER_STATES.INACTIVE) {
      const { setVisibleActivateConsumerForm, getAccounts } = this.props;
      getAccounts();
      setVisibleActivateConsumerForm({ isVisibleActivationForm: true });
    } else {
      // display withdraw form
    }
  }

  handleActiveFormSubmit = (e) => {
    e.preventDefault();
    const { form } = this.activeFormRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { accountIndex, value } = values;
        const { id } = this.props.selectedConsumer;
        const { activeConsumer } = this.props;
        activeConsumer({ consumerId: id, accountIndex, value });
      }
    });
  }

  handleDownloadButtonClick = () => {

  }

  render() {
    const {
      isEditingName,
      selectedConsumer,
      isVisibleActivationForm,
      setVisibleActivateConsumerForm,
      accounts,
      uploadingConsumerIds,
      files,
      downloadingContexts,
      download,
      isDeletingFile,
      setIsDeletingFile,
      deletingFileIds,
      deleteFile
    } = this.props;

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
    }, {
      title: 'Availability',
      dataIndex: 'x',
      key: 'x',
    }, {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const loading = R.find(({ consumerId, fileId }) => consumerId === record.consumerId
          && fileId === record.id, downloadingContexts)
          || deletingFileIds.includes(record.id);
        return (<FileAction
          isDeleting={isDeletingFile}
          loading={loading}
          disabled={true}
          onDownload={() => download({
            fileId: record.id,
            consumerId: record.consumerId,
            downloadPath: downloadsFolder()
          })}
          onDelete={() => deleteFile({ fileId: record.id, consumerId: record.consumerId })}
        />);
      }
    }];

    if (selectedConsumer) {
      const { name, tier, balance, state, id } = this.props.selectedConsumer;

      const activeContent = state === CONSUMER_STATES.ACTIVE ? (
        <Row>
          <Row type="flex" justify="space-between" gutter={8}>
            <Col>
              <h2>Files</h2>
            </Col>
            <Col>
              <Button
                shape="circle"
                icon="delete"
                type={isDeletingFile ? 'primary' : 'default'}
                onClick={() => setIsDeletingFile({ isDeletingFile: !isDeletingFile })}
              />
              <Button
                shape="circle"
                icon="plus"
                style={{ marginLeft: '4px' }}
                onClick={this.handleUpload}
                loading={uploadingConsumerIds.includes(id)}
                disabled={uploadingConsumerIds.includes(id)}
              />
            </Col>
          </Row>
          <Row>
            <Table
              columns={columns}
              dataSource={files}
              rowKey={record => record.fileId}
            />
          </Row>

          <Row>
            <h2>Payment</h2>
          </Row>
          <Row type="flex" justify="start" align="middle" gutter={2}>
            <Col span={2}>
              <h3>Balance:</h3>
            </Col>
            <Col span={8}>
              {balance || 0} ETH
            </Col>
            <Col span={1}>
              <Button shape="circle" icon="plus" size="small" />
            </Col>
          </Row>

          <Row type="flex" justify="start" gutter={2}>
            <Col span={2}>
              <h3>Tier:</h3>
            </Col>
            <Col span={8}>
              <Tier tier={tier} />
            </Col>
            <Col span={1}>
              <Button shape="circle" icon="up" size="small" />
            </Col>
          </Row>

          <Row type="flex" justify="start" align="middle" gutter={8}>
            <Col>
              <h2 style={{ marginBottom: '0' }}>Configs</h2>
            </Col>
            <Col>
              <Button shape="circle" size="small" icon="edit" />
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span={4}>
              <h3>Space:</h3>
            </Col>
            <Col>
              <span>C://</span>
            </Col>
          </Row>
        </Row>) : (
          <Row type="flex" justify="center" align="middle" style={{ paddingTop: '3rem' }}>
            <Button
              size="large"
              type="danger"
              icon="poweroff"
              onClick={this.handleActiveButtonClick}
            >Active Consumer
            </Button>
          </Row>
      );

      return (
        <Row>
          <ActiveConsumerForm
            wrappedComponentRef={this.saveActiveFormRef}
            visible={isVisibleActivationForm}
            onCancel={() =>
              setVisibleActivateConsumerForm({ isVisibleActivationForm: false })}
            onSubmit={this.handleActiveFormSubmit}
            accounts={accounts}
          />
          <input type="file" onChange={this.handleFileSelected} style={{ display: 'none' }} ref={(node) => { this.fileUploader = node; }} />
          <Row type="flex" align="middle" gutter={8} style={{ marginTop: '8px' }}>
            <Col span={20}>
              <Row type="flex" align="middle" gutter={8}>
                {isEditingName && <Col span={8}><Input defaultValue={this.state.newName} size="small" onChange={this.handleNewNameChange} /></Col>}
                {isEditingName && <Col span={1}><Button shape="circle" size="small" icon="save" onClick={this.handleSaveName} /> </Col>}
                {!isEditingName && <Col ><h1>{name}</h1></Col>}
                {!isEditingName && <Col span={1}><Button shape="circle" size="small" icon="edit" onClick={this.handleEditName} /></Col>}
              </Row>
            </Col>
            <Col span={4}>
              <Row type="flex" align="middle" justify="end">
                {state === CONSUMER_STATES.ACTIVE ? <Button type="primary">Withdraw</Button> : null}
              </Row>
            </Col>
          </Row>
          {activeContent}
        </Row>);
    }

    return (<Row type="flex" justify="center" align="middle" style={{ paddingTop: '3rem' }}><span style={{ fontSize: '2rem' }}>Let select a consumer</span></Row>);
  }
}
