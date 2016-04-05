import React, { PropTypes } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';
import 'brace/theme/github';

const Editor = (props) => {
  const { theme, updateMarkdown } = props;
  return (
      <AceEditor
        mode="markdown"
        theme={theme}
        onChange={(event) => updateMarkdown(event)}
        name="Editor"
        width="100px"
        height="100px"
        editorProps={{ $blockScrolling: true }}
      />
    );
};

Editor.propTypes = {
  updateMarkdown: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired
};

export default Editor;
