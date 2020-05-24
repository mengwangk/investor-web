import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
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

export default function ResetPassword() {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
    } catch (error) {
      onError(error);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(
        fields.email,
        fields.code,
        fields.password
      );
      setConfirmed(true);
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}></div>
      </Container>
    );
  }

  // function renderRequestCodeForm() {
  //   return (
  //     <form onSubmit={handleSendCodeClick}>
  //       <FormGroup bsSize="large" controlId="email">
  //         <ControlLabel>Email</ControlLabel>
  //         <FormControl
  //           autoFocus
  //           type="email"
  //           value={fields.email}
  //           onChange={handleFieldChange}
  //         />
  //       </FormGroup>
  //       <LoaderButton
  //         block
  //         type="submit"
  //         bsSize="large"
  //         isLoading={isSendingCode}
  //         disabled={!validateCodeForm()}
  //       >
  //         Send Confirmation
  //       </LoaderButton>
  //     </form>
  //   );
  // }

  // function renderConfirmationForm() {
  //   return (
  //     <form onSubmit={handleConfirmClick}>
  //       <FormGroup bsSize="large" controlId="code">
  //         <ControlLabel>Confirmation Code</ControlLabel>
  //         <FormControl
  //           autoFocus
  //           type="tel"
  //           value={fields.code}
  //           onChange={handleFieldChange}
  //         />
  //         <HelpBlock>
  //           Please check your email ({fields.email}) for the confirmation code.
  //         </HelpBlock>
  //       </FormGroup>
  //       <hr />
  //       <FormGroup bsSize="large" controlId="password">
  //         <ControlLabel>New Password</ControlLabel>
  //         <FormControl
  //           type="password"
  //           value={fields.password}
  //           onChange={handleFieldChange}
  //         />
  //       </FormGroup>
  //       <FormGroup bsSize="large" controlId="confirmPassword">
  //         <ControlLabel>Confirm Password</ControlLabel>
  //         <FormControl
  //           type="password"
  //           value={fields.confirmPassword}
  //           onChange={handleFieldChange}
  //         />
  //       </FormGroup>
  //       <LoaderButton
  //         block
  //         type="submit"
  //         bsSize="large"
  //         isLoading={isConfirming}
  //         disabled={!validateResetForm()}
  //       >
  //         Confirm
  //       </LoaderButton>
  //     </form>
  //   );
  // }

  // function renderSuccessMessage() {
  //   return (
  //     <div className="success">
  //       <Glyphicon glyph="ok" />
  //       <p>Your password has been reset.</p>
  //       <p>
  //         <Link to="/login">
  //           Click here to login with your new credentials.
  //         </Link>
  //       </p>
  //     </div>
  //   );
  // }

  //   return (
  //      <div className="ResetPassword">
  //       {!codeSent
  //         ? renderRequestCodeForm()
  //         : !confirmed
  //         ? renderConfirmationForm()
  //         : renderSuccessMessage()}
  //     </div>
  //   );

  return <div className="ResetPassword">{renderRequestCodeForm()}</div>;
}
