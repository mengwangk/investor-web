import React, { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import Loader from "./components/Loader";
import Copyright from "./components/Copyright";
import Routes from "./navigation/Routes";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "./libs/contextLib";

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

  // Set document title
  document.title = i18n.t("app");

  function handleLogout() {
    userHasAuthenticated(false);
  }

  return (
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
            <Button color="inherit" onClick={handleLogout}>
              {t("account.logout")}
            </Button>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/signup">
                {t("account.register")}
              </Button>
              <Button color="inherit" component={RouterLink} to="/login">
                {t("account.login")}
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Container>
    </div>
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
