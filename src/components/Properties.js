import React from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
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

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Properties(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleReserve = (e) => {
    e.preventDefault();

    // const config = {
    //   method: "get",
    //   // url: `https://airbnb-iq.herokuapp.com/v1/property/${city[0]}`,
    // };

    // Axios(config)
    //   .then(function (response) {
    //     console.log(response);
    //     history.push("/property");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    history.push("/property");
  };

  // TODO:
  //    add cityId & districtId as params in the URL
  //    this will keep the search results after refreshing the page

  let PropertyImages = [
    "https://a0.muscache.com/im/pictures/miso/Hosting-45475252/original/4e00ce87-386e-4816-88d8-b9455e905632.jpeg?im_w=1200",
    "https://a0.muscache.com/im/pictures/miso/Hosting-45475252/original/53da7ccb-26e5-4899-99ca-e06ff1f33a71.jpeg?im_w=1440",
    "https://a0.muscache.com/im/pictures/29da652d-620a-4eb9-bfcd-df6378fedecb.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/22dad4d4-3953-4dec-8b8c-88b3c2276178.jpg?im_w=1200",
    "https://a0.muscache.com/im/pictures/1631226d-e6ea-4508-8194-390736f627e6.jpg?im_w=1440",
  ];

  return (
    <Page title="Properties">
      <Container className={classes.cardGrid} maxWidth="xl">
        <Grid container spacing={2}>
          {!props.searchResults[0]
            ? null
            : props.searchResults[0].map((card, index) => (
                <Grid item key={card.id} xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={PropertyImages[index]}
                      title={card.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
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
                      <Typography>${card.price} / month</Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Page>
  );
}
