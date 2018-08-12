import { Form, Input, Row, Col, Button, InputNumber } from 'antd';
import * as React from 'react';
import { directoryValidator } from '../utils/validators';

const FormItem = Form.Item;

class ConsumerConfigsNormal extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { space, spaceLimit, isEditing, onEdit, onSave } = this.props;

    return (
      <Form>
        <Row>
          <Row type="flex" justify="start" align="middle" gutter={8}>
            <Col>
              <h2 style={{ marginBottom: '0' }}>Configs</h2>
            </Col>
            <Col>
              {!isEditing && <Button shape="circle" size="small" icon="edit" onClick={onEdit} />}
              {isEditing && <Button shape="circle" size="small" icon="save" onClick={onSave} />}
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span={6}>
              <h3>Space:</h3>
            </Col>
            <Col span={12}>
              {!isEditing && <span>{space || 'C://'}</span>}
              {isEditing &&
                <FormItem>
                  {getFieldDecorator('space', {
                    initialValue: space,
                    rules: [
                      { required: true, message: 'Please input space!' },
                      {
                        validator: directoryValidator,
                        message: 'Provided string is not a directory!'
                      }
                    ]
                  })(<Input size="small" />)}
                </FormItem>
              }
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span={6}>
              <h3>Limit:</h3>
            </Col>
            <Col span={12}>
              {!isEditing && <span>{spaceLimit}</span>}
              {isEditing &&
                <FormItem>
                  {getFieldDecorator('spaceLimit', {
                    initialValue: /^\d*\.?\d+/.exec(spaceLimit)[0],
                    rules: [
                      { required: true, message: 'Please input limit!' }
                    ]
                  })(<InputNumber
                    size="small"
                    min={1}
                    formatter={value => `${value}GB`}
                    parser={value => value.replace('GB', '')}
                  />)}
                </FormItem>
              }
            </Col>
          </Row>
        </Row>
      </Form>
    );
  }
}


export default Form.create()(ConsumerConfigsNormal);
