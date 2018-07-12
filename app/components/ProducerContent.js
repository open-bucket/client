import * as React from 'react';
import { Row, Col, Button, Input, Progress } from 'antd';

export default class ProducerContent extends React.Component {
  render() {
    const { isEditingName, selectedProducer } = this.props;
    if (selectedProducer) {
      const { name } = selectedProducer;
      return (
        <Row>
          <Row type="flex" align="middle" gutter={8} style={{ marginTop: '8px' }}>
            {isEditingName && <Col span={8}><Input defaultValue={this.state.newName} size="small" onChange={this.handleNewNameChange} /></Col>}
            {isEditingName && <Col span={1}><Button shape="circle" size="small" icon="save" onClick={this.handleSaveName} /> </Col>}
            {!isEditingName && <Col ><h1>{name}</h1></Col>}
            {!isEditingName && <Col span={1}><Button shape="circle" size="small" icon="edit" onClick={this.handleEditName} /></Col>}
          </Row>
          <Row type="flex" justify="space-between" gutter={8}>
            <Col>
              <h2>Producer Space</h2>
            </Col>
          </Row>
          <Row>
            <span>0gb out of 5gb</span>
            <Progress percent={0} />
          </Row>

          <Row>
            <h2>Payment</h2>
          </Row>
          <Row type="flex" justify="start" align="middle" gutter={2}>
            <Col span={4}>
              <h3>Accumulate Payment:</h3>
            </Col>
            <Col span={8}>
              {0} ETH
            </Col>
          </Row>

          <Row type="flex" justify="start" align="middle" gutter={8}>
            <Col>
              <h2 style={{ marginBottom: '0' }}>Configs</h2>
            </Col>
            <Col>
              <Button shape="circle" size="small" icon="edit" />
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span={4}>
              <h3>Directory:</h3>
            </Col>
            <Col>
              <span>C://</span>
            </Col>
          </Row>
          <Row type="flex" justify="start">
            <Col span={4}>
              <h3>Limit:</h3>
            </Col>
            <Col>
              <span>5 GB</span>
            </Col>
          </Row>
        </Row>
      );
    }

    return (<span >Please select a producer</span>);
  }
}
