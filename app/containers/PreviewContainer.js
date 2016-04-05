import { connect } from 'react-redux';
import Preview from '../components/Preview';

/*
* Select Props we Need
*/
function mapStateToProps(state) {
  return {
    value: state.editor.html
  };
}

export default connect(mapStateToProps)(Preview);
