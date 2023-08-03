import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import firebase from "firebase/app";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "recomp-resource.firebaseapp.com",
  projectId: "recomp-resource",
  storageBucket: "recomp-resource.appspot.com",
  messagingSenderId: "807004819396",
  appId: "1:807004819396:web:c57cfa04f839dbf1789e91",
};
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

reportWebVitals();
