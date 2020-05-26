import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
      if (e.name === "UsernameExistsException") {
        // Redirect to login page
        history.push("/login");

        // await Auth.resendSignUp(fields.email);
        // setNewUser({ username: fields.email, password: fields.password });
      }
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("signup.confirmation")}
          </Typography>
          <form className={classes.form} onSubmit={handleConfirmationSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label={t("signup.email")}
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                  value={fields.email}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label={t("signup.confirmationCode")}
                  required
                  fullWidth
                  id="confirmationCode"
                  name="confirmationCode"
                  type="tel"
                  autoFocus
                  value={fields.confirmationCode}
                  onChange={handleFieldChange}
                />
                <FormHelperText id="confirmation-helper-text">
                  {t("signup.checkEmailForConfirmation")}
                </FormHelperText>
              </Grid>
            </Grid>
            <LoaderButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              isLoading={isLoading}
              disabled={!validateConfirmationForm()}
            >
              {t("signup.verify")}
            </LoaderButton>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" component={RouterLink} variant="body2">
                  {t("signup.alreadyHaveAccount")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  function renderForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("account.signup")}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label={t("signup.email")}
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  autoFocus
                  value={fields.email}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label={t("signup.password")}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={fields.password}
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label={t("signup.confirmPassword")}
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  value={fields.confirmPassword}
                  onChange={handleFieldChange}
                />
              </Grid>
            </Grid>
            <LoaderButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              {t("signup.signup")}
            </LoaderButton>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" component={RouterLink} variant="body2">
                  {t("signup.alreadyHaveAccount")}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  return newUser === null ? renderForm() : renderConfirmationForm();
}
