import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FacebookIcon from "@material-ui/icons/Facebook";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  login: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function Login() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { userHasAuthenticated } = useAppContext();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
      userHasAuthenticated(true);
    } catch (e) {
      // TODO - check for user not confirmed exception

      onError(e.message);
      setIsLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("account.login")}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <LoaderButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.login}
            startIcon={<FacebookIcon />}
          >
            {t("account.loginWithFacebook")}
          </LoaderButton>

          <LoaderButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.login}
          >
            {t("account.loginWithGoogle")}
          </LoaderButton>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("login.email")}
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={t("login.password")}
            type="password"
            id="password"
            value={fields.password}
            onChange={handleFieldChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={t("login.rememberMe")}
          />
          <LoaderButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={!validateForm()}
            className={classes.submit}
            isLoading={isLoading}
          >
            {t("account.login")}
          </LoaderButton>
          <Grid container>
            <Grid item xs>
              <Link to="/login/reset" component={RouterLink} variant="body2">
                {t("login.forgotPassword")}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" component={RouterLink} variant="body2">
                {t("login.signup")}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
