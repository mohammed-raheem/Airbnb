import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Page from "./Page";

const useStyles = makeStyles((theme) => ({
  cardActions: {
    justifyContent: "space-between",
    padding: "8px 15px",
  },
  reserveBtn: {
    width: "40%",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Album() {
  const classes = useStyles();

  const handleReserve = () => {};

  return (
    <Page title="Properties">
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Property title header testing the header
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button
                    className={classes.reserveBtn}
                    variant="outlined"
                    color="primary"
                    onClick={handleReserve}
                  >
                    Reserve
                  </Button>
                  <Typography>$400 / month</Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
