import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import scrollToPosition from '../utils/scrollToPosition';
import SplitPane from 'react-split-pane';
import Editor from './EditorContainer';
import Preview from './PreviewContainer';

class EditorPage extends Component {
  static propTypes = {
    scrollInfo: PropTypes.number
  };

  componentDidMount() {
    this.preview = findDOMNode(this.refs.splitpane.refs.pane2);
    scrollToPosition(this.preview, 0);
  }

  componentDidUpdate() {
    const { scrollInfo } = this.props;
    const percentage = (scrollInfo.top * 100) / (scrollInfo.height - scrollInfo.clientHeight);
    const scroll = percentage * (this.preview.scrollHeight - this.preview.offsetHeight) / 100;
    scrollToPosition(this.preview, scroll);
  }

  render() {
    return (
      <SplitPane split="vertical" ref="splitpane" >
          <Editor />
          <Preview />
      </SplitPane>
    );
  }
}

export default EditorPage;
