import React from 'react';
import ReactDOM from 'react-dom';
import { MainDataProvider } from './context/MainContext'
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <MainDataProvider>
      <App />
    </MainDataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

