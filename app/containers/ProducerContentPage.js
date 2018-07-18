import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProducerContent from '../components/ProducerContent';

import * as ProducerContentActions from '../actions/producerContent';
import * as ProducerActions from '../actions/producer';
import * as ContractActions from '../actions/contract';

function mapStateToProps(state) {
  return {
    selectedProducer: state.producerContent.selectedProducer,
    accounts: state.contract.accounts,
    isVisibleActivationForm: state.producerContent.isVisibleActivationForm,
    startingProducers: state.producer.startingProducers,
    runningProducerContexts: state.producer.runningProducerContexts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ProducerContentActions,
    getAccounts: ContractActions.getAccounts,
    startProducer: ProducerActions.startProducer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProducerContent);
