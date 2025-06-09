import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import this
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter> {/* ✅ Wrap your App here */}
      <App />
    </BrowserRouter>
  </Provider>
);
