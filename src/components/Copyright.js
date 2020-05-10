import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { useTranslation } from "react-i18next";

export default function Copyright() {
  const { t } = useTranslation();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t("copyright.text")}
      <Link color="inherit" href={t("copyright.link")}>
        {t("copyright.description")}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
