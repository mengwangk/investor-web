import React, { useState } from "react";
import Login from "../containers/Login";
import { AppContext } from "../libs/contextLib";
import "../i18n/i18n";

export default {
  title: "Login",
  component: Login,
};

export const LoginForm = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Login />
    </AppContext.Provider>
  );
};
