
import './App.scss';
import { appConfig } from './configs/configurator';
import ScopeProxy from './ScopeProxy';
import firebase, { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

function App() {

  console.log("App()")
  console.log("App Config: ", appConfig)

// Initialize the firebase

var firebaseApp;
var ga4;



var firebaseConfig

console.log("process.env.NODE_ENV", process.env.NODE_ENV)
console.log("process.env.REACT_APP_FIREBASE_API_KEY", process.env.REACT_APP_FIREBASE_API_KEY)
console.log("process.env.REACT_APP_FIREBASE_AUTH_DOMAIN", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN)
console.log("process.env.REACT_APP_FIREBASE_PROJECT_ID", process.env.REACT_APP_FIREBASE_PROJECT_ID)
console.log("process.env.REACT_APP_FIREBASE_STORAGE_BUCKET", process.env.REACT_APP_FIREBASE_STORAGE_BUCKET)
console.log("process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID", process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID)
console.log("process.env.REACT_APP_FIREBASE_APP_ID", process.env.REACT_APP_FIREBASE_APP_ID)
console.log("process.env.REACT_APP_FIREBASE_MEASUREMENT_ID", process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)

console.log("process.env.FIREBASE_APIKEY", process.env.FIREBASE_APIKEY)
console.log("process.env.FIREBASE_AUTHDOMAIN", process.env.FIREBASE_AUTHDOMAIN)
console.log("process.env.FIREBASE_PROJECTID", process.env.FIREBASE_PROJECTID)
console.log("process.env.FIREBASE_STORAGEBUCKET", process.env.FIREBASE_STORAGEBUCKET)
console.log("process.env.FIREBASE_MESSAGINGSENDERID", process.env.FIREBASE_MESSAGINGSENDERID)
console.log("process.env.FIREBASE_APPID", process.env.FIREBASE_APPID)
console.log("process.env.FIREBASE_MEASUREMENTID", process.env.FIREBASE_MEASUREMENTID)


if (process.env.NODE_ENV === 'development') {
  firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
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
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID,
  };
  firebaseApp = initializeApp(firebaseConfig);
  ga4 = getAnalytics(firebaseApp);
}


  return (
    <div className="App" data-theme="dark">
      <ScopeProxy />
    </div>
  );
}

export default App;
