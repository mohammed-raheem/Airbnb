import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ChatIcon from "@material-ui/icons/Chat";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      color: "#fff",
    },
  },
}));

export default function ChatBadge() {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = () => {
    history.push("/notifications");
  };

  return (
    <div className={classes.root}>
      <IconButton onClick={handleClick}>
        <Badge max={999} color="secondary">
          <ChatIcon />
        </Badge>
      </IconButton>
    </div>
  );
}
