import ready from 'domready';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';

ready(() => {
  ReactDOM.render((
      <Root />
    ),
    document.getElementById("mount")
  );
});
