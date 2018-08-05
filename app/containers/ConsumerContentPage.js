import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConsumerContent from '../components/ConsumerContent';
import * as ConsumerContentActions from '../actions/consumerContent';
import * as ConsumerActions from '../actions/consumer';
import * as ContractActions from '../actions/contract';

function mapStateToProps(state) {
  return {
    selectedConsumer: state.consumer.consumers.find(consumer =>
      consumer.id === Number(state.consumerContent.selectedConsumerId)),
    isEditingName: state.consumerContent.isEditingName,
    accounts: state.contract.accounts,
    isVisibleActivationForm: state.consumerContent.isVisibleActivationForm,
    uploadingConsumerIds: state.consumer.uploadingConsumerIds,
    files: state.consumerContent.files,
    downloadingContexts: state.consumer.downloadingContexts,
    isDeletingFile: state.consumerContent.isDeletingFile,
    deletingFileIds: state.consumer.deletingFileIds
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ConsumerContentActions,
    getAccounts: ContractActions.getAccounts,
    upload: ConsumerActions.upload,
    download: ConsumerActions.download,
    deleteFile: ConsumerActions.deleteFile
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerContent);
