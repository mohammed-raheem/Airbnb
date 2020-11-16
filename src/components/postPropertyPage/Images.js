import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import UploadImages from "./UploadImages";

// const useStyles = makeStyles((theme) => ({}));

export default function Images() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload up to 5 images
      </Typography>
      <UploadImages />
    </React.Fragment>
  );
}
