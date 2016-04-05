import React, { PropTypes } from 'react';
import 'github-markdown-css';
import classNames from 'classnames';
import styles from './Preview.css';

const Preview = (props) => {
  const { value } = props;
  const previewStyles = classNames(styles.container, 'markdown-body');
  return (
      <div className={previewStyles} dangerouslySetInnerHTML={{ __html: value }} />
  );
};

Preview.propTypes = {
  value: PropTypes.string
};

export default Preview;
