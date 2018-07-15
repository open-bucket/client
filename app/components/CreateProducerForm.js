import React, { Component } from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { OBN_SPACES_PATH } from '@open-bucket/daemon/dist/constants';
import generateName from 'sillyname';

const FormItem = Form.Item;


class NormalCreateProducerForm extends Component {
  render() {
    const {
      visible, onSubmit, onCancel, form
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
              rules: [{ required: true, message: 'Please input name of producer!' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Space Path"
          >
            {getFieldDecorator('spacePath', {
              initialValue: OBN_SPACES_PATH,
              rules: [{ required: true, message: 'Please input space path of producer!' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Space Limit"
          >
            {getFieldDecorator('spaceLimit', {
              initialValue: 5,
              rules: [{ required: true, message: 'Please input space limit of producer!' }],
            })(<InputNumber
              min={1}
              formatter={value => `${value} GB`}
            />)}
          </FormItem>
        </Form>
      </Modal>);
  }
}

export default Form.create()(NormalCreateProducerForm);
