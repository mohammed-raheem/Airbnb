import React from "react";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainCopyright: {
    position: "absolute",
    left: "40%",
    bottom: "2%",
  },
  copyright: {
    color: "#fff",
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <>
      <Box mt={5} className={classes.mainCopyright}>
        <Typography variant="body2" className={classes.copyright}>
          {"Copyright © "}
          <Link to="/" className={classes.copyright}>
            Stack Ninjas
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
