import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import generateName from 'sillyname';

const FormItem = Form.Item;


class NormalCreateProducerForm extends Component {
  render() {
    const {
      visible,
      onSubmit,
      onCancel,
      form,
      address,
      producerName
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        title={`Withdraw ETH from producer ${producerName}`}
        closable={false}
        visible={visible}
        onOk={onSubmit}
        onCancel={onCancel}
      >
        <p>
        Select a contract address to withdraw from it,
        all eth you earned from it will be sent to address: {address}
        </p>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Contract Address"
          >
            {getFieldDecorator('contractAddress', {
              rules: [{ required: true, message: 'Please input contract address to withdraw!' }],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>);
  }
}

export default Form.create()(NormalCreateProducerForm);
