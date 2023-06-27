import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, IconButton, TableCell, TableRow } from "@mui/material";
import { CardSessions } from "./components/sessions.card";
import { CardLOC } from "./components/loc.card";
import { CardWallet } from "./components/wallet.card";
import { useCases } from "context/use-cases";
import { TErrorMessage } from "ui/components/error";
import { CodeEditorDTO } from "ui/code-editor/code-editor.interfaces";
import { Link as LinkRouter } from "react-router-dom";

import { PaginatedDataTableComponent } from "ui/components/data-tables/data-table.component";
import Tooltip from "@mui/material/Tooltip";
import { format } from "date-fns";
import EmptyCodeEditorList from "ui/code-editor/components/empty-list.show";
import { DeleteForever, EditAttributes, LiveTv } from "@mui/icons-material";

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
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.lang}</TableCell>
              <TableCell>{row.live ? "online" : "offline"}</TableCell>
              <TableCell>
                {format(new Date(row.createdAt), "dd/MM/yyyy k:mm:ss")}
              </TableCell>
              <TableCell sx={{ display: "flex", gap: "0.9rem" }}>
                <Tooltip title="gerenciar live" arrow>
                  <IconButton
                    component={LinkRouter}
                    to={`/live/${row.id}`}
                    sx={{
                      color: row.live ? "green" : "success",
                      "&:hover": {
                        bgcolor: "#9146FF",
                        color: "secondary.main",
                      },
                    }}
                  >
                    <LiveTv />
                  </IconButton>
                </Tooltip>
                <Tooltip title="editar tild" arrow>
                  <IconButton
                    component={LinkRouter}
                    to={`/code/edit/${row.id}`}
                    sx={{
                      "&:hover": {
                        bgcolor: "#9146FF",
                        color: "secondary.main",
                      },
                    }}
                  >
                    <EditAttributes />
                  </IconButton>
                </Tooltip>
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
