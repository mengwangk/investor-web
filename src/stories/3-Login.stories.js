import React from "react";
import { action } from "@storybook/addon-actions";
import LoaderButton from "../components/LoaderButton";

export default {
  title: "LoaderButton",
  component: LoaderButton,
};

export const DefaultButton = ({ isLoading = false }) => (
  <LoaderButton
    size="large"
    color="primary"
    variant="contained"
    type="submit"
    isLoading={isLoading}
    onClick={() => {
      console.log("onClick");
    }}
  >
    Click Me
  </LoaderButton>
);

export const LoadingButton = ({ isLoading = true }) => (
  <LoaderButton
    size="large"
    color="primary"
    variant="contained"
    type="submit"
    isLoading={isLoading}
    onClick={() => {
      console.log("onClick");
    }}
  >
    Click Me
  </LoaderButton>
);
