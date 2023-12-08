import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ApolloProvider from './ApolloProvider';
import { AuthProvider } from './context/AuthContext';

// our client application needs access to...
// client (apolloProvider)
// authorization context 
// Browser Router (react router) /login /register 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <React.StrictMode>
      <ApolloProvider/>
    </React.StrictMode>
  </AuthProvider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
