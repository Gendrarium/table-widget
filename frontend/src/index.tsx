import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';

const modalRoot = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(modalRoot);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);