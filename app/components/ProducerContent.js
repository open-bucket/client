import * as React from 'react';

export default class ProducerContent extends React.Component {
  render() {
    return (<div>producer {this.props.match.params.id}</div>);
  }
}
