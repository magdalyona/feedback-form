import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} autoHideDuration={4000}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
