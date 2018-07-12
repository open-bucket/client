import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    const { login } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        login(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { history } = this.props;
    return (
      <Row type="flex" justify="center" align="middle" className="fullHeight">
        <Col span={8}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <h1>Welcome!</h1>
            </FormItem>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Please input your username!' },
                  { min: 5, message: 'Username must be at least 5 chars long!' }
                ],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                  { min: 5, message: 'Password must be at least 5 chars long!' },
                ],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              <Row gutter={8}>
                <Col span={12}>
                  <Button className={styles.fullWidth} type="ghost" onClick={() => history.push('/register')}>
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
