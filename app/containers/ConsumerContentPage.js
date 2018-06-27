import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConsumerContent from '../components/ConsumerContent';
import * as ConsumerActions from '../actions/consumer';

function mapStateToProps(state) {
  return {
    selectedConsumer: state.consumer.selectedConsumer,
    isEditingAddress: state.consumer.isEditingAddress
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConsumerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerContent);
