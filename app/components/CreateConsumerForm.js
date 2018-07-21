import React, { Component } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { CONSUMER_TIERS } from '@open-bucket/daemon/dist/enums';
import generateName from 'sillyname';

const FormItem = Form.Item;

const tierField = (
  <Radio.Group>
    <Radio.Button value={CONSUMER_TIERS.BASIC}>BASIC</Radio.Button>
    <Radio.Button value={CONSUMER_TIERS.PLUS}>PLUS</Radio.Button>
    <Radio.Button value={CONSUMER_TIERS.PREMIUM}>PREMIUM</Radio.Button>
  </Radio.Group>);

class NormalCreateConsumerForm extends Component {
  render() {
    const {
      visible, onCancel, onSubmit, form
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title="Create Producer"
        closable={false}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Name"
          >
            {getFieldDecorator('name', {
              initialValue: generateName(),
              rules: [{ required: true, message: 'Please input name of consumer!' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Tier"
          >
            {getFieldDecorator('tier', {
              initialValue: CONSUMER_TIERS.BASIC,
              rules: [{ required: true, message: 'Please select tier for consumer!' }],
            })(tierField)}
          </FormItem>
        </Form>
      </Modal>);
  }
}

export default Form.create()(NormalCreateConsumerForm);
