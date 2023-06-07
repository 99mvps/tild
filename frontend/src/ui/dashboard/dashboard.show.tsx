import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import { CardSessions } from "./components/sessions.card";
import { CardLOC } from "./components/loc.card";
import { CardWallet } from "./components/wallet.card";
import { useCases } from "context/use-cases";
import { TErrorMessage } from "ui/components/error";
import { CodeEditorDTO } from "ui/code-editor/code-editor.interfaces";
import { CodeComponent } from "ui/components/svg-component/code-component";
import { Visibility } from "@mui/icons-material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

import { Link as RouterLink } from "react-router-dom";
export function Dashboard() {
  const {
    CodeEditorUseCases: { loadAll },
  } = useCases();

  const [codeEditors, setCodeEditors] = useState<CodeEditorDTO[]>([]);

  const loadCodeEditors = useCallback(
    () =>
      loadAll(
        {},
        {
          onSuccess: (codeEditors: CodeEditorDTO[]) =>
            setCodeEditors(codeEditors),
          onError: ({ errors }: TErrorMessage) => console.error(errors),
        }
      ),
    [loadAll]
  );

  useEffect(() => {
    loadCodeEditors();
  }, [loadCodeEditors]);

  return (
    <>
      <Grid container sx={{ minHeight: "100%", bgcolor: "azure" }}>
        <Grid item xs={12} sm={4}>
          <Box paddingTop={10} display="flex" justifyContent="center">
            <CardSessions />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box paddingTop={10} display="flex" justifyContent="center">
            <CardLOC />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box paddingTop={10} display="flex" justifyContent="center">
            <CardWallet />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            component={RouterLink}
            to="/code/new"
            sx={{
              textDecoration: "none",
              padding: 5,
              borderColor: "#d3b6ff",
              borderStyle: "dashed",
              "&:hover": {
                backgroundColor: "#f5f0ff",
              },
            }}
          >
            <NoteAddIcon
              sx={{
                fontSize: "3rem",
                color: "#9146FF",
              }}
            />
            <Typography variant="body1">Novo+</Typography>
          </Link>
        </Grid>
        {codeEditors.map((codeEditor: CodeEditorDTO) => (
          <Grid item xs={12} sm={4}>
            <CodeComponent {...codeEditor} />
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: 8,
              }}
            >
              <Visibility />
              <Typography sx={{ marginLeft: 1 }}>1.5k Views</Typography>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
