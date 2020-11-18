import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

import Description from "./Description";
import Address from "./Address";
import Images from "./Images";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  // Property description states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [propertySize, setPropertySize] = useState();
  const [bedRooms, setBedRooms] = useState(0);
  const [bathRooms, setBathRooms] = useState(0);

  // Property address states
  const [province, setProvince] = useState(0);
  const [city, setCity] = useState(0);
  const [district, setDistrict] = useState(0);

  // Property images states
  const [fileList, setFileList] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);

  const steps = ["Property Description", "Address", "Images"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Description
            setTitle={setTitle}
            setDescription={setDescription}
            setPrice={setPrice}
            setPropertySize={setPropertySize}
            setBedRooms={setBedRooms}
            setBathRooms={setBathRooms}
          />
        );
      case 1:
        return (
          <Address
            province={province}
            setProvince={setProvince}
            city={city}
            setCity={setCity}
            district={district}
            setDistrict={setDistrict}
          />
        );
      case 2:
        return <Images setFileList={setFileList} fileList={fileList} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleComplete = async () => {
    var formdata = new FormData();
    formdata.append("image", fileList[0].originFileObj);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", localStorage.getItem("airbnbToken"));

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      "https://api.imgbb.com/1/upload?key=7fa3fd0239a4d88f837cb9ecfa505708",
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        console.log(result.data.display_url);

        let raw = JSON.stringify({
          title: title,
          description: description,
          districtId: district,
          cityId: city,
          images: result.data.display_url,
          price: price,
          bedrooms: bedRooms,
          bathrooms: bathRooms,
          size: propertySize,
        });
        await fetch("https://airbnb-iq.herokuapp.com/v1/postproperty", {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(JSON.parse(result));
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
    handleNext();
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Post Property
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for publishing you property.
                </Typography>
                <Typography variant="subtitle1">
                  Now, people can see your property in our search results.
                </Typography>
                <Box mt="15px">
                  <Link to="/">Back to home</Link>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleComplete
                        : handleNext
                    }
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Done" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
