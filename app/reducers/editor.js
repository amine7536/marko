import { MARKDOWN_CHANGED } from '../actions/editor';
import parser from '../utils/parser';

const initialState = {
  payload: {
    html: '',
    markdown: ''
  },
  theme: 'rubyblue' /* todo: Load Initial State from configuration file ~/.markorc */
};

export default function marko(state = initialState, action) {
  switch (action.type) {
    case MARKDOWN_CHANGED:
      return Object.assign({}, state, {
        markdown: action.payload.markdown,
        html: parser.render(action.payload.markdown)
      });
    default:
      return state;
  }
}
