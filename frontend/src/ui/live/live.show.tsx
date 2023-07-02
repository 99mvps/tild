import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useCases } from "context/use-cases";
import { CodeEditorDTO } from "ui/code-editor/code-editor.interfaces";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  LiveShowStateType,
  liveShowState,
} from "domain/state/live-show.recoil";
import { TErrorMessage } from "ui/components/error";
import { toast } from "react-toastify";
import EmptyLive from "../code-editor/components/empty-list.show";
import { CodeEditorEnabledLanguages } from "ui/code-editor/code-editor.languages";
import { codeEditorLangsDropDownList } from "ui/code-editor/code-editor.mapper";
import {
  ErrorOutline,
  Visibility,
  SaveAs,
  StarBorder,
  Check,
} from "@mui/icons-material";
import { MUIDropDownList } from "domain/mapper";
import { tildIdLiveSelector } from "domain/state/general-application.recoil";

export function LiveShow(): JSX.Element {
  const {
    CodeEditorUseCases: { load, update },
  } = useCases();

  let { id } = useParams<{ id: string }>();

  const codeEditorDropDownList = codeEditorLangsDropDownList(
    Object.keys(CodeEditorEnabledLanguages)
  );

  const [IconActionComponent, setIconActionComponent] =
    useState<React.ReactNode>(<SaveAs />);
  const [codeEditorId, setCodeEditorId] = useState<string>("");
  const [codeEditorTitle, setCodeEditorTitle] = useState("");
  const [codeEditorLangOpt, setCodeEditorLangOpt] =
    useState<MUIDropDownList | null>(null);

  const tildLive = useRecoilValue<LiveShowStateType>(liveShowState);
  const [, setAppTildId] = useRecoilState(tildIdLiveSelector);

  const updateCodeEditor = useCallback(
    (
      codeEditorId: string,
      { title, lang }: { title?: string; lang?: string }
    ) =>
      update(
        codeEditorId,
        {
          title,
          lang,
        },
        {
          onSuccess: (codeEditor) => {
            setCodeEditorId(codeEditor.id);
            setIconActionComponent(<Check color="success" />);
            setTimeout(() => {
              setIconActionComponent(<SaveAs />);
            }, 1000);
          },
          onError: ({ title, errors }: TErrorMessage) => {
            setIconActionComponent(<ErrorOutline color="error" />);
            setTimeout(() => {
              setIconActionComponent(<SaveAs />);
            }, 1000);
            toast.error(`${title}: ${errors}`);
          },
        }
      ),
    [update]
  );

  const loadCodeEditor = useCallback(
    (id: CodeEditorDTO["id"]) =>
      load(id, {
        onSuccess: (codeEditor: CodeEditorDTO) => {
          setAppTildId(codeEditor.id);
          setCodeEditorId(codeEditor.id);
          setCodeEditorTitle(codeEditor.title);
          setCodeEditorLangOpt({
            id: codeEditor.lang,
            label: codeEditor.lang,
            firstLetter: codeEditor.lang.charAt(0),
          });
        },
        onError: ({ title, errors }: TErrorMessage) =>
          toast.error(`${title}: ${errors}`),
      }),
    [load, setAppTildId]
  );

  useEffect(() => {
    loadCodeEditor(id);
  }, [id, loadCodeEditor]);

  if (!id) {
    return <EmptyLive />;
  }

  return (
    <Grid
      container
      sx={{
        display: "flex",
        padding: 2,
        backgroundColor: "white",
      }}
    >
      <Grid item xs={5}>
        <TextField
          label="title"
          name="title"
          value={codeEditorTitle}
          sx={{ width: "100%", paddingRight: 2 }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCodeEditorTitle(e.target.value)
          }
        />
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          disablePortal
          options={codeEditorDropDownList}
          groupBy={(option) => option.label.charAt(0)}
          sx={{ marginBottom: 2 }}
          value={codeEditorLangOpt}
          onChange={(_, selOpt) => setCodeEditorLangOpt(selOpt)}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          renderInput={(params) => (
            <TextField {...params} label="lang" name="lang" />
          )}
        />
      </Grid>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            color="primary"
            onClick={() =>
              updateCodeEditor(codeEditorId, {
                title: codeEditorTitle,
                lang: codeEditorLangOpt?.label,
              })
            }
            sx={{
              marginTop: 1,
              bgcolor: "secondary.main",
              color: "crimson",
              "&:hover": {
                bgcolor: "#9146FF",
                color: "secondary.main",
              },
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            {IconActionComponent}
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > *": {
              marginRight: 1,
            },
          }}
        >
          <Typography variant="body2">{tildLive.participants.count}</Typography>
          <Visibility fontSize="small" />
          <Typography variant="body2">0</Typography>
          <StarBorder fontSize="small" />
        </Box>
      </Grid>
    </Grid>
  );
}
