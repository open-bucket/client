import * as React from 'react';
import { Row, Col, Button, Input, Progress } from 'antd';
import { PRODUCER_STATES } from '@open-bucket/daemon/dist/enums';
import * as R from 'ramda';
import ActiveProducerForm from './ActiveProducerForm';

export default class ProducerContent extends React.Component {
  saveActiveFormRef = (formRef) => {
    this.activeFormRef = formRef;
  }

  handleActiveButtonClick = () => {
    const { state } = this.props.selectedProducer;
    if (state === PRODUCER_STATES.INACTIVE) {
      const { setVisibleActivateProducerForm, getAccounts } = this.props;
      getAccounts();
      setVisibleActivateProducerForm({ isVisibleActivationForm: true });
    } else {
      // display withdraw form
    }
  }

  handleActiveFormSubmit = (e) => {
    e.preventDefault();
    const { form } = this.activeFormRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { accountIndex } = values;
        const { id } = this.props.selectedProducer;
        const { activeProducer } = this.props;
        activeProducer({ producerId: id, accountIndex });
      }
    });
  }

  render() {
    const {
      isEditingName,
      selectedProducer,
      isVisibleActivationForm,
      setVisibleActivateProducerForm,
      accounts,
      startingProducers,
      runningProducerContexts,
      startProducer } = this.props;

    if (selectedProducer) {
      const { name, state, id } = selectedProducer;
      return (
        <Row>
          <ActiveProducerForm
            wrappedComponentRef={this.saveActiveFormRef}
            visible={isVisibleActivationForm}
            onCancel={() =>
              setVisibleActivateProducerForm({ isVisibleActivationForm: false })}
            onSubmit={this.handleActiveFormSubmit}
            accounts={accounts}
          />
          <Row type="flex" align="middle" gutter={8} style={{ marginTop: '8px' }}>
            <Col span={20}>
              <Row type="flex" align="middle" gutter={8} style={{ marginTop: '8px' }}>
                {isEditingName && <Col span={8}><Input defaultValue={this.state.newName} size="small" onChange={this.handleNewNameChange} /></Col>}
                {isEditingName && <Col span={1}><Button shape="circle" size="small" icon="save" onClick={this.handleSaveName} /> </Col>}
                {!isEditingName && <Col ><h1>{name}</h1></Col>}
                {!isEditingName && <Col span={1}><Button shape="circle" size="small" icon="edit" onClick={this.handleEditName} /></Col>}
              </Row>
            </Col>
            <Col span={4}>
              <Row type="flex" align="middle" justify="end">
                <Button
                  type={state === PRODUCER_STATES.ACTIVE ? 'primary' : 'danger'}
                  onClick={this.handleActiveButtonClick}
                >{state === PRODUCER_STATES.ACTIVE ? 'Withdraw' : 'Active'}
                </Button>
              </Row>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Button
              shape="circle"
              style={{ fontSize: '5rem', height: '8rem', width: '8rem' }}
              loading={startingProducers.includes(id)}
              disabled={startingProducers.includes(id)}
              type={R.find(c => c.producerId === id, runningProducerContexts) ? 'primary' : 'default'}
              icon={startingProducers.includes(id) ? null : R.find(c => c.producerId === id, runningProducerContexts) ? 'pause' : 'caret-right'}
              onClick={() => startProducer({ producerId: id })}
            />
          </Row>
          <Row type="flex" justify="center">
            <span style={{ fontSize: '2rem' }}>{startingProducers.includes(id) ? 'Starting'
            : R.find(c => c.producerId === id, runningProducerContexts) ? 'Running'
            : 'Offline'}
            </span>
          </Row>
          <Row type="flex" justify="space-between" gutter={8}>
            <Col>
              <h2>Producer Space</h2>
            </Col>
          </Row>
          <Row>
            <span>0gb out of 5gb</span>
            <Progress percent={0} />
          </Row>

          <Row>
            <h2>Payment</h2>
          </Row>
          <Row type="flex" justify="start" align="middle" gutter={2}>
            <Col span={4}>
              <h3>Accumulate Payment:</h3>
            </Col>
            <Col span={8}>
              {0} ETH
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
              <h3>Directory:</h3>
            </Col>
            <Col>
              <span>C://</span>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span={4}>
              <h3>Limit:</h3>
            </Col>
            <Col>
              <span>5 GB</span>
            </Col>
          </Row>
        </Row >
      );
    }

    return (<Row type="flex" justify="center" align="middle" style={{ paddingTop: '3rem' }}><span style={{ fontSize: '2rem' }}>Let select a producer</span></Row>);
  }
}
