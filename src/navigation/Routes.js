import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "../components/AsyncComponent";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";

// import Home from "../containers/Home";
// import NotFound from "../containers/NotFound";
// import Login from "../containers/Login";
// import Signup from "../containers/Signup";
// import Settings from "../containers/Settings";

const AsyncHome = asyncComponent(() => import("../containers/Home"));
const AsyncNotFound = asyncComponent(() => import("../containers/NotFound"));
const AsyncLogin = asyncComponent(() => import("../containers/Login"));
const AsyncSignup = asyncComponent(() => import("../containers/Signup"));
const AsyncSettings = asyncComponent(() => import("../containers/Settings"));

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
      {/* Finally, catch all unmatched routes */}
      <Route>
        <AsyncNotFound />
      </Route>
    </Switch>
  );
}
