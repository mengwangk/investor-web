import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import LoaderButton from "../components/LoaderButton";

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
