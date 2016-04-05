import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from '../components/EditorCodeM';
import * as EditorActions from '../actions/editor';

/*
* Select Props we Need
*/
function mapStateToProps(state) {
  return {
    theme: state.editor.theme
  };
}

/*
* Connect Actions and dispatch
*/
function mapDispatchToProps(dispatch) {
  return bindActionCreators(EditorActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
