import React, { Component } from 'react';
import { Modal, Form, InputNumber } from 'antd';
import ContractService from '@open-bucket/contracts';

const FormItem = Form.Item;

class TopUpConsumerForm extends Component {
  render() {
    const {
      visible, onCancel, onSubmit, form
    } = this.props;

    const { getFieldDecorator } = form;

    return (
      <Modal
        closable={false}
        visible={visible}
        title="Top Up"
        okText="Top Up"
        onCancel={onCancel}
        onOk={onSubmit}
      >
        <Form>
          <FormItem
            label="Value"
          >
            {getFieldDecorator('value', {
              initialValue: Number(ContractService.configs.CONSUMER_ACTIVATOR_MIN_AMOUNT),
              rules: [{ required: true, message: 'Please input value!' }],
            })(<InputNumber
              style={{ width: '100%' }}
              min={Number(ContractService.configs.CONSUMER_ACTIVATOR_MIN_AMOUNT)}
              formatter={value => `${value}Wei`}
              parser={value => value.replace('Wei', '')}
            />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(TopUpConsumerForm);
