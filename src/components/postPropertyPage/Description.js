import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";

export default function Description(props) {
  // let title, desc, price, propertySize, bedRooms, bathRooms;

  // props.setDescription({
  //   title: "",
  //   desc: "",
  //   price: 0,
  //   propertySize: 0,
  //   bedRooms: 0,
  //   bathRooms: 0,
  // });

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Write an attractive title & description
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Property Title"
            variant="outlined"
            fullWidth
            onChange={(e) => props.setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={6}
            variant="outlined"
            fullWidth
            onChange={(e) => props.setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="outlined" required>
            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              labelWidth={60}
              onChange={(e) => props.setPrice(e.target.value, 10)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="size"
            name="size"
            label="Property Size"
            variant="outlined"
            fullWidth
            onChange={(e) => props.setPropertySize(e.target.value, 10)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bedroomsNumber"
            name="Bedrooms"
            label="Bedrooms Number"
            variant="outlined"
            fullWidth
            onChange={(e) => props.setBedRooms(parseInt(e.target.value, 10))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bathroomsNumber"
            name="Bathrooms"
            label="Bathrooms Number"
            variant="outlined"
            fullWidth
            onChange={(e) => props.setBathRooms(parseInt(e.target.value, 10))}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
