import React from 'react';
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';
import { AuthProvider } from './store/auth';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <Router>
        <ThemeProvider>
          <App />

          <ToastContainer
            position="top-right"
            toastClassName="toastbody"
            theme="colored"
            pauseOnFocusLoss={false}
            pauseOnHover={true}
            draggable={true}
            autoClose={3000}
            draggablePercent={60}
            closeOnClick={true}
          />
        </ThemeProvider>
      </Router>
    </StrictMode>
  </AuthProvider>
);
