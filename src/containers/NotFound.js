import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
    textAlign: "center",
  },
}));

export default function NotFound() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>{t("error.pageNotFound")}</h3>
    </div>
  );
}
