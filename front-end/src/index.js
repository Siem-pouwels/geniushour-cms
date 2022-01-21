import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <UserProvider>
      < App />
    </UserProvider>
  </SnackbarProvider>,
  document.getElementById('root')
);