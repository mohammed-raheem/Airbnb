import "./index.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import Otp from "./components/Otp";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Home from "./components/Home";
import Properties from "./components/Properties";
import Property from "./components/Property";
import PostProperty from "./components/postPropertyPage/PostProperty";
import NotificationsPage from "./components/NotificationsPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("user"))
  );

  return (
    <BrowserRouter>
      <CssBaseline />
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup" exact>
          {loggedIn ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route path="/otp" exact>
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Otp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          )}
        </Route>
        <Route path="/signin" exact>
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          )}
        </Route>
        <Route path="/properties" exact>
          <Properties />
        </Route>
        <Route path="/property" exact>
          <Property />
        </Route>
        <Route path="/post-property" exact>
          <PostProperty />
        </Route>
        <Route path="/notifications" exact>
          <NotificationsPage />
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
