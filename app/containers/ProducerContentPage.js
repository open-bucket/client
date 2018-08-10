import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProducerContent from '../components/ProducerContent';

import * as ProducerContentActions from '../actions/producerContent';
import * as ProducerActions from '../actions/producer';
import * as ContractActions from '../actions/contract';

function mapStateToProps(state) {
  return {
    selectedProducer: state.producer.producers.find(producer =>
      producer.id === Number(state.producerContent.selectedProducerId)),
    isEditingName: state.producerContent.isEditingName,
    accounts: state.contract.accounts,
    isVisibleActivationForm: state.producerContent.isVisibleActivationForm,
    startingProducers: state.producer.startingProducers,
    runningProducerContexts: state.producer.runningProducerContexts,
    stoppingProducers: state.producer.stoppingProducers,
    spaceLimit: state.producerContent.spaceLimit,
    actualSize: state.producerContent.actualSize,
    availableSpace: state.producerContent.availableSpace,
    balance: state.producerContent.balance,
    isWithdrawingProducer: state.producerContent.isWithdrawingProducer,
    updatingProducerIds: state.producer.updatingProducerIds
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ProducerContentActions,
    getAccounts: ContractActions.getAccounts,
    startProducer: ProducerActions.startProducer,
    stopProducer: ProducerActions.stopProducer,
    updateProducer: ProducerActions.updateProducer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProducerContent);
