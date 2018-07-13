import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConsumerContent from '../components/ConsumerContent';
import * as ConsumerContentActions from '../actions/consumerContent';
import * as ContractActions from '../actions/contract';

function mapStateToProps(state) {
  return {
    selectedConsumer: state.consumerContent.selectedConsumer,
    isEditingName: state.consumerContent.isEditingName,
    accounts: state.contract.accounts,
    isActivatingConsumer: state.consumerContent.isActivatingConsumer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...ConsumerContentActions,
    getAccounts: ContractActions.getAccounts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerContent);
