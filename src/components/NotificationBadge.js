import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      color: "#fff",
    },
  },
}));

export default function NotificationBadge() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton>
        <Badge badgeContent={4} max={999} color="primary">
          <MailIcon />
        </Badge>
      </IconButton>
    </div>
  );
}
