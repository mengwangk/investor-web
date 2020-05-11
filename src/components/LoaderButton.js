import React from "React";
import Button from "@material-ui/core/Button";

export default function LoaderButton({
    isLoading,
    disabled = false,
    ...props
  }) {
    return (
      <Button disabled={disabled || isLoading} {...props}>
        {isLoading && (
          <FontAwesomeIcon icon={["fas", "spinner"]} pulse fixedWidth />
        )}
        {props.children}
      </Button>
    );
  };