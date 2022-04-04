import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app';
import Api from './services/api';

console.log('index.js');

const api = new Api(`${window.location.protocol}//${window.location.hostname}:4000`);

window.addEventListener("storage", (e) => {
  console.log('스토리지 변경감지', e);
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App api={api} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);