import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store';



import firebase, { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';


var firebaseApp;
var ga4;



var firebaseConfig

console.log("process.env.NODE_ENV", process.env.NODE_ENV)
console.log("process.env.REACT_APP_NODE_ENV", process.env.REACT_APP_NODE_ENV)

console.log("process.env.REACT_APP_FIREBASE_API_KEY", process.env.REACT_APP_FIREBASE_APIKEY)
console.log("process.env.REACT_APP_FIREBASE_AUTH_DOMAIN", process.env.REACT_APP_FIREBASE_AUTHDOMAIN)
console.log("process.env.REACT_APP_FIREBASE_PROJECT_ID", process.env.REACT_APP_FIREBASE_PROJECTID)
console.log("process.env.REACT_APP_FIREBASE_STORAGE_BUCKET", process.env.REACT_APP_FIREBASE_STORAGEBUCKET)
console.log("process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID", process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID)
console.log("process.env.REACT_APP_FIREBASE_APP_ID", process.env.REACT_APP_FIREBASE_APPID)
console.log("process.env.REACT_APP_FIREBASE_MEASUREMENT_ID", process.env.REACT_APP_FIREBASE_MEASUREMENTID)

console.log("process.env.FIREBASE_APIKEY", process.env.FIREBASE_APIKEY)
console.log("process.env.FIREBASE_AUTHDOMAIN", process.env.FIREBASE_AUTHDOMAIN)
console.log("process.env.FIREBASE_PROJECTID", process.env.FIREBASE_PROJECTID)
console.log("process.env.FIREBASE_STORAGEBUCKET", process.env.FIREBASE_STORAGEBUCKET)
console.log("process.env.FIREBASE_MESSAGINGSENDERID", process.env.FIREBASE_MESSAGINGSENDERID)
console.log("process.env.FIREBASE_APPID", process.env.FIREBASE_APPID)
console.log("process.env.FIREBASE_MEASUREMENTID", process.env.FIREBASE_MEASUREMENTID)


if (process.env.NODE_ENV === 'development') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  };
  firebaseApp = initializeApp(firebaseConfig);
  ga4 = getAnalytics(firebaseApp);
} else if (process.env.NODE_ENV === 'production') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  };
  firebaseApp = initializeApp(firebaseConfig);
  ga4 = getAnalytics(firebaseApp);
}





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
