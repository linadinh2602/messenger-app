import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: theme.typography.fontSize.xsmall,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  text: {
    fontSize: theme.typography.fontSize.medium,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  avatar: {
    height: 20,
    width: 19,
    marginTop: theme.spacing(1),
    borderRadius: 10,
    backgroundColor: "#84b8ff",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, shouldDisplayAvatar, otherUser } = props;
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {shouldDisplayAvatar && (
        <Avatar
          alt={otherUser.username}
          src={otherUser.photoUrl}
          className={classes.avatar}
        />
      )}
    </Box>
  );
};

export default SenderBubble;
