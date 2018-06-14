import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import styles from './Login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleSubmit();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="center" align="middle" className={styles.fullHeight}>
        <Col span={8}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <h1>Welcome!</h1>
            </FormItem>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: false, message: 'Please input your username!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: false, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)}
              <Row gutter={8}>
                <Col span={12}>
                  <Button className={styles.fullWidth} type="ghost" htmlType="submit">
                Register Now
                  </Button>
                </Col>
                <Col span={12}>
                  <Button className={styles.fullWidth} type="primary" htmlType="submit">
                Log in
                  </Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create()(NormalLoginForm);
