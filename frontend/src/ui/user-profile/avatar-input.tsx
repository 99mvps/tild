import React, { useState } from "react";
import { Avatar, Box, Button, TextField } from "@mui/material";

export const AvatarInput: React.FC = ({ setUserProfileImage }: any) => {
  const [avatarImage, setAvatarImage] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const _result = reader.result as string;
        setAvatarImage(_result);
        setUserProfileImage(_result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Avatar
        src={avatarImage}
        sx={{
          width: 120,
          height: 120,
          bgcolor: "#9146FF", // Customize the background color
          color: "white",
          fontSize: "48px", // Customize the font size
        }}
      >
        ~
      </Avatar>

      <Box mt={2}>
        <label htmlFor="avatar-input">
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#9146FF", // Customize the background color
              color: "white",
            }}
            component="span"
          >
            Upload Image
          </Button>
        </label>
      </Box>
    </Box>
  );
};
