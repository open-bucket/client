import * as React from 'react';
import { Row, Col, Button, Progress } from 'antd';
import { PRODUCER_STATES } from '@open-bucket/daemon/dist/enums';
import * as R from 'ramda';
import bytes from 'bytes';
import ActiveProducerForm from './ActiveProducerForm';
import WithdrawProducerForm from './WithdrawProducerForm';
import EditingNameForm from './EditingNameForm';

export default class ProducerContent extends React.Component {
    saveActiveFormRef = (formRef) => {
      this.activeFormRef = formRef;
    }

    handleActiveButtonClick = () => {
      const { setIsWithdrawingProducer } = this.props;
      const { state } = this.props.selectedProducer;

      if (state === PRODUCER_STATES.INACTIVE) {
        const { setVisibleActivateProducerForm, getAccounts } = this.props;
        getAccounts();
        setVisibleActivateProducerForm({ isVisibleActivationForm: true });
      } else {
        // display withdraw form
        setIsWithdrawingProducer({ isWithdrawingProducer: true });
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

    handleStartStopButtonClick = () => {
      const {
        startProducer,
        stopProducer,
        runningProducerContexts,
        selectedProducer
      } = this.props;
      const isRunning = R.find(c => c.producerId === selectedProducer.id, runningProducerContexts);
      if (isRunning) {
        stopProducer({ producerId: selectedProducer.id });
      } else {
        startProducer({ producerId: selectedProducer.id });
      }
    }

    saveWithdrawProducerFormRef = (formRef) => {
      this.withdrawProducerFormRef = formRef;
    }

    handleWithdrawProducerFormSubmit = (e) => {
      e.preventDefault();
      const { form } = this.withdrawProducerFormRef.props;
      form.validateFields((err, values) => {
        if (!err) {
          const { contractAddress } = values;
          const { id: producerId } = this.props.selectedProducer;
          const { withdrawConsumer } = this.props;
          withdrawConsumer({ producerId, contractAddress });
        }
      });
    }

    saveEditingNameFormRef = (formRef) => {
      this.editingNameFormRef = formRef;
    }

    handleEditingNameFormSubmit = (e) => {
      e.preventDefault();
      const { form } = this.editingNameFormRef.props;
      form.validateFields((err, values) => {
        if (!err) {
          const { name } = values;
          const { updateProducer, selectedProducer, setIsEditingName } = this.props;
          setIsEditingName(false);
          updateProducer({ ...selectedProducer, name });
        }
      });
    }

    render() {
      const {
        isEditingName,
        setIsEditingName,
        selectedProducer,
        isVisibleActivationForm,
        setVisibleActivateProducerForm,
        accounts,
        startingProducers,
        runningProducerContexts,
        stoppingProducers,
        spaceLimit,
        actualSize,
        availableSpace,
        balance,
        isWithdrawingProducer,
        setIsWithdrawingProducer
      } = this.props;

      if (selectedProducer) {
        const { name, state, id, address } = selectedProducer;
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
            <WithdrawProducerForm
              wrappedComponentRef={this.saveWithdrawProducerFormRef}
              visible={isWithdrawingProducer}
              onCancel={() => setIsWithdrawingProducer({ isWithdrawingProducer: false })}
              onSubmit={this.handleWithdrawProducerFormSubmit}
              producerName={name}
              address={address}
            />
            <Row type="flex" align="middle" gutter={8} style={{ marginTop: '8px' }}>
              <Col span={20}>
                <Row type="flex" align="middle" gutter={8} style={{ marginTop: '8px' }}>
                  {isEditingName &&
                  <Col span={8}>
                    <EditingNameForm
                      wrappedComponentRef={this.saveEditingNameFormRef}
                      style={{ visible: { isEditingName } }}
                      initialValue={name}
                    />
                  </Col>}
                  {isEditingName && <Col span={1}><Button shape="circle" size="small" icon="save" onClick={this.handleEditingNameFormSubmit} /> </Col>}
                  {!isEditingName && <Col ><h1>{name}</h1></Col>}
                  {!isEditingName && <Col span={1}><Button shape="circle" size="small" icon="edit" onClick={setIsEditingName.bind(true)} /></Col>}
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
                disabled={state !== PRODUCER_STATES.ACTIVE || startingProducers.includes(id)}
                loading={startingProducers.includes(id) || stoppingProducers.includes(id)}
                type={R.find(c => c.producerId === id, runningProducerContexts) ? 'primary' : 'default'}
                icon={startingProducers.includes(id) ? null
                                : R.find(c => c.producerId === id, runningProducerContexts) ? 'pause'
                                    : 'caret-right'}
                onClick={this.handleStartStopButtonClick}
              />
            </Row>
            <Row type="flex" justify="center">
              <span style={{ fontSize: '2rem' }}>{startingProducers.includes(id) ? 'Starting'
                  : stoppingProducers.includes(id) ? 'Stopping'
                      : R.find(c => c.producerId === id, runningProducerContexts) ? 'Online'
                          : 'Offline'}
              </span>
            </Row>
            <Row type="flex" justify="space-between" gutter={8}>
              <Col>
                <h2>Producer Space</h2>
              </Col>
            </Row>
            <Row>
              <span>{bytes(availableSpace)} free of {bytes(spaceLimit)},
              provided {bytes(actualSize)}
              </span>
              <Progress
                percent={Math.ceil((actualSize * 100) / spaceLimit)}
                status={state === PRODUCER_STATES.ACTIVE ? 'active' : ''}
              />
            </Row>

            <Row>
              <h2>Payment</h2>
            </Row>
            <Row type="flex" justify="start" align="middle" gutter={2}>
              <Col span={6}>
                <h3>Wallet Address:</h3>
              </Col>
              <Col span={8}>
                {address}
              </Col>
            </Row>
            <Row type="flex" justify="start" align="middle" gutter={2}>
              <Col span={6}>
                <h3>Balance:</h3>
              </Col>
              <Col span={8}>
                {balance} Wei
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
              <Col span={6}>
                <h3>Directory:</h3>
              </Col>
              <Col>
                <span>C://</span>
              </Col>
            </Row>
            <Row type="flex" justify="start">
              <Col span={6}>
                <h3>Limit:</h3>
              </Col>
              <Col>
                <span>{bytes(spaceLimit)}</span>
              </Col>
            </Row>
          </Row >
        );
      }

      return (<Row type="flex" justify="center" align="middle" style={{ paddingTop: '3rem' }}><span style={{ fontSize: '2rem' }}>Let select a producer</span></Row>);
    }
}
