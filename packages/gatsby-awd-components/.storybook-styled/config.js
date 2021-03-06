import * as React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
// import '!style-loader!css-loader!sass-loader!../src/scss/app.scss';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

addDecorator(storyFn => (
  <div style={{ maxWidth: '1088px', margin: '0 auto' }}>{storyFn()}</div>
));
addDecorator(withInfo);
const req = require.context('../src/stories', true, /\.stories\.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = '';
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};

addParameters({
  options: {
    showPanel: false,
    theme: {
      brandTitle: 'Unilever components library',
    },
  },
});
configure(loadStories, module);
