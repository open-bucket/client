import React, { Component } from 'react';
import { Modal, Form, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;


class NormalActiveProducerForm extends Component {
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
        title="Active Producer"
        okText="Active"
        onCancel={onCancel}
        onOk={onSubmit}
      >
        <Form>
          <FormItem
            label="Account"
          >
            {getFieldDecorator('accountIndex', {
              rules: [{ required: true, message: 'Please select an account!' }],
            })(accountSelect)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(NormalActiveProducerForm);
