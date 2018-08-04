import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Consumer from '../components/Consumer';
import * as ConsumerActions from '../actions/consumer';
import * as ConsumerContentActions from '../actions/consumerContent';


function mapStateToProps(state) {
  return {
    consumers: state.consumer.consumers,
    selectedConsumer: state.consumerContent.selectedConsumer,
    username: state.auth.user.username,
    isVisibleCreateConsumerForm: state.consumer.isVisibleCreateConsumerForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ConsumerActions,
    setSelectedConsumerId: ConsumerContentActions.setSelectedConsumerId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Consumer);
