import { Form, Input } from 'antd';
import * as React from 'react';

const FormItem = Form.Item;

class EditingNameNormal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { initialValue } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('name', {
            initialValue,
            rules: [
              { required: true, message: 'Please input new name' }
            ]
          })(<Input size="small" />)}
        </FormItem>
      </Form>);
  }
}


export default Form.create()(EditingNameNormal);
