import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { CreateUserDTO, UserDTO } from "ui/users/user.interfaces";
import { useCases } from "context/use-cases";
import { toast } from "react-toastify";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AvatarInput } from "../components/avatar/bigheads/avatar-input";

import { EmailOutlined } from "@mui/icons-material";

import { TErrorMessage } from "ui/components/error";
import {
  ResourceErrors,
  TResourceErrors,
} from "ui/components/error/resource-errors";
import { usePasswordVisibility } from "ui/components/inputs/password-visibility.component";
import { Link, useHistory } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";

export function UserProfileRegistration() {
  const {
    UserUseCases: { createUserProfile },
  } = useCases();

  const history = useHistory();

  const { passAdornVisible, PasswordVisibilityAdornment } =
    usePasswordVisibility();

  const initialFormState: CreateUserDTO = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    profileImage: "",
    codeConductAccept: false,
  };

  const [user, setUser] = useState<CreateUserDTO>(initialFormState);

  const [formInputErrors, setFormInputErrors] =
    useState<CreateUserDTO>(initialFormState);

  const reset = () => {
    setFormInputErrors(initialFormState);
  };

  const [codeOfConductCheck, setCodeOfConductCheck] = useState(false);

  const handleCodeOfConductAccept = (event: ChangeEvent<HTMLInputElement>) => {
    setCodeOfConductCheck(event.target.checked);

    setUser((prevState) => ({
      ...prevState,
      codeConductAccept: event.target.checked,
    }));
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

    if (!codeOfConductCheck || !user.codeConductAccept) {
      toast.error(
        "Por favor, aceite o nosso código de conduta. É obrigatório! Se precisar, leia mais no link informado.",
        {
          autoClose: 3500,
        }
      );
      return;
    }

    createUserProfile(user, {
      onSuccess: (user: UserDTO) => {
        reset();

        toast.success("Yay!", {
          autoClose: 2000,
          onClose: () => {
            history.push("/");
          },
        });
      },
      onError: ({ title, errors }: TErrorMessage) => {
        if (title === "ValidationError") {
          setFormInputErrors({
            name: errors.name,
            email: errors.email,
            password: errors.password,
            passwordConfirmation: errors.passwordConfirmation,
            codeConductAccept: errors.codeConductAccept,
          });
        } else {
          toast(
            <ResourceErrors title={title} {...(errors as TResourceErrors)} />
          );
        }
      },
    });
  };

  return (
    <Grid
      container
      style={{
        marginTop: 30,
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <form onSubmit={handleSubmit}>
        <FormControl
          style={{ minWidth: "450px", backgroundColor: "white", padding: 20 }}
        >
          <Typography sx={{ display: "flex", justifyContent: "center" }}>
            bora, passa os dados pra cá!
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.7rem",
              color: "rgba(0, 0, 0, 0.6)",
              background: "white",
              padding: "4px",
              borderRadius: "4px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            calma! não vou fazer nada com eles 😅
          </Typography>
          <AvatarInput setUserProfileImage={setUser} />
          <Grid item style={{ margin: 10 }}>
            <TextField
              placeholder="seu nome :)"
              label="Nome"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              error={!!formInputErrors.name}
              helperText={formInputErrors.name}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item style={{ margin: 10 }}>
            <TextField
              placeholder="seuemail@email.com"
              label="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              error={!!formInputErrors.email}
              helperText={formInputErrors.email}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item style={{ margin: 10 }}>
            <TextField
              placeholder="sua senha s3cReT@"
              label="Senha"
              name="password"
              value={user.password}
              type={passAdornVisible ? "text" : "password"}
              onChange={handleInputChange}
              error={!!formInputErrors.password}
              helperText={formInputErrors.password}
              fullWidth
              InputProps={{
                startAdornment: <PasswordVisibilityAdornment />,
              }}
            />
          </Grid>
          <Grid item style={{ margin: 10 }}>
            <TextField
              placeholder="faz igual a outra, hein!"
              label="Repita a senha"
              name="passwordConfirmation"
              type={passAdornVisible ? "text" : "password"}
              value={user.passwordConfirmation}
              onChange={handleInputChange}
              fullWidth
              error={!!formInputErrors.passwordConfirmation}
              helperText={formInputErrors.passwordConfirmation}
              InputProps={{
                startAdornment: <PasswordVisibilityAdornment />,
              }}
            />
          </Grid>

          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Checkbox
                checked={codeOfConductCheck}
                onChange={handleCodeOfConductAccept}
              />
            </Grid>
            <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography variant="body1" color="textSecondary">
                Eu aceito o{" "}
                <Link to="/code-of-conduct" style={{ color: "crimson" }}>
                  Código de Conduta
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <IconButton onClick={() => history.push("/login")}>
              <ArrowBack />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                marginRight: 2,
                bgcolor: "secondary.main",
                color: "crimson",
                "&:hover": {
                  bgcolor: "#9146FF",
                  color: "secondary.main",
                },
                "& .MuiButton-startIcon": {
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "4px",
                },
              }}
              color="secondary"
              startIcon={<AccountCircleIcon />}
              type="submit"
            >
              Crie sua Conta
            </Button>
          </Box>
        </FormControl>
      </form>
    </Grid>
  );
}
