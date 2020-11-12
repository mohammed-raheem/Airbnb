import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Axios from "axios";

import Page from "./Page";

const useStyles = makeStyles((theme) => ({
  home: {
    backgroundImage:
      "url(https://a0.muscache.com/im/pictures/2ce67edf-49f9-4666-9c51-94419a9b7e6a.jpg?im_w=1200)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(24),
    marginTop: "-64px",
  },
  mainTitle: {
    marginBottom: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
    color: "#fff",
  },
  selectField: {
    width: "100%",
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255 255 255)",
    },
  },
  submit: {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

function Home() {
  const classes = useStyles();

  // const [username, setUsername] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await Axios.post("/register", {
  //       username: username,
  //       email: email,
  //       password: password,
  //     });
  //     console.log("user registered");
  //   } catch (e) {
  //     console.log("there is some errors");
  //   }
  // };

  return (
    <Page title="Home">
      <div className={classes.home}>
        <Container maxWidth="md">
          <Typography className={classes.mainTitle} component="h1" variant="h2">
            Where do you want to live?
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <FormControl
                  size="small"
                  variant="filled"
                  className={classes.selectField}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Province
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  size="small"
                  variant="filled"
                  className={classes.selectField}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  size="small"
                  variant="filled"
                  className={classes.selectField}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    District
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </Page>
  );
}

export default Home;
