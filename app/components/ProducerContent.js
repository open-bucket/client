import * as React from 'react';

export default class ProducerContent extends React.Component {
  render() {
    return (
      <div>
        <h1>Producer {this.props.match.params.id}</h1>
        <h2>Space</h2>
      </div>
    );
  }
}
