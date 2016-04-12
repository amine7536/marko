import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from '../components/EditorCodeM';
import * as EditorActions from '../actions/editor';

/*
* Select Props we Need
*/
function mapStateToProps(state) {
  return {
    options: state.editor.options,
    markdown: state.editor.markdown,
  };
}

/*
* Connect Actions and dispatch
*/
function mapDispatchToProps(dispatch) {
  return bindActionCreators(EditorActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
