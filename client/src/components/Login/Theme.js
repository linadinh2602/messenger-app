import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";
import bubble from "../SVG/bubble.svg";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    backgroundImage: `linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url("../../images/bg-img.png")`,
    padding: 0,
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  sloganContainer: {
    position: "absolute",
    top: "35%",
    left: "0",
    width: "100%",
  },
  bubbleLogoContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  bubbleLogo: {
    margin: "auto",
  },
  sloganText: {
    fontSize: theme.typography.fontSize.title,
    textAlign: "center",
    color: "#ffffff",
    margin: "auto",
    width: "60%",
    marginTop: theme.spacing(5),
  },
}));

const Theme = () => {
  const classes = useStyles();
  return (
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
  );
};

export default Theme;
