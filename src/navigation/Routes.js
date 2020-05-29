import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
// import asyncComponent from "../components/AsyncComponent";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";

// import Home from "../containers/Home";
// import NotFound from "../containers/NotFound";
// import Login from "../containers/Login";
// import Signup from "../containers/Signup";
// import Settings from "../containers/Settings";

const AsyncHome = lazy(() => import("../containers/Home"));
const AsyncNotFound = lazy(() => import("../containers/NotFound"));
const AsyncLogin = lazy(() => import("../containers/Login"));
const AsyncSignup = lazy(() => import("../containers/Signup"));
const AsyncSettings = lazy(() => import("../containers/Settings"));
const AsyncResetPassword = lazy(() => import("../containers/ResetPassword"));
const AsyncChangePassword = lazy(() => import("../containers/ChangePassword"));

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <AsyncHome />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <AsyncLogin />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <AsyncSignup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings">
        <AsyncSettings />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <AsyncResetPassword />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/settings/password">
        <AsyncChangePassword />
      </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
      <Route>
        <AsyncNotFound />
      </Route>
    </Switch>
  );
}
