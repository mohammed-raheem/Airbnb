import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  feedParednt: {
    position: "relative",
  },
  feedback: {
    position: "absolute",
    right: "10px",
  },
});

export default function ReservationCard() {
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.root} m="5rem">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.feedParednt}>
              <Typography component="span">$400 / month</Typography>
              <Typography component="span" className={classes.feedback}>
                Feedback
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth={true}>
                Reserve
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
