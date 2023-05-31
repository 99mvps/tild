import React, { ChangeEvent, FormEvent, useState } from "react";
import { TextField, Button, Box, FormControl, Grid } from "@mui/material";
import { CreateUserDTO } from "ui/users/user.interfaces";
import { useCases } from "context/use-cases";
import { TErrorMessage } from "ui/components/error";
import { Redirect } from "react-router-dom";
import toast from "react-hot-toast";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AvatarInput } from "./avatar-input";

export function UserProfileRegistration() {
  const {
    UserUseCases: { create },
  } = useCases();

  const initialFormState = {
    name: "",
    email: "",
    role: "",
    password: "",
    passwordConfirmation: "",
  };

  const [user, setUser] = useState<CreateUserDTO>(initialFormState);
  const [userProfileImage, setUserProfileImage] = useState<string>("");

  const [formInputErrors, setFormInputErrors] =
    useState<CreateUserDTO>(initialFormState);

  const reset = () => {
    setFormInputErrors(initialFormState);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // userProfileImage

    create(user, {
      onSuccess: () => {
        setInterval(() => {
          reset();

          toast.success("Yay!");

          return <Redirect to={"/"} />;
        }, 2000);
      },
      onError: ({ errors }: TErrorMessage) => {
        setFormInputErrors({
          name: errors.name,
          email: errors.email,
          password: errors.password,
        });
      },
    });
  };

  return (
    <Grid
      container
      style={{
        margin: 200,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 20,
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl style={{ backgroundColor: "white", padding: 20 }}>
          <AvatarInput {...setUserProfileImage} />
          <h3 className="form-title">Usuário</h3>
          <Grid item style={{ margin: 10 }}>
            <TextField
              label="Seu nome :)"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              error={!!formInputErrors.name}
              helperText={formInputErrors.name}
              fullWidth
            />
            <TextField
              label="Seu email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item style={{ margin: 10 }}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleInputChange}
              fullWidth
            />

            <TextField
              label="Repeat Password"
              name="passwordConfirmation"
              type="password"
              value={user.passwordConfirmation}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              startIcon={<AccountCircleIcon />}
              sx={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                padding: "10px 20px",
                margin: "10px",
                borderRadius: "4px",
                backgroundColor: "#FFFFFF",
              }}
            >
              Create Your Account
            </Button>
          </Box>
        </FormControl>
      </form>
    </Grid>
  );
}
