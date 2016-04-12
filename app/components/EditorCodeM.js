import React, { Component, PropTypes } from 'react';
// import CodeMirror from 'react-codemirror';
import CodeMirror from 'codemirror';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/mode/markdown/markdown';
import ReactCodeMirror from './ReactCodeMirror';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

class Editor extends Component {
  static propTypes = {
    updateMarkdown: PropTypes.func.isRequired,
    toggleScrolling: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    markdown: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this._editor = this.refs.editor.getCodeMirror();
    this.handleResize();
    // Resize editor on window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this._editor.setSize('100%', window.innerHeight);
  }

  render() {
    const { options, markdown, updateMarkdown, toggleScrolling } = this.props;
    return (
      <ReactCodeMirror
        ref="editor"
        codeMirrorInstance={CodeMirror}
        value={markdown}
        onChange={debounce((event) => updateMarkdown(event), 10)}
        onScroll={throttle((event) => toggleScrolling(event), 10)}
        options={options}
      />
    );
  }
}

export default Editor;
