import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class Editor extends Component {
  static propTypes = {
    updateMarkdown: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  };

  componentDidMount() {
    this._editor = this.refs.editor.getCodeMirror();
    this.handleResize();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this._editor.setSize('100%', window.innerHeight);
  }

  render() {
    const { theme, updateMarkdown } = this.props;
    const options = {
      lineNumbers: true,
      mode: 'markdown',
      theme
    };
    return (
      <CodeMirror
        ref="editor"
        onChange={(event) => updateMarkdown(event)}
        options={options}
      />
    );
  }
}

export default Editor;
