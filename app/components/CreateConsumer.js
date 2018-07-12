import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Radio } from 'antd';
import { CONSUMER_TIERS } from '@open-bucket/daemon/enums';

const FormItem = Form.Item;

const tierField = (
  <Radio.Group defaultValue={CONSUMER_TIERS.BASIC}>
    <Radio.Button value={CONSUMER_TIERS.BASIC}>BASIC</Radio.Button>
    <Radio.Button value={CONSUMER_TIERS.PLUS}>PLUS</Radio.Button>
    <Radio.Button value={CONSUMER_TIERS.PREMIUM}>PREMIUM</Radio.Button>
  </Radio.Group>);

class NormalCounter extends Component {
    handleSubmit = (e) => {
      const { createConsumer } = this.props;
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          createConsumer(values);
        }
      });
    };

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        
      );
    }
}

export default Form.create()(NormalCounter);

