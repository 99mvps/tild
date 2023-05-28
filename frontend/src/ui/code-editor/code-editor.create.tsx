import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  FormControl,
  Button,
  Grid,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { TErrorMessage } from "ui/components/error";
import { SuccessMessage, TSuccessMessageProps } from "ui/components/success";
import { useCases } from "context/use-cases";
import { CodeEditorEnabledLanguages } from "./code-editor.enum";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLiveSelector } from "domain/state/general-application.recoil";
import { CreateCodeEditorDTO } from "./code-editor.interfaces";
import { codeEditorLangsDropDownList } from "./code-editor.mapper";
import { CustomCard } from "ui/components/card/code-editor";

/**
 * Users form creation
 * @returns {JSX.Element}
 */
export function CreateCode(): JSX.Element {
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
  const setTildLive = useSetRecoilState(isLiveSelector);
  const isOnline = useRecoilState(isLiveSelector);

  const reset = () => {
    setSuccess(undefined);
    setFormInput(initialFormState);
    setFormInputErrors(initialFormState);
  };

  useEffect(() => {}, [formInput]);

  const toggleOnlineStatus = () => {
    setTildLive(!isOnline);
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    let value = event.target.value;

    setFormInput((values: any) => ({ ...values, [name]: value }));
  };

  const handleSubmit = () => {
    console.log({ formInput });
    create(formInput, {
      onSuccess: (codeEditor) => {
        console.log("code-editor-create", { codeEditor });
        setSuccess({
          message: "🎉 Uhul! Vamos lá! 🎉",
          duration: 1000,
          handlerOnClose: () => {
            reset();
            toggleOnlineStatus();
            history.push(`/live/${codeEditor.id}`);
          },
        });
      },
      onError: ({ errors }: TErrorMessage) => {
        setFormInputErrors({
          title: errors.title,
          lang: errors.lang,
        });
      },
    });
  };

  return (
    <>
      <Grid
        container
        style={{
          marginTop: 30,
          marginLeft: 30,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 0,
        }}
      >
        <FormControl style={{ backgroundColor: "white", width: "800px" }}>
          <h3 className="form-title">~crie um tild~</h3>
          {success && <SuccessMessage {...success} />}
          <Grid item style={{ margin: 30 }}>
            <TextField
              id="title"
              label="tild name"
              value={formInput.title}
              type="text"
              name="title"
              error={!!formInputErrors.title}
              helperText={formInputErrors.title}
              style={{ marginRight: 0, width: "100%" }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item style={{ margin: 30 }}>
            <Autocomplete
              disablePortal
              options={codeEditorDropDownList}
              groupBy={(option) => option.label.slice(0, 1).toUpperCase()}
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
                    label="Linguagem"
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
            />
          </Grid>
          <div className="button-right" style={{ margin: "20px 10px 30px 0" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                ":hover": {
                  bgcolor: "secondary.main",
                  color: "secondary.contrastText",
                },
              }}
              onClick={() => handleSubmit()}
            >
              <SaveAsIcon style={{ marginRight: 15 }} />
              Go live!
            </Button>
          </div>
        </FormControl>
      </Grid>

      <CustomCard />
    </>
  );
}
