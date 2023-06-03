import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { useCases } from "context/use-cases";
import { CodeEditorDTO } from "ui/code-editor/code-editor.interfaces";
import { format } from "date-fns";
import { useRecoilValue } from "recoil";
import {
  LiveShowStateType,
  liveShowState,
} from "domain/state/live-show.recoil";
import { TErrorMessage } from "ui/components/error";
import { toast } from "react-toastify";

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
    return (
      <Grid
        container
        style={{
          marginTop: 30,
          marginLeft: 30,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 20,
        }}
      >
        <Grid style={{ backgroundColor: "white", width: "800px" }}>
          <p>Ainda não criou nenhum tild?</p>

          <Link to="/code/new">
            <Button variant="contained">Comece agora mesmo!</Button>
          </Link>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      style={{
        margin: 100,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 20,
      }}
    >
      <h3 className="form-title">Live</h3>
      <h5 className="form-title">{codeEditor.title}</h5>
      <h5 className="form-title">{codeEditor.lang}</h5>
      <h5 className="form-title">
        {format(codeEditor.createdAt, "dd/MM/yyyy")}
      </h5>
      <h5 className="form-title">
        Participants: {liveDataModel.participants.count}
      </h5>
    </Grid>
  );
}
