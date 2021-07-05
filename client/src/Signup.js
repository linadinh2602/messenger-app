import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { useStyles } from "./Login";
import bubble from "../src/components/SVG/bubble.svg";

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.imageContainer}>
        {" "}
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
            Need to log in?
          </Typography>
          <Grid className={classes.whiteButtonGrid}>
            <Button
              size="large"
              color="primary"
              className={classes.whiteButton}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Grid
          direction="column"
          alignItems="center"
          className={classes.loginBody}
        >
          <Typography variant="h4" className={classes.title}>
            Create an account
          </Typography>
          <form onSubmit={handleRegister}>
            <Grid item>
              <Grid>
                <FormControl margin="normal" fullWidth required>
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl margin="normal" fullWidth required>
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  margin="normal"
                  fullWidth
                  required
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl
                  margin="normal"
                  fullWidth
                  required
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                  />
                  <FormHelperText>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
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
                  Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
