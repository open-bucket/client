import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Consumer from '../components/Consumer';
import * as ConsumerActions from '../actions/consumer';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConsumerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Consumer);
