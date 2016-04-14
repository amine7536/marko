import React, { PropTypes } from 'react';
import classNames from 'classnames';
import styles from './Preview.css';

const Preview = (props) => {
  const { html } = props;
  const previewStyles = classNames(styles.container, 'markdown-body');
  return (
      <div className={previewStyles} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

Preview.propTypes = {
  html: PropTypes.string
};

export default Preview;
