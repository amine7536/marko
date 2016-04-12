/*
* Action Types
*/

export const MARKDOWN_CHANGED = 'MARKDOWN_CHANGED';
export const TOGGLE_SCROLLING = 'TOGGLE_SCROLLING';

/*
* Action Creators
*/

export function updateMarkdown(md) {
  return {
    type: MARKDOWN_CHANGED,
    payload: {
      markdown: md
    }
  };
}

export function toggleScrolling(scrollinfo) {
  return {
    type: TOGGLE_SCROLLING,
    payload: {
      scrollinfo
    }
  };
}
