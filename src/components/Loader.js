import React from "react";
import { useTranslation } from "react-i18next";

export default function Loader({ isLoading, error }) {
  const { t } = useTranslation();

  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  } else {
    return null;
  }
}
