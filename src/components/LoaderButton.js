import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function LoaderButton({
  isLoading,
  disabled = false,
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button disabled={disabled || isLoading} {...props}>
        {isLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        {props.children}
      </Button>
    </div>
  );
}
