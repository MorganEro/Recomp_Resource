import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { BrowserRouter } from "react-router-dom";
import { onLoginStatusChange } from "./modules/authManager";
import {ThisUser} from "./modules/userManager";
import { Spinner } from "reactstrap";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [thisUser, setThisUser] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      ThisUser().then(setThisUser);
    } else {
      setThisUser(null);
    }
  }, [isLoggedIn]);

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} thisUser={thisUser}/>
        <ApplicationViews isLoggedIn={isLoggedIn} thisUser={thisUser}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
