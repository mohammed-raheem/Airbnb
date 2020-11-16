import React, { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
// import { message } from "antd";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// import { register } from "../api";
import Page from "./Page";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  let history = useHistory();

  const [firstName, setFirstName] = useState();
  const [middleName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        "https://airbnb-iq.herokuapp.com/v1/register",
        { firstName, middleName, lastName, phone, email, password }
      );
      if (response.data.status) {
        console.log(response);
        localStorage.setItem("airbnbToken", response.data.data.data.token);
        history.push("/otp");
      } else {
        console.log("There is an error");
      }
    } catch (error) {
      console.log("there is an error");
    }

    // USING FETCH INSTEAD OF AXIOS
    // register(
    //   { firstName, middleName, lastName, phone, email, password },
    //   (err, result) => {
    //     if (err) throw err;
    //     if (!result.status) {
    //       Object.keys(result.errMsg).forEach((key) => {
    //         message.error(result.errMsg[key]);
    //       });
    //     } else {
    //       console.log(result);
    //       localStorage.setItem("token", result.data.token);
    //       localStorage.setItem("user", JSON.stringify(result.data.user));
    //       // router.replace("/otp");
    //     }
    //   }
    // );
  };

  const classes = useStyles();

  return (
    <Page title="Sign Up">
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  autoComplete="firstName"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoComplete="middleName"
                  name="middleName"
                  variant="outlined"
                  required
                  fullWidth
                  id="middleName"
                  label="Middle Name"
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  autoComplete="lastName"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Page>
  );
}
