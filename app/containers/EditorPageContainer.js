import { connect } from 'react-redux';
import EditorPage from './EditorPage';

/*
* Select Props we Need
*/
function mapStateToProps(state) {
  return {
    scrollInfo: state.editor.scrollInfo,
  };
}

export default connect(mapStateToProps)(EditorPage);
