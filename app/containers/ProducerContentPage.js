import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProducerContent from '../components/ProducerContent';
import * as ProducerActions from '../actions/producerContent';

function mapStateToProps(state) {
  return {
    selectedProducer: state.producerContent.selectedProducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProducerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProducerContent);
