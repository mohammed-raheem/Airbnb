import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import NotificationBadge from "./NotificationBadge";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    color: "#fff",
    textDecoration: "none",
  },
  logBtns: {
    color: "#fff",
    textDecoration: "none",
    marginLeft: theme.spacing(2),
  },
}));

export default function Header(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleBecomeHost = () => {
    let myHeaders = new Headers();
    myHeaders.append("token", localStorage.getItem("airbnbToken"));
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://airbnb-iq.herokuapp.com/v1/becomehost", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        props.setIsOwner(true);
        localStorage.setItem("owner", true);
        history.push("/post-property");
      })
      .catch((error) => console.log("error", error));
  };

  const handleLogout = () => {
    props.setLoggedIn(false);
    localStorage.removeItem("airbnbToken");
    localStorage.removeItem("user");
  };

  const loggedOutBtns = () => {
    return (
      <>
        <Link to="/signin" className={classes.logBtns}>
          Login
        </Link>
        <Link to="/signup" className={classes.logBtns}>
          Sign Up
        </Link>
      </>
    );
  };

  const loggedInBtns = () => {
    return (
      <>
        <NotificationBadge />
        <button onClick={handleBecomeHost}>Become a host</button>
        <button onClick={handleLogout}>Sign Out</button>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.logo}>
                Airbnb
              </Link>
            </Typography>
            {props.loggedIn ? loggedInBtns() : loggedOutBtns()}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
