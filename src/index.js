import "./index.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Property from "./components/Property";

import Axios from "axios";
Axios.defaults.baseURL = "https://airbnb-iq.herokuapp.com/v1";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("airbnbToken"))
  );

  return (
    <BrowserRouter>
      <CssBaseline />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin" exact>
          <SignIn setLoggedIn={setLoggedIn} />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/properties" exact>
          <Properties />
        </Route>
        <Route path="/property" exact>
          <Property />
        </Route>
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

// Apply the changes without reloading the browser
if (module.hot) {
  module.hot.accept();
}
