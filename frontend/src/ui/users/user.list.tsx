import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

import { Create, PermContactCalendar, HighlightOff } from "@mui/icons-material";
import { UserDTO } from "./user.interfaces";
import { ErrorMessage, TErrorMessage } from "ui/components/error";
import {
  DeleteConfirmation,
  TDeleteConfirmation,
} from "ui/components/delete-confirmation";

import { SuccessMessage, TSuccessMessageProps } from "ui/components/success";
import { useAuth } from "context/use-auth";
import { useCases } from "context/use-cases";

import "./users.css";

/**
 * This page is the dashboard of the module.
 *
 * @returns {JSX.Element} Dashboard Element
 */
export function ListUsers(): JSX.Element {
  const {
    UserUseCases: { loadAll, remove },
  } = useCases();

  const auth = useAuth();
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [error, setError] = useState<TErrorMessage>();
  const [success, setSuccess] = useState<TSuccessMessageProps>();
  const [deleteConfirmation, setDeleteConfirmation] =
    useState<TDeleteConfirmation>();

  const loadUsers = useCallback(
    () =>
      loadAll(
        {},
        {
          onSuccess: (user: UserDTO[]) => setUsers(user),
          onError: ({ errors }: TErrorMessage) =>
            setError({
              title: "Erro ao carregar o usuário!",
              errors,
            }),
        }
      ),
    [loadAll]
  );

  const reset = () => {
    setError(undefined);
    setSuccess(undefined);
    setDeleteConfirmation(undefined);
  };

  const handleUserDeletion = (user: UserDTO) => {
    remove(user, {
      onSuccess: () => {
        setSuccess({
          message: "Usuário removido com sucesso.",
          handlerOnClose: () => {
            reset();
            loadUsers();
          },
        });
      },
      onError: ({ errors }: TErrorMessage) =>
        setError({
          title: errors.message,
          errors: errors.cause,
        }),
    });
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <Box className="container-user">
      <Box className="header" style={{ width: "100%" }}>
        <Typography variant="h1" style={{ marginLeft: 10 }}>
          Usuários
        </Typography>
        <Box id="new-patient" style={{ margin: 10 }}>
          <Link to={`/users/new`}>
            <Button variant="contained" color="secondary">
              <PermContactCalendar />
              Novo
            </Button>
          </Link>
        </Box>
        {error && <ErrorMessage {...error} />}
        {success && <SuccessMessage {...success} />}
        {deleteConfirmation && <DeleteConfirmation {...deleteConfirmation} />}
      </Box>
      {users.map((user: UserDTO, i: number) => {
        return (
          <Card variant="outlined" key={i++} style={{ margin: 10 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography>
                <strong>Email: </strong>
                {user.email}
              </Typography>
              <Typography>
                <strong>Role: </strong>
                {user.role}
              </Typography>
              <Typography>
                <strong>Criado em: </strong>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(user.createdAt)
                )}
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                <strong>Atualizado em: </strong>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(user.updatedAt)
                )}
              </Typography>
              <Typography style={{ fontWeight: "bold" }}>
                <strong>Excluído em: </strong>
                {new Intl.DateTimeFormat("pt-BR").format(
                  new Date(user.deletedAt)
                )}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/users/${user.id}`}>
                <Button style={{ margin: 10 }} variant="contained">
                  <Create />
                  Editar
                </Button>
              </Link>
              {auth.user?.sub !== user.id && (
                <Button
                  style={{ margin: 10 }}
                  onClick={() =>
                    setDeleteConfirmation({
                      message: `Fazendo isso, você irá excluir o registro ${user.name}. Tem certeza disso?`,
                      onConfirmation: {
                        title: "Sim",
                        fn: () => handleUserDeletion(user),
                      },
                      onFinally: () => reset(),
                    })
                  }
                  color="error"
                  variant="contained"
                >
                  <HighlightOff />
                  Excluir Usuário
                </Button>
              )}
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
