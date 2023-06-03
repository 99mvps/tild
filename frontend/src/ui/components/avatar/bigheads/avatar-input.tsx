import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { getRandomBigheadsOptions } from "ui/components/avatar/bigheads/bigheads.random";
import { BigHead } from "@bigheads/core";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { CreateUserDTO } from "ui/users/user.interfaces";
import { CloseOutlined } from "@mui/icons-material";

export type TAvatarInputProps = {
  setUserProfileImage: (image: any) => void;
};

export function AvatarInput({ setUserProfileImage }: TAvatarInputProps) {
  const [avatarImage, setAvatarImage] = useState(
    getRandomBigheadsOptions() as any
  );
  const [btnText, setBtnText] = useState<string>("selecionar");

  const handleRandomImage = () => {
    setBtnText("selecionar");

    setAvatarImage(getRandomBigheadsOptions() as any);
  };

  const deleteUserProfileImage = () => {
    setBtnText("selecionar");

    setAvatarImage(getRandomBigheadsOptions() as any);
  };

  const handleSetUserProfileImage = () => {
    setBtnText("trocar");

    setUserProfileImage((prevState: CreateUserDTO) => ({
      ...prevState,
      profileImage: avatarImage,
    }));
  };

  return (
    <Box
      sx={{ marginBottom: 8 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box mt={2} sx={{ width: 200 }}>
        {/* thanks to: https://github.com/RobertBroersma/bigheads */}
        <BigHead {...avatarImage} />
      </Box>
      <Box display="flex">
        <Button
          variant="contained"
          sx={{
            bgcolor: "secondary.main",
            color: "crimson",
            "&:hover": {
              bgcolor: "#9146FF",
              color: "secondary.main",
            },
            marginRight: 1,
          }}
          component="span"
          color="secondary"
          startIcon={<ShuffleIcon />}
          onClick={handleRandomImage}
        >
          Random
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: btnText === "selecionar" ? "#9146FF" : "secondary.main",
            color: btnText === "selecionar" ? "white" : "crimson",
            "&:hover": {
              bgcolor: "secondary.main",
              color: "#9146FF",
            },
            "& .MuiButton-startIcon": {
              display: "flex",
              justifyContent: "center",
              marginRight: "4px",
            },
            marginLeft: 1,
          }}
          component="span"
          color="secondary"
          startIcon={
            btnText === "selecionar" ? <AddReactionIcon /> : <CloseOutlined />
          }
          onClick={
            btnText === "selecionar"
              ? handleSetUserProfileImage
              : deleteUserProfileImage
          }
        >
          {btnText}
        </Button>
      </Box>
      <Box mt={2}>
        <a
          href="https://github.com/RobertBroersma/bigheads"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography
            variant="body2"
            style={{
              fontSize: "0.7rem",
              color: "rgba(0, 0, 0, 0.6)",
              background: "white",
              padding: "4px",
              borderRadius: "4px",
            }}
          >
            Thanks to RobertBroersma
          </Typography>
        </a>
      </Box>
    </Box>
  );
}
