import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "../../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";
import { Theme, NavHeader } from "./index";

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      justifyContent: "space-between",
      margin: theme.spacing(2, 7, 2, 2),
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
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
      <Theme />
      <Grid container item className={classes.mainContent}>
        <NavHeader
          title={"Don't have an account?"}
          buttonText={"Create account"}
        />
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
