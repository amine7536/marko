
/*
* Action Types
*/

export const MARKDOWN_CHANGED = 'MARKDOWN_CHANGED';

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
