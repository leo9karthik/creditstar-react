import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assests/css/main.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';
import Interceptor from './interceptors/Interceptor';
import Loader from './components/Loader';

const root = ReactDOM.createRoot(document.getElementById('root'));
Interceptor();
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <BrowserRouter>
      <Loader />
      <App />
    </BrowserRouter>
  </AuthContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
