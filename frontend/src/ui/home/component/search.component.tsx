import React, { useRef, useState } from "react";
import {
  Box,
  Chip,
  IconButton,
  SxProps,
  TextField,
  Theme,
  createStyles,
  makeStyles,
} from "@mui/material";
import {
  Cancel,
  Search as SearchIcon,
  Loop as LoopIcon,
} from "@mui/icons-material";

export const useStyles = makeStyles(() =>
  createStyles({
    rotateIcon: {
      animation: "$spin 2s linear infinite",
    },
    "@keyframes spin": {
      "0%": {
        transform: "rotate(360deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
  })
);

interface IChipHandler {
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

interface IconSearchButtonProps {
  loading: boolean;
}

const IconSearchButton: React.FC<IconSearchButtonProps> = ({ loading }) => {
  const Icon = loading ? <LoopIcon /> : <SearchIcon />;
  return (
    <IconButton edge="end" color="inherit" aria-label="search">
      {Icon}
    </IconButton>
  );
};

export function HomeSearch() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [chips, setChips] = useState<IChipHandler[] | []>([]);
  const [chipMatch, setChipMatch] = useState<string>("");
  const handleTextChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchInput = event.target.value;

    const match: string[] = searchInput.match(/@\S+/g) || [];

    if (match.length) {
      setChipMatch(match[match.length - 1]);
    }
  };

  const fetchUserHandler = async (handler: string) => {
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
    console.log(handler, apiReturn.data.userHandler);

    const result = handler === apiReturn.data.userHandler ? handler : null;

    console.log({ result });

    return result;
  };

  const handleChipDelete = (chipToDelete: string) => {
    setChips((prevChips) =>
      prevChips.filter((chip) => chip.label !== chipToDelete)
    );
  };

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ): Promise<void> => {
    console.log(event.key, { event });
    if (event.key === " " || event.key === "Enter") {
      setIsSearchLoading(true);
      const userHandler = await fetchUserHandler(chipMatch);
      setChipMatch("");

      if (!userHandler) {
        if (inputRef.current) {
          inputRef.current.value = inputRef.current?.value.replace(
            new RegExp(chipMatch, "g"),
            `<span color="error">${chipMatch}</span>`
          );
        }

        return;
      }

      if (userHandler) {
        const newValue =
          inputRef.current &&
          inputRef.current.value.replace(new RegExp(userHandler, "g"), "");

        if (inputRef.current) {
          inputRef.current.value = newValue || "";
        }
      }

      console.log({ userHandler });

      setChips((prevChips) => [
        ...prevChips,
        {
          color: "primary",
          label: userHandler,
          key: userHandler,
          onDelete: () => handleChipDelete(userHandler),
          deleteIcon: <Cancel />,
          variant: "outlined",
        },
      ]);
    }
  };

  return (
    <Box sx={{ width: "65%", margin: "0 auto" }}>
      <TextField
        placeholder="Search Lorem Ipsum"
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
            // "& fieldset": {
            //   border: "none",
            // },
            "& input": {
              height: 10,
              border: "2px solid #C2BFFF",
              borderRadius: 6,
            },
            "& input::placeholder": {
              color: "#252525",
            },
            "&.Mui-focused fieldset": {
              border: "2px solid #f6f3e4",
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <>
              {chips && chips.map((chip: IChipHandler) => <Chip {...chip} />)}
              <IconSearchButton loading={isSearchLoading} />
            </>
          ),
        }}
      />
    </Box>
  );
}
