import React, { Component, PropTypes } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/markdown/markdown';

class Editor extends Component {
  static propTypes = {
    updateMarkdown: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired
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
    const { options, updateMarkdown } = this.props;
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
