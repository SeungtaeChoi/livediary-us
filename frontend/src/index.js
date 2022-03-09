import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app';
import Api from './services/api';

const api = new Api();

let storage = {};

window.addEventListener("storage", (e) => {
  // console.log('스토리지 변경감지', e);
});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App storage={storage} api={api} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);