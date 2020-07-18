import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

//LET GET A CUSTOM HOOK TO HANDLE LOGIN FORM & SET TOKEN IN COOKIES
import useSignUpForm from "../hooks/useSignUpForm";
import useHandleToken from "../hooks/useHandleToken";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();

  const success = () => {
    createJwt();
    setTimeout(() => {
      history.push("/dashboard");
    }, 300);
  };

  const loginError = () => {};

  const {
    inputs,
    handleInputChange,
    handleSubmit,
    isSuccess,
    isError,
  } = useSignUpForm(success, loginError);

  const { createJwt, initedState } = useHandleToken();

  initedState !== null && history.push("/dashboard");

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={inputs.email}
            onChange={handleInputChange}
            autoFocus
            error={isError}
            disabled={isSuccess === true}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={inputs.password}
            autoComplete="current-password"
            onChange={handleInputChange}
            error={isError}
            disabled={isSuccess === true}
          />
          {isError && (
            <Box color="error.main" textAlign="center">
              <p>
                User or Password incorrect, you must use <b>admin 1234</b>, what
                a secure is this sistem
              </p>
            </Box>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSuccess === true}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
