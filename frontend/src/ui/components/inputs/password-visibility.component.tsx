import React, { useState } from "react";

import { InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export function usePasswordVisibility(initialVisibility: boolean = false) {
  const [passAdornVisible, setVisibility] = useState(initialVisibility);

  const togglePasswordVisibility = () => {
    setVisibility(!passAdornVisible);
  };

  const PasswordVisibilityAdornment = () => {
    return (
      <InputAdornment position="end" sx={{ marginRight: "15px" }}>
        {!passAdornVisible ? (
          <VisibilityOff
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <Visibility
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        )}
      </InputAdornment>
    );
  };

  return {
    passAdornVisible,
    PasswordVisibilityAdornment,
  };
}
