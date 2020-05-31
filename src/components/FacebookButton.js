import { makeStyles } from "@material-ui/core/styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import withStyles from "@material-ui/styles/withStyles";
import { Auth } from "aws-amplify";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import LoaderButton from "./LoaderButton";

function waitForInit() {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

const styles = makeStyles((theme) => ({
  login: {
    margin: theme.spacing(1, 0, 1),
  },
}));

class FacebookButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    await waitForInit();
    this.setState({ isLoading: false });
  }

  statusChangeCallback = (response) => {
    if (response.status === "connected") {
      this.handleResponse(response.authResponse);
    } else {
      this.handleError(response);
    }
  };

  checkLoginState = () => {
    window.FB.getLoginStatus(this.statusChangeCallback);
  };

  handleClick = () => {
    window.FB.login(this.checkLoginState, { scope: "public_profile,email" });
  };

  handleError(error) {
    alert(error);
  }

  async handleResponse(data) {
    const { email, accessToken: token, expiresIn } = data;
    const expires_at = expiresIn * 1000 + new Date().getTime();
    const user = { email };

    this.setState({ isLoading: true });

    try {
      const response = await Auth.federatedSignIn(
        "facebook",
        { token, expires_at },
        user
      );
      this.setState({ isLoading: false });
      this.props.onLogin(response);
    } catch (e) {
      this.setState({ isLoading: false });
      this.handleError(e);
    }
  }

  render() {
    const { classes, t } = this.props;
    return (
      <LoaderButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.login}
        startIcon={<FacebookIcon />}
        onClick={this.handleClick}
        disabled={this.state.isLoading}
      >
        {t("account.loginWithFacebook")}
      </LoaderButton>
    );
  }
}

export default withStyles(styles)(withTranslation()(FacebookButton));
