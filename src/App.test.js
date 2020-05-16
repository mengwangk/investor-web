import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./tests/i18nForTests";
import { BrowserRouter as Router } from "react-router-dom";

test("renders page", () => {
  const { getByText } = render(
    <Router>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Router>
  );
  //const linkElement = getByText(/{t("app")}/i);
  // expect(linkElement).toBeInTheDocument();
});
