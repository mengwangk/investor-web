import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Auth } from "aws-amplify";
import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Copyright from "./components/Copyright";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import config from "./config/config";
import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";
import Routes from "./navigation/Routes";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Page() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();

  // Set document title
  document.title = i18n.t("app");

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    loadFacebookSDK();
  }, []);

  function loadFacebookSDK() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v3.1",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link
                color="inherit"
                component={RouterLink}
                to="/"
                underline="none"
              >
                {t("app")}
              </Link>{" "}
            </Typography>

            {isAuthenticated ? (
              <>
                <Button color="inherit" component={RouterLink} to="/settings">
                  {t("account.settings")}
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  {t("account.logout")}
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/signup">
                  {t("account.signup")}
                </Button>
                <Button color="inherit" component={RouterLink} to="/login">
                  {t("account.login")}
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg">
          <ErrorBoundary>
            <AppContext.Provider
              value={{ isAuthenticated, userHasAuthenticated }}
            >
              <Routes />
            </AppContext.Provider>
          </ErrorBoundary>
          <Box pt={4} pb={4}>
            <Copyright />
          </Box>
        </Container>
      </div>
    )
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Page />
    </Suspense>
  );
}

export default App;
