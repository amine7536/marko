import { MARKDOWN_CHANGED, TOGGLE_SCROLLING } from '../actions/editor';
import parser from '../utils/markdownParser';
import browserWindow from '../utils/browserWindow';

const initialState = {
  html: '',
  markdown: browserWindow.MarkdownBuffer.markdown || '',
  scrollInfo: {},
  options: {
    lineNumbers: false,
    mode: 'markdown',
    theme: 'rubyblue', /* ToDo: Load Initial State from configuration file ~/.markorc */
  }
};

export default function marko(state = initialState, action) {
  switch (action.type) {
    case MARKDOWN_CHANGED: {
      // Render HTML
      const html = parser.render(action.payload.markdown);
      // Keep markdown to Save/File
      browserWindow.MarkdownBuffer.markdown = action.payload.markdown;

      return Object.assign({}, state, {
        markdown: action.payload.markdown,
        html,
      });
    }
    case TOGGLE_SCROLLING: {
      return Object.assign({}, state, {
        scrollInfo: action.payload.scrollinfo,
      });
    }
    default:
      return state;
  }
}
