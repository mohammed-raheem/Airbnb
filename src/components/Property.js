import React from "react";
import { Box, Container, Divider, Grid, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Page from "./Page";
import LightBox from "./LightBox";
import ReservationCard from "./ReservationCard";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
  },
});

function Property() {
  const classes = useStyles();

  return (
    <Box pt="50px" className={classes.root}>
      <Page title="Property Name">
        <Container>
          <Box mb="20px">
            <Typography variant="h4">Property Title</Typography>
            <Typography variant="body2">Feedback - City Name</Typography>
          </Box>
          <Box mb="20px">
            <LightBox />
          </Box>
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Box mb="15px">
                <Typography variant="h5">Description:</Typography>
              </Box>
              <Box mb="20px">
                <Typography>
                  Beautiful, bright & vividly renovated Studio with with huge
                  windows and very high ceilings located in the heart of
                  Prenzlauer Berg and Berlin.
                </Typography>
                <br />
                <Typography variant="h6">The space</Typography>
                <Typography>
                  This bright studio is located in the center of Prenzlauer
                  Berg. Its right next to the Mauerpark with its big flea market
                  and live karaoke on Sundays. Several bars, clubs,
                  supermarkets, restaurants and lots of coffee places are around
                  the corner. Since the apartment faces south and has very big
                  windows and high ceilings (4 meters) the sun shines in even
                  though its located on the ground floor. The kitchen is fully
                  equipped in case you feel like cooking at home, otherwise you
                  can have all kinds of tasty cuisines right next door. There is
                  highspeed WiFi (50mbits/s), a TV & DVD Player and a Sound
                  System.
                </Typography>
              </Box>
            </Grid>
            <Grid item md={4} xs={12}>
              <ReservationCard />
            </Grid>
          </Grid>
          <Box mb="30px">MAP</Box>
        </Container>
      </Page>
    </Box>
  );
}

export default Property;
