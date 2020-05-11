import React from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";
import LoaderButton from "../components/LoaderButton";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="Home">
      <div className="lander">
        <h1>{t("app")}</h1>
        <p>{t("description")}</p>
        <LoaderButton size="large" isLoading="true" color="primary" variant="contained">Test</LoaderButton>
      </div>
    </div>
  );
}
