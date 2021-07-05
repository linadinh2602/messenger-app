import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import bubble from "../src/components/SVG/bubble.svg";

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 7, 2, 2),
    },
    imageContainer: {
      backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url("../../images/bg-img.png")`,
      padding: 0,
      width: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      position: "relative",
    },
    img: {
      width: "100%",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: theme.spacing(5),
    },
    topBar: {
      marginRight: theme.spacing(5),
    },
    sloganContainer: {
      position: "absolute",
      top: "35%",
      left: "0",
      width: "100%",
    },
    sloganText: {
      fontSize: theme.typography.fontSize.title,
      textAlign: "center",
      color: "#ffffff",
      margin: "auto",
      width: "60%",
      marginTop: theme.spacing(5),
    },
    title: {
      fontSize: theme.typography.fontSize.title,
      fontWeight: "bold",
      marginBottom: theme.spacing(3),
    },
    loginBody: {
      marginTop: theme.spacing(9),
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
    bubbleLogoContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    bubbleLogo: {
      margin: "auto",
    },
    blueButtonGrid: {
      width: 160,
      height: 56,
      borderRadius: 3,
      width: "100%",
      margin: theme.spacing(5, 8, 0, 8),
    },
    blueButton: {
      width: 160,
      height: 56,
      fontSize: theme.typography.fontSize.large,
      fontWeight: "bold",
      textAlign: "center",
    },
  };
});

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }
  return (
    <Box className={classes.root}>
      <Box className={classes.imageContainer}>
        <Grid className={classes.sloganContainer}>
          <Grid className={classes.bubbleLogoContainer}>
            <img className={classes.bubbleLogo} src={bubble} alt="Logo" />
          </Grid>
          <Typography className={classes.sloganText}>
            Converse with anyone with any language
          </Typography>
        </Grid>
      </Box>
      <Grid container item className={classes.mainContent}>
        <Grid container item justify="flex-end" alignItems="center">
          <Typography
            variant="body1"
            color="secondary"
            className={classes.topBar}
          >
            Don't have an account?
          </Typography>
          <Grid className={classes.whiteButtonGrid}>
            <Button
              size="large"
              color="primary"
              className={classes.whiteButton}
              onClick={() => history.push("/register")}
            >
              Create account
            </Button>
          </Grid>
        </Grid>
        <Grid
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.loginBody}
        >
          <Typography variant="h4" className={classes.title}>
            Welcome back!
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid>
              <Grid>
                <FormControl margin="normal" fullWidth required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl margin="normal" fullWidth required>
                  <TextField
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                </FormControl>
              </Grid>
              <Grid className={classes.blueButtonGrid}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.blueButton}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
