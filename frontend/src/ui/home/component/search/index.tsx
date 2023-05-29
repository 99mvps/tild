import React, { useRef, useState } from "react";
import { Box, Chip, SxProps, TextField, Theme } from "@mui/material";

import { CodeEditorEnabledLanguagesFind } from "ui/code-editor/code-editor.enum";
import { IconSearchButton } from "./icon";
import { Cancel } from "@mui/icons-material";

interface IChip {
  label: string;
  key: string;
  onDelete?: () => void;
  sx?: SxProps<Theme> | undefined;
  deleteIcon?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined;
  variant: "outlined";
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function HomeSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [inputQueryParams, setInputQueryParams] = useState<IChip[] | []>([]);
  const [searchHandlerMatch, setSearchHandlerMatch] = useState<string>("");

  const handleTextChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchInput = event.target.value;

    const match: string[] = searchInput.match(/@\S+/g) || [];

    if (match.length) {
      setSearchHandlerMatch(match[match.length - 1]);
    }
  };

  const fetchUserHandler = async (handler: string) => {
    setIsSearchLoading(true);

    // async api call
    await sleep(1000);
    // sleep function
    setIsSearchLoading(false);
    // validated handler apiCall(handler) etc...
    const apiReturn = {
      code: "a",
      bessage: "b",
      data: {
        userHandler: "@rodrigo",
      },
    };

    let result = handler === apiReturn.data.userHandler ? handler : undefined;

    if (!result) {
      result = CodeEditorEnabledLanguagesFind(handler.replace("@", ""));
      result = result ? "@" + result : undefined;
    }

    console.log(result);

    return result;
  };

  const handleQueryParamDeletion = (queryToDelete: string) => {
    setInputQueryParams((queryParams) =>
      queryParams.filter((param) => param.label !== queryToDelete)
    );
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    if (event.key === "Enter" && !searchHandlerMatch) {
      // EXECUTES THE SEARCH
      console.log("searching...");
      return;
    }

    if (event.key === " " || event.key === "Enter") {
      let handlerAlreadyAdded = false;

      const userHandler = await fetchUserHandler(searchHandlerMatch);

      if (!userHandler) {
        return;
      }

      inputQueryParams.forEach((param) => {
        if (param.label === userHandler) {
          console.log("oi");
          handlerAlreadyAdded = true;
        }
      });

      if (handlerAlreadyAdded) {
        return;
      }

      setSearchHandlerMatch("");

      if (userHandler && inputRef.current) {
        const newValue = inputRef.current.value.replace(
          new RegExp(userHandler, "g"),
          ""
        );
        inputRef.current.value = newValue || "";
      }

      setInputQueryParams((queryParams) => [
        ...queryParams,
        {
          color: "primary",
          label: userHandler,
          key: userHandler,
          sx: { marginRight: 1 },
          onDelete: () => handleQueryParamDeletion(userHandler),
          deleteIcon: <Cancel />,
          variant: "outlined",
        },
      ]);
    }
  };

  return (
    <Box sx={{ width: "65%", margin: "0 auto" }}>
      <TextField
        placeholder="Faça uma busca por @user ou @linguagem + keywords"
        variant="outlined"
        fullWidth
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
        inputRef={inputRef}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#C2BFFF",
            color: "#252525",
            borderRadius: 5,
            "& input": {
              height: 10,
              border: "2px solid #C2BFFF",
              borderRadius: 5,
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <>
              {inputQueryParams &&
                inputQueryParams.map((chipParams: IChip) => (
                  <Chip {...chipParams} />
                ))}
              <IconSearchButton loading={isSearchLoading} />
            </>
          ),
        }}
      />
    </Box>
  );
}
