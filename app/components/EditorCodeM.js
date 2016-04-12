import React, { Component, PropTypes } from 'react';
// import CodeMirror from 'react-codemirror';
import CodeMirror from './CodeMirror';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import 'codemirror/mode/markdown/markdown';
import './EditorCodeM.css';

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
      <CodeMirror
        ref="editor"
        value={markdown}
        onChange={debounce((event) => updateMarkdown(event), 10)}
        onScroll={throttle((event) => toggleScrolling(event), 10)}
        options={options}
      />
    );
  }
}

export default Editor;
