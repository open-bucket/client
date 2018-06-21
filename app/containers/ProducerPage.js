// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Producer from '../components/Producer';
// import * as CounterActions from '../actions/counter';

function mapStateToProps() {
  return {
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch);
// }

export default connect(mapStateToProps)(Producer);
