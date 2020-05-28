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
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
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

export default function ResetPassword() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.password
      );
      setConfirmed(true);
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("account.resetPassword")}
          </Typography>
          <form className={classes.form} onSubmit={handleSendCodeClick}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label={t("resetPassword.email")}
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
            </Grid>
            <LoaderButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              isLoading={isSendingCode}
              disabled={!validateCodeForm()}
            >
              {t("resetPassword.sendConfirmation")}
            </LoaderButton>
          </form>
        </div>
      </Container>
    );
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
            {t("account.resetPassword")}
          </Typography>
          <form onSubmit={handleConfirmClick}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label={t("resetPassword.confirmationCode")}
                  required
                  fullWidth
                  id="code"
                  name="code"
                  type="tel"
                  autoFocus
                  value={fields.code}
                  onChange={handleFieldChange}
                />
                <FormHelperText id="confirmation-helper-text">
                  {t("resetPassword.checkEmailForConfirmation", { fields })}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  label={t("resetPassword.password")}
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
                  label={t("resetPassword.confirmPassword")}
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
              isLoading={isConfirming}
              disabled={!validateResetForm()}
            >
              {t("resetPassword.confirm")}
            </LoaderButton>
          </form>
        </div>
      </Container>
    );
  }

  function renderSuccessMessage() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <ThumbUpIcon />
          </Avatar>
          <Typography variant="h6">
            {t("resetPassword.passwordReset")}
          </Typography>
          <Typography variant="h6">
            <Link to="/login" component={RouterLink} variant="body2">
              {t("resetPassword.loginNewCredentials")}
            </Link>
          </Typography>
        </div>
      </Container>
    );
  }

  return !codeSent
    ? renderRequestCodeForm()
    : !confirmed
    ? renderConfirmationForm()
    : renderSuccessMessage();
}
