import React, { useRef, useState } from "react";
import { Box, Chip, SxProps, TextField, Theme } from "@mui/material";

import { findEnabledLanguages } from "ui/code-editor/code-editor.languages";
import { IconSearchButton } from "./icon";
import { Cancel } from "@mui/icons-material";

interface IChipParams {
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

export function HomeSearch({ onSubmit }: any) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [inputQueryParams, setInputQueryParams] = useState<IChipParams[] | []>(
    []
  );
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
    await sleep(1000);
    // async api call
    // validated handler apiCall(handler) etc...
    const apiReturn = {
      code: "a",
      bessage: "b",
      data: {
        userHandler: "@rodrigo",
      },
    };

    let result = handler === apiReturn.data.userHandler ? handler : null;

    setIsSearchLoading(false);

    if (!result) {
      result = findEnabledLanguages(handler.replace("@", ""));
      result = result ? "@" + result : null;
    }

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
      onSubmit && onSubmit(inputQueryParams);
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
          handlerAlreadyAdded = true;
        }
      });

      if (handlerAlreadyAdded) {
        return;
      }

      setSearchHandlerMatch("");

      if (userHandler && searchInputRef.current) {
        const newValue = searchInputRef.current.value.replace(
          new RegExp(userHandler, "g"),
          ""
        );
        searchInputRef.current.value = newValue || "";
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
        inputRef={searchInputRef}
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
                inputQueryParams.map((chip: IChipParams) => <Chip {...chip} />)}
              <IconSearchButton loading={isSearchLoading} />
            </>
          ),
        }}
      />
    </Box>
  );
}
