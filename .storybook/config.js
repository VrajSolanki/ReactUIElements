import { configure } from '@storybook/react';
import '@storybook/addon-console';
import { addDecorator } from '@storybook/react';

function loadStories() {
  require('../src/stories/progressBar.js');
  require('../src/stories/button.js');
  require('../src/stories/checkList.js');
  require('../src/stories/inputTextField.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);