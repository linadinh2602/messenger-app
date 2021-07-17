import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 44,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: theme.typography.fontSize.large,
    fontWeight: "bold",
    marginLeft: theme.spacing(3),
  },
  ellipsis: {
    color: "#95A7C4",
    marginRight: theme.spacing(5),
    opacity: 0.5,
  },
}));

const CurrentUser = (props) => {
  const classes = useStyles();

  const user = props.user || {};

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <MoreHorizIcon classes={{ root: classes.ellipsis }} />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(CurrentUser);
