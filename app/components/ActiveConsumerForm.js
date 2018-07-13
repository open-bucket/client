import React, { Component } from 'react';
import { Modal, Form, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;


class NormalActiveConsumerForm extends Component {
  render() {
    const {
      visible, onCancel, onSubmit, form, accounts
    } = this.props;

    const { getFieldDecorator } = form;

    const accountSelect = accounts ? (
      <Select>
        {accounts.map((v, i) => (<Option value={i}>{v}</Option>))}
      </Select>) : (null);

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
            {getFieldDecorator('value')(<InputNumber
              min={0}
              max={100}
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
