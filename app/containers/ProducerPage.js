import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Producer from '../components/Producer';
import * as ProducerActions from '../actions/producer';
import * as ProducerContentActions from '../actions/producerContent';

function mapStateToProps(state) {
  return {
    producers: state.producer.producers,
    selectedProducer: state.producerContent.selectedProducer,
    isVisibleCreateProducerForm: state.producer.isVisibleCreateProducerForm,
    username: state.auth.user.username
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ProducerActions,
    setSelectedProducerId: ProducerContentActions.setSelectedProducerId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Producer);
