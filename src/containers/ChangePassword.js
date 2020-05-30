import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChangePassword() {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [isChanging, setIsChanging] = useState(false);

  function validateForm() {
    return (
      fields.oldPassword.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleChangeClick(event) {
    event.preventDefault();

    setIsChanging(true);

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(
        currentUser,
        fields.oldPassword,
        fields.password
      );

      history.push("/settings");
    } catch (error) {
      onError(error);
      setIsChanging(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("account.changePassword")}
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label={t("resetPassword.password")}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

//   return (
//     <div className="ChangePassword">
//       <form onSubmit={handleChangeClick}>
//         <FormGroup bsSize="large" controlId="oldPassword">
//           <ControlLabel>Old Password</ControlLabel>
//           <FormControl
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.oldPassword}
//           />
//         </FormGroup>
//         <hr />
//         <FormGroup bsSize="large" controlId="password">
//           <ControlLabel>New Password</ControlLabel>
//           <FormControl
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.password}
//           />
//         </FormGroup>
//         <FormGroup bsSize="large" controlId="confirmPassword">
//           <ControlLabel>Confirm Password</ControlLabel>
//           <FormControl
//             type="password"
//             onChange={handleFieldChange}
//             value={fields.confirmPassword}
//           />
//         </FormGroup>
//         <LoaderButton
//           block
//           type="submit"
//           bsSize="large"
//           disabled={!validateForm()}
//           isLoading={isChanging}
//         >
//           Change Password
//         </LoaderButton>
//       </form>
//     </div>
//   );
