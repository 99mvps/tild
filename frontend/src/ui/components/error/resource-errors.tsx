import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { Box, Typography } from "@mui/material";

export type TResourceErrors = {
  title?: string;
  code?: string;
  message?: string;
  details?: { field: string; message: string; value: string }[];
};

const ErrorList = ({ errors }: { errors: TResourceErrors[] | string }) => {
  let errorComponent: JSX.Element[] = [];

  if (typeof errors === "string") {
    errorComponent.push(
      <div key={0}>
        <p>{errors}</p>
      </div>
    );
  } else {
    errors.forEach((error, index) => {
      const { message, details } = error;
      errorComponent.push(
        <div key={index}>
          {message && <p>{message}</p>}
          {details && (
            <ul>
              {details.map((detail, i) => (
                <li key={i}>{detail.message}</li>
              ))}
            </ul>
          )}
        </div>
      );
    });
  }

  return <>{errorComponent}</>;
};

/**
 * The comoponent of Resource Error API
 * @param {TResourceErrors} errors
 * @returns {React.ReactElement}
 */
export function ResourceErrors({
  title,
  code,
  message,
  details,
}: TResourceErrors) {
  return (
    <Alert severity="error">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AlertTitle>
            <Typography
              variant="body1"
              component="strong"
              sx={{ fontWeight: "bold" }}
            >
              {title ?? code ?? "Error"}
            </Typography>
          </AlertTitle>
        </Box>
      </Box>
      {message && <p>{message}</p>}
      {details && <ErrorList errors={details} />}
    </Alert>
  );
}
