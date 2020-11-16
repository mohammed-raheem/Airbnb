import React, { useState, useEffect } from "react";
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

  // Home States
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();

  const [provincesIds, setProvincesIds] = useState([]);
  const [provincesNames, setProvincesNames] = useState([]);
  const [citiesIds, setCitiesIds] = useState([]);
  const [citiesParentsIds, setCitiesParentsIds] = useState([]);
  const [citiesNames, setCitiesNames] = useState([]);
  const [districtsIds, setDistrictsIds] = useState();
  const [districtsNames, setDistrictsNames] = useState();

  const [disabledCity, setDisabledCity] = useState(true);
  const [disabledDistrict, setDisabledDistrict] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await Axios.get(
          "https://airbnb-iq.herokuapp.com/v1/location"
        );
        // Fetching Provinces
        setProvincesNames(response.data.data.map((item) => item.name));
        setProvincesIds(response.data.data.map((item) => item.id));

        // Fetching Cities
        setCitiesNames(
          response.data.data.map((item) => {
            return item.cities.map((item2) => item2.name);
          })
        );
        setCitiesIds(
          response.data.data.map((item) => {
            return item.cities.map((item2) => item2.id);
          })
        );
        setCitiesParentsIds(
          response.data.data.map((item) => {
            return item.cities.map((item2) => item2.provinceID);
          })
        );

        // Fetching Districts
        setDistrictsNames(
          response.data.data.map((item) => {
            return item.cities.map((item2) => {
              return item2.districts.map((item3) => item3.name);
            });
          })
        );
        setDistrictsIds(
          response.data.data.map((item) => {
            return item.cities.map((item2) => {
              return item2.districts.map((item3) => item3.id);
            });
          })
        );

        // console.log(response.data.data);

        setIsLoading(false);
      } catch (e) {
        console.log("Failed to fetch provinces");
      }
    };
    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let config = {};

    if (city) {
      config = {
        method: "get",
        url: `https://airbnb-iq.herokuapp.com/v1/city/properties/${city[0]}`,
      };
    } else if (district) {
      config = {
        method: "get",
        url: `https://airbnb-iq.herokuapp.com/v1/city/properties/${district[0][0]}`,
      };
    }

    Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let provinceName = [],
    provinceId = [],
    cityName = [],
    cityId = [],
    cityParentId = [],
    districtName = [],
    districtId = [];

  if (isLoading) {
    provinceName = ["Loading"];
    cityName = ["Loading"];
    districtName = ["Loading"];
  } else {
    provinceName = provincesNames.map((name) => name);
    provinceId = provincesIds.map((id) => id);

    cityName = citiesNames.map((name) => name);
    cityId = citiesIds.map((id) => id);
    cityParentId = citiesParentsIds.map((id) => id);

    districtName = districtsNames.map((name) => name);
    districtId = districtsIds.map((id) => id);

    // console.log(cityParentId);
    // console.log(citiesNames);
    // console.log(districtsNames);
  }

  return (
    <Page title="Home">
      <div className={classes.home}>
        <Container maxWidth="md">
          <Typography className={classes.mainTitle} component="h1" variant="h2">
            Where do you want to live?
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setDisabledCity(false);
                    }}
                  >
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
                    {provinceName.map((item, index) => (
                      <MenuItem value={provinceId[index]}>
                        {provinceName[index]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  size="small"
                  variant="filled"
                  className={classes.selectField}
                  disabled={disabledCity}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    City
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={(e) => {
                      setCity(e.target.value);
                      setDisabledDistrict(false);
                    }}
                  >
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}

                    {cityName.map((item, index) =>
                      cityParentId[index] == province ? (
                        <MenuItem value={cityId[index]}>
                          {cityName[index]}
                        </MenuItem>
                      ) : null
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl
                  size="small"
                  variant="filled"
                  className={classes.selectField}
                  disabled={disabledDistrict}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    District
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    {/* <MenuItem value="">
                      <em>None</em>
                    </MenuItem> */}
                    {/* 
                      FIXME: Ask Hassan to add ParentId for the districts and use it instead of cityParentId 
                    */}
                    {districtName.map((item, index) =>
                      cityParentId[index] == province ? (
                        <MenuItem value={districtId[index]}>
                          {districtName[index]}
                        </MenuItem>
                      ) : null
                    )}
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
