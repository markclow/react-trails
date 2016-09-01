import React from 'react';
import { render } from 'react-dom';
import routes from './Routes';

window.React = React;

render(
  routes,
  document.getElementById('content')
);
