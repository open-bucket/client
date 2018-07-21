import React, { Component } from 'react';
import { Modal, Form, Select, InputNumber } from 'antd';
import ContractService from '@open-bucket/contracts';

const FormItem = Form.Item;
const { Option } = Select;


class NormalActiveConsumerForm extends Component {
  render() {
    const {
      visible, onCancel, onSubmit, form, accounts
    } = this.props;

    const { getFieldDecorator } = form;

    const accountSelect = (
      <Select>
        {accounts.map((v, i) => <Option key={v.address} value={i}>{v.address}</Option>)}
      </Select>);
    return (
      <Modal
        closable={false}
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onSubmit}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Account"
          >
            {getFieldDecorator('accountIndex', {
              rules: [{ required: true, message: 'Please select an account!' }],
            })(accountSelect)}
          </FormItem>
          <FormItem
            label="Value"
          >
            {getFieldDecorator('value', {
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

export default Form.create()(NormalActiveConsumerForm);
