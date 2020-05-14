import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function Notifier({ error }) {
  let message = error.toString();

  const [state, setState] = useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={handleClose}
        message={message}
        autoHideDuration={5000}
      />
    </div>
  );
}
