import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../libs/contextLib";
import { Link as RouterLink } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  action: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function Settings() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <LoaderButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.action}
        >
          {t("account.changeEmail")}
        </LoaderButton>
        <LoaderButton
          fullWidth
          variant="contained"
          color="primary"
          className={classes.action}
        >
          {t("account.changePassword")}
        </LoaderButton>
      </div>
    </Container>
  );
}
