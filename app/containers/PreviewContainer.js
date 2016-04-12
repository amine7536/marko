import { connect } from 'react-redux';
import Preview from '../components/Preview';

/*
* Select Props we Need
*/
function mapStateToProps(state) {
  return {
    html: state.editor.html,
    scrollTop: state.editor.scrollTop,
  };
}

export default connect(mapStateToProps)(Preview);
