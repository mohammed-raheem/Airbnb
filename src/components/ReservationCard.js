import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, Grid } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

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
  selectField: {
    width: "100%",
    "& .MuiFilledInput-root": {
      backgroundColor: "rgb(255 255 255)",
    },
  },
});

export default function ReservationCard() {
  let price = 400;
  const [totalPrice, setTotlaPrice] = useState(price);

  const classes = useStyles();

  const handlePrice = (e) => {
    let months = e.target.value;
    setTotlaPrice(price * months);
  };
  return (
    <Box>
      <Card className={classes.root} m="5rem">
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.feedParednt}>
              <Typography component="span">${totalPrice} / month</Typography>
              <Typography component="span" className={classes.feedback}>
                Feedback
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                size="small"
                variant="filled"
                className={classes.selectField}
              >
                <InputLabel id="demo-simple-select-placeholder-label-label">
                  Number of Months
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  defaultValue={1}
                  onChange={handlePrice}
                >
                  <MenuItem value={1}>One Month</MenuItem>
                  <MenuItem value={2}>Two Months</MenuItem>
                  <MenuItem value={3}>Three Months</MenuItem>
                  <MenuItem value={4}>Four Months</MenuItem>
                  <MenuItem value={5}>Five Months</MenuItem>
                  <MenuItem value={6}>Six Months</MenuItem>
                </Select>
              </FormControl>
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
