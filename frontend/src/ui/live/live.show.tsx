import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid,  Typography } from "@mui/material";
import { useCases } from "context/use-cases";
import { CodeEditorDTO } from "ui/code-editor/code-editor.interfaces";
import { useRecoilValue } from "recoil";
import {
  LiveShowStateType,
  liveShowState,
} from "domain/state/live-show.recoil";
import { TErrorMessage } from "ui/components/error";
import { toast } from "react-toastify";
import EmptyLive from "../code-editor/components/empty-list.show";

/**
 * The `"/path/:id"` param is a param that matches on the route and is treated as a value that needs to be fetched
 * as soons as possible
 *
 * @returns {JSX.Element} Form Element
 */
export function LiveShow(): JSX.Element {
  const {
    CodeEditorUseCases: { load },
  } = useCases();

  let { id } = useParams<{ id: string }>();

  const emptyCodeEditor: CodeEditorDTO = {
    id: "",
    title: "",
    lang: "",
    live: false,
    createdAt: new Date(),
  };

  const [codeEditor, setCodeEditor] = useState<CodeEditorDTO>(emptyCodeEditor);
  const liveDataModel = useRecoilValue<LiveShowStateType>(liveShowState);

  const loadCodeEditor = useCallback(
    (id: CodeEditorDTO["id"]) =>
      load(id, {
        onSuccess: (codeEditor: CodeEditorDTO) => setCodeEditor(codeEditor),
        onError: ({ title, errors }: TErrorMessage) =>
          toast.error(`${title}: ${errors}`),
      }),
    [load]
  );

  useEffect(() => {
    id && loadCodeEditor(id);
  }, [id, loadCodeEditor]);

  if (!id) {
    return <EmptyLive />;
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        backgroundColor: "white",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h3">Live</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{codeEditor.title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">{codeEditor.lang}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          {JSON.stringify(codeEditor.createdAt)}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">
          Participants: {liveDataModel.participants.count}
        </Typography>
      </Grid>
    </Grid>
  );
}
