import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/styles/withStyles";
import React from "react";
import { withTranslation } from "react-i18next";
import { logError } from "../libs/errorLib";

const styles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingTop: "100px",
  }
}));

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    const { classes, t } = this.props;
    
    return this.state.hasError ? (
      <div className={classes.root}>
        <h3>{t("error.loadingPage")}</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}

export default withStyles(styles)(withTranslation()(ErrorBoundary));