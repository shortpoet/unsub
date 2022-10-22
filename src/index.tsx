import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

import { MessageApi } from './api/MessageApi';
// import { Message } from '../model/Message';
import { IApiConfig } from './api/IApi';

const fetchData = async () => {
  // const data = await getData();
  const config: IApiConfig = {
    baseURL: 'http://localhost:3000',
    timeout: 10000
  };
  try {
    const api = new MessageApi(config);

    const response = await api.getMessages();
    const data = response;
    console.log('hello world', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const data = fetchData();

console.log('data', data);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
