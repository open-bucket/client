import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;


class NormalActiveConsumerModal extends Component {
  render() {
    const {
      visible, onCancel, onCreate, form
    } = this.props;

    const { getFieldDecorator, Select } = form;

    const accountSelect = (
      <Select defaultValue="1">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
      </Select>);

    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem
            label="Account"
          >
            {getFieldDecorator('account')(accountSelect)}
          </FormItem>
        </Form>

      </Modal>
    );
  }
}

export default Form.create(NormalActiveConsumerModal);
