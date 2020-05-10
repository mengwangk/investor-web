import React, { Suspense } from "react";
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
  content: {
  }
}));

function Page() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();

  // Set document title
  document.title = i18n.t("app");

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
            {t("app")}
          </Typography>
          <Button color="inherit">{t("account.signup")}</Button>
          <Button color="inherit">{t("account.login")}</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.content}>
        <Routes />
        <Box pt={4}>
          <Copyright/>
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
