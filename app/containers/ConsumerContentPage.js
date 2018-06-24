import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConsumerContent from '../components/ConsumerContent';
import * as ConsumerContentActions from '../actions/consumerContent';

function mapStateToProps(state) {
  return {
    ...state.consumer.selectedConsumer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConsumerContentActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerContent);
