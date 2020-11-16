import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  selectField: {
    width: "100%",
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255 255 255)",
    },
  },
}));

export default function Address(props) {
  const classes = useStyles();

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
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select the exact address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
                props.setProvince(parseInt(e.target.value, 10));
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
        <Grid item xs={4}>
          <FormControl
            size="small"
            variant="filled"
            className={classes.selectField}
            disabled={disabledCity}
          >
            <InputLabel id="demo-simple-select-filled-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={(e) => {
                props.setCity(parseInt(e.target.value, 10));
                setDisabledDistrict(false);
              }}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {cityName.map((item, index) =>
                cityParentId[index] == props.province ? (
                  <MenuItem value={cityId[index]}>{cityName[index]}</MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
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
              onChange={(e) => props.setDistrict(parseInt(e.target.value, 10))}
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {/* 
                FIXME: Ask Hassan to add ParentId for the districts and use it instead of cityParentId 
              */}
              {districtName.map((item, index) =>
                cityParentId[index] == props.province ? (
                  <MenuItem value={districtId[index]}>
                    {districtName[index]}
                  </MenuItem>
                ) : null
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
