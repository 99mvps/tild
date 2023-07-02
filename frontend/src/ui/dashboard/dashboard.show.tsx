import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, IconButton, TableCell, TableRow } from "@mui/material";
import { CardSessions } from "./components/sessions.card";
import { CardLOC } from "./components/loc.card";
import { CardWallet } from "./components/wallet.card";
import { useCases } from "context/use-cases";
import { TErrorMessage } from "ui/components/error";
import { CodeEditorDTO } from "ui/code-editor/code-editor.interfaces";
import { Link as LinkRouter, useHistory } from "react-router-dom";

import { PaginatedDataTableComponent } from "ui/components/data-tables/data-table.component";
import Tooltip from "@mui/material/Tooltip";
import { format } from "date-fns";
import EmptyCodeEditorList from "ui/code-editor/components/empty-list.show";
import { DeleteForever } from "@mui/icons-material";

export function Dashboard() {
  const {
    CodeEditorUseCases: { loadAll },
  } = useCases();

  const history = useHistory();

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

  const manageCodeEditor = (codeEditorId: string) => {
    history.push(`/live/${codeEditorId}`);
  };

  useEffect(() => {
    loadCodeEditors();
  }, [loadCodeEditors]);

  return (
    <Box sx={{ padding: "1.5rem" }}>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <CardSessions />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <CardLOC />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box display="flex" justifyContent="center">
            <CardWallet />
          </Box>
        </Grid>
        {!codeEditors.length && <EmptyCodeEditorList />}
        <PaginatedDataTableComponent<CodeEditorDTO>
          tableSx={{
            container: {
              marginTop: "1.5rem",
            },
          }}
          tableHeader={[
            { column: "title", title: "Título" },
            { column: "lang", title: "Linguagem" },
            { column: "live", title: "isLive", searchable: false },
            {
              column: "createdAt",
              title: "Data de criação",
              searchable: false,
            },
            {
              column: "",
              title: "",
              searchable: false,
            },
          ]}
          tableData={codeEditors}
          tableRow={(row, index: number) => (
            <TableRow
              key={index}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
              onClick={() => manageCodeEditor(row.id)}
            >
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.lang}</TableCell>
              <TableCell>{row.live ? "online" : "offline"}</TableCell>
              <TableCell>
                {format(new Date(row.createdAt), "dd/MM/yyyy k:mm:ss")}
              </TableCell>
              <TableCell sx={{ display: "flex", gap: "0.9rem" }}>
                <Tooltip title="excluir tild" arrow>
                  <IconButton
                    component={LinkRouter}
                    to={`/code/delete/${row.id}`}
                    sx={{
                      "&:hover": {
                        bgcolor: "secondary.main",
                        color: "crimson",
                      },
                    }}
                  >
                    <DeleteForever />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        />
      </Grid>
    </Box>
  );
}
