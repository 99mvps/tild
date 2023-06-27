import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  FormHelperText,
  Autocomplete,
  Box,
} from "@mui/material";
import { TErrorMessage } from "ui/components/error";
import { SuccessMessage, TSuccessMessageProps } from "ui/components/success";
import { useCases } from "context/use-cases";
import { CodeEditorEnabledLanguages } from "./code-editor.enum";
import { useSetRecoilState } from "recoil";
import { liveSelector } from "domain/state/general-application.recoil";
import { CreateCodeEditorDTO } from "./code-editor.interfaces";
import { codeEditorLangsDropDownList } from "./code-editor.mapper";
import { toast } from "react-toastify";
import {
  ResourceErrors,
  TResourceErrors,
} from "ui/components/error/resource-errors";
import { Close, Start } from "@mui/icons-material";

/**
 * Users form creation
 * @returns {JSX.Element}
 */
export function CreateCodeEditor(): JSX.Element {
  const {
    CodeEditorUseCases: { create },
  } = useCases();

  const history = useHistory();
  const initialFormState = {
    title: "",
    lang: "",
  };

  const codeEditorDropDownList = codeEditorLangsDropDownList(
    Object.keys(CodeEditorEnabledLanguages)
  );

  const [formInput, setFormInput] =
    useState<CreateCodeEditorDTO>(initialFormState);
  const [formInputErrors, setFormInputErrors] =
    useState<CreateCodeEditorDTO>(initialFormState);
  const [success, setSuccess] = useState<TSuccessMessageProps>();
  const setTildLive = useSetRecoilState(liveSelector);

  const reset = () => {
    setSuccess(undefined);
    setFormInput(initialFormState);
    setFormInputErrors(initialFormState);
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    let value = event.target.value;

    setFormInput((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    create(formInput, {
      onSuccess: (codeEditor) =>
        setSuccess({
          message: "🎉 Uhul! Vamos lá! 🎉",
          duration: 1000,
          handlerOnClose: () => {
            reset();
            setTildLive(true);
            history.push(`/live/${codeEditor.id}`);
          },
        }),
      onError: ({ title, errors }: TErrorMessage) => {
        if (title === "ValidationError") {
          setFormInputErrors({
            title: errors.title,
            lang: errors.lang,
          });
          return;
        }
        toast(
          <ResourceErrors title={title} {...(errors as TResourceErrors)} />
        );
      },
    });
  };

  return (
    <Box
      sx={{
        padding: ".5rem 1.5rem",
      }}
    >
      {success && <SuccessMessage {...success} />}
      <TextField
        id="title"
        label="tild"
        value={formInput.title}
        type="text"
        name="title"
        error={!!formInputErrors.title}
        helperText={formInputErrors.title}
        onChange={handleChange}
        sx={{ marginBottom: 2, marginTop: 4, width: "100%" }}
      />
      <Autocomplete
        disablePortal
        options={codeEditorDropDownList}
        groupBy={(option) => option.label.slice(0, 1).toUpperCase()}
        sx={{ marginBottom: 2 }}
        onChange={(event, newValue) =>
          setFormInput((formInput: any) => ({
            ...formInput,
            lang: newValue?.label,
          }))
        }
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              style={!!formInputErrors.lang ? { borderColor: "red" } : {}}
              label="lang"
              name="lang"
              value={formInput.lang}
            />
            {!!formInputErrors.lang && (
              <FormHelperText error={!!formInputErrors.lang}>
                {formInputErrors.lang}
              </FormHelperText>
            )}
          </>
        )}
      />{" "}
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "crimson",
            ":hover": {
              bgcolor: "crimson",
              color: "#fff",
            },
          }}
          onClick={() => history.push("/dashboard")}
        >
          <Close />
        </Button>
        <Button
          sx={{
            bgcolor: "white",
            color: "#9146FF",
            ":hover": {
              bgcolor: "#9146FF",
              color: "white",
            },
          }}
          onClick={() => handleSubmit()}
        >
          <Start />
        </Button>
      </Box>
    </Box>
  );
}
