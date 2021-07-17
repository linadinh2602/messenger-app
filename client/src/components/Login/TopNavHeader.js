import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  topBar: {
    marginRight: theme.spacing(5),
  },
  whiteButtonGrid: {
    width: 154,
    height: 54,
    borderRadius: 5,
    boxShadow: "0px 2px 10px rgba(74,106,149,0.2)",
  },
  whiteButton: {
    width: 154,
    height: 54,
    fontSize: theme.typography.fontSize.medium,
    textAlign: "center",
  },
}));

const NavHeader = (props) => {
  const { title, buttonText } = props;
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  console.log(location);

  return (
    <Grid container item justify="flex-end" alignItems="center">
      <Typography variant="body1" color="secondary" className={classes.topBar}>
        {title}
      </Typography>
      <Grid className={classes.whiteButtonGrid}>
        <Button
          size="large"
          color="primary"
          className={classes.whiteButton}
          onClick={() => {
            if (location.pathname === "/login") {
              history.push("/register");
            } else {
              history.push("/login");
            }
          }}
        >
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NavHeader;
