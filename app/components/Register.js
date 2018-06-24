import * as React from 'react';

// export default class Register extends React.Component {
//   render() {
//     return (<div>register</div>);
//   }
// }


import { Form, Input, Button, Row, Col } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    const { register } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        register(values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Row type="flex" justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={16}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <h1>Join with us!</h1>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Username"
            >
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!', whitespace: false },
                  { min: 5, message: 'Username must be at least 5 chars long!' }
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your password!' },
                  { min: 5, message: 'Password must be at least 5 chars long!' },
                  { validator: this.validateToNextPassword }
                ],
              })(<Input type="password" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [
                  { required: true, message: 'Please confirm your password!' },
                  { min: 5, message: 'Password must be at least 5 chars long!' },
                  { validator: this.compareToFirstPassword }
                ],
              })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(RegistrationForm);
