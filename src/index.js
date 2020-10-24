import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBNH6xfsJiMiaIdyPsDwqf1Qe2aQgHUYEU",
  authDomain: "angadi-9c0e9.firebaseapp.com",
  databaseURL: "https://angadi-9c0e9.firebaseio.com",
  projectId: "angadi-9c0e9",
  storageBucket: "angadi-9c0e9.appspot.com",
  messagingSenderId: "691892152218",
  appId: "1:691892152218:web:81abb516f9d1bbe6afbc23",
  measurementId: "G-1VRNB8J9TP"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);