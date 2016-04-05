import React from 'react';
import SplitPane from 'react-split-pane';
import Editor from './EditorContainer';
import Preview from './PreviewContainer';

const EditorPage = () => (
  <div>
    <SplitPane split="vertical">
      <Editor />
      <Preview />
    </SplitPane>
  </div>
);

export default EditorPage;
