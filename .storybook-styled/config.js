import { configure } from '@storybook/react';
import '!style-loader!css-loader!sass-loader!../src/scss/main.scss';
import { addParameters } from '@storybook/react';

const req = require.context('../stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    showPanel: false,
    theme: {
      brandTitle: 'Unilever components library',
    },
  },
});

configure(loadStories, module);
