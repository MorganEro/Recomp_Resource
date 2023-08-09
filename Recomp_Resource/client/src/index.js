import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "firebase/app";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <App />

);

reportWebVitals();
